// pages/api/getEmployees.js
import { query } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const employees = await query('SELECT * FROM employees;');
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
