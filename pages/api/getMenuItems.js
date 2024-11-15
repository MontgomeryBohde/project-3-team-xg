// pages/api/getMenuItems.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const connectionString = process.env.POSTGRES_URL;
    const client = new Client({ connectionString });

    try {
      await client.connect();
      const menuItemsResult = await client.query('SELECT * FROM menu_items;');
      const menuItems = menuItemsResult.rows;
      await client.end();

      res.status(200).json({ menuItems });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
