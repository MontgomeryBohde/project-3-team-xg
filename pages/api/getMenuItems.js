// pages/api/getMenuItems.js
import { query } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const menuItems = await query('SELECT * FROM menu_items;');
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
