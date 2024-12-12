// app/api/meal_items/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

/**
 * Handles the POST request to create a new meal item.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing the new meal item or an error message.
 */
export async function POST(request) {
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  try {
    await client.connect();

    /**
     * The request body containing meal item details.
     * @typedef {Object} MealItem
     * @property {string} meal_type - The type of the meal.
     * @property {number} side_id - The ID of the side dish.
     * @property {number[]} entree_ids - The IDs of the entrees.
     * @property {number} price - The price of the meal.
     */

    /** @type {MealItem} */
    const { meal_type, side_id, entree_ids, price } = await request.json();

    // Insert new meal item into the database
    const result = await client.query(
      'INSERT INTO meal_items (meal_type, side_id, entree_ids, price) VALUES ($1, $2, $3, $4) RETURNING id',
      [meal_type, side_id, entree_ids, price]
    );

    const newMealItem = result.rows[0];

    await client.end();

    return NextResponse.json(newMealItem, { status: 201 });
  } catch (error) {
    console.error('Error creating meal item:', error);
    return NextResponse.json({ error: 'Failed to create meal item' }, { status: 500 });
  }
}
