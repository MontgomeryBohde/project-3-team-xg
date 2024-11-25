// app/api/orders/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(request) {
  const { itemSizeIds, mealItemIds, customerId, cashierId, paymentMethod, price } = await request.json();
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  try {
    await client.connect();

    // Insert new order into the database
    const result = await client.query(
      `INSERT INTO orders (customer_id, cashier_id, order_total, item_size_ids, meal_item_ids, payment_method, placed_time, order_status) 
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, 'Complete') 
       RETURNING id`,
      [customerId, cashierId, price, itemSizeIds, mealItemIds, paymentMethod]
    );

    const newOrder = result.rows[0];

    await client.end();

    return NextResponse.json({ orderId: newOrder.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
