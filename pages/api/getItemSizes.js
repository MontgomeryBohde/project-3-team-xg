// pages/api/getItemSizes.js
import { query } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { item_id } = req.query;

    if (!item_id) {
      return res.status(400).json({ error: 'item_id is required' });
    }

    try {
      const itemSizes = await query(
        'SELECT * FROM item_sizes WHERE item_id = $1;',
        [item_id]
      );
      res.status(200).json(itemSizes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch item sizes' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
