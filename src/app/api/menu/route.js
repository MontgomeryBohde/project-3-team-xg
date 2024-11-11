// app/api/menu/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  try {
    await client.connect();

    // Querying menu_items table
    const menuItemsResult = await client.query('SELECT * FROM menu_items;');
    const itemSizesResult = await client.query('SELECT * FROM item_sizes;');

    // Combine results if needed, or return them separately
    const menuItems = menuItemsResult.rows;
    const itemSizes = itemSizesResult.rows;

    await client.end();

    return NextResponse.json({ menuItems, itemSizes });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items or item sizes' }, { status: 500 });
  }
}
