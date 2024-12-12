import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

/**
 * Handler function to process incoming HTTP requests.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {string} req.method - The HTTP method of the request.
 * @param {Object} req.query - The query parameters of the request.
 * @param {string} req.query.name - The name of the inventory item to fetch the ID for.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { name } = req.query;
        console.log("Fetching ID for item:", name);  // Log the item name

        try {
            const query = 'SELECT id FROM inventory_items WHERE LOWER(item_name) = LOWER($1);'

            const { rows } = await pool.query(query, [name]);

            if (rows.length === 0) {
                console.log("No inventory item found with name:", name);
                return res.status(404).json({ error: 'Inventory item not found' });
            }

            console.log("Inventory ID found:", rows[0].id);
            res.status(200).json({ id: rows[0].id });
        } catch (error) {
            console.error('Database error:', error);  // More detailed error logging
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
