import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,  // Use the correct connection string
});

export default async function handler(req, res) {
    try {
        const queryText = 'SELECT * FROM inventory_items';
        const result = await pool.query(queryText);
        res.status(200).json(result.rows);  // Assuming result.rows returns the inventory items as an array
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ error: 'Failed to fetch inventory items' });
    }
}
