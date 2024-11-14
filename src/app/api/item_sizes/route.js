import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(request) {
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  // Parse the query parameters to get the item_id
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get('item_id');

  if (!itemId) {
    return NextResponse.json({ error: 'item_id is required' }, { status: 400 });
  }

  try {
    await client.connect();

    // Use parameterized query to prevent SQL injection
    const itemSizesResult = await client.query(
      'SELECT * FROM item_sizes WHERE item_id = $1;',
      [itemId]
    );

    const itemSizes = itemSizesResult.rows;

    await client.end();

    return NextResponse.json(itemSizes);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch item sizes' }, { status: 500 });
  }
}
