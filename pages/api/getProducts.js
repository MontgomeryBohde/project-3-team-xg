// pages/api/getMenu.js
import { query } from '@lib/db';

export default async function handler(req, res) {
    const { type } = req.query;

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            switch (type) {
                case 'usage': {
                    console.log("Executing usage query");
                    // Replace with your actual SQL query for 'usage'
                    const queryText = `...`; // Replace with actual SQL
                    result = await query(queryText); // Using `query` from @lib/db
                    break;
                }

                default:
                    return res.status(400).json({ error: 'Invalid action' });
            }

            // Log the query result for debugging
            console.log("Query result:", result.rows);

            // Send the query result as the response
            res.status(200).json(result.rows);
        } catch (error) {
            // Log the error for debugging
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Failed to execute query' });
        }
    } else {
        // Handle unsupported HTTP methods
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
