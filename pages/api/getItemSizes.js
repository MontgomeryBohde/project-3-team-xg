// pages/api/getItemSizes.js
import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const connectionString = process.env.POSTGRES_URL;
    const client = new Client({ connectionString });
    const itemId = req.query.item_id;

    if (!itemId) {
      res.status(400).json({ error: 'item_id is required' });
      return;
    }

    try {
      await client.connect();
      const itemSizesResult = await client.query(
        'SELECT * FROM item_sizes WHERE item_id = $1;',
        [itemId]
      );
      const itemSizes = itemSizesResult.rows;
      await client.end();

      res.status(200).json(itemSizes);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Failed to fetch item sizes' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}