// pages/api/getEmployees.js
import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const connectionString = process.env.POSTGRES_URL;
    const client = new Client({ connectionString });

    try {
      await client.connect();
      const result = await client.query('SELECT * FROM employees;');
      await client.end();
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
