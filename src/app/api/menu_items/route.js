// app/api/menu/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  try {
    await client.connect();

    const menuItemsResult = await client.query('SELECT * FROM menu_items;');

    const menuItems = menuItemsResult.rows;

    await client.end();

    return NextResponse.json({ menuItems });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}
