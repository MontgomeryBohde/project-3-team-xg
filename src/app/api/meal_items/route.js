// app/api/meal_items/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(request) {
  console.log("inside the api file");
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  try {
    await client.connect();

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
