import { Pool } from 'pg'; // Import the pg Pool

// Create a new Pool instance to interact with the database
const pool = new Pool({
  user: 'team_xg', // Your database username
  host: 'csce-315-db.engr.tamu.edu', // Your database host
  database: 'team_xg_db', // Your database name
  password: 'palenumber97', // Your database password
  port: 5432, // PostgreSQL default port
});


export default async function handler(req, res) {
    console.log("API route reached: /api/getProducts");
    const { type } = req.query;

    // Log the request details
    console.log("Received query:", req.query); // Log the full query object
    console.log("Received type:", type); // Log the 'type' parameter specifically
    console.log("Received request body:", req.body); // Log the request body (for POST)
    console.log("Request method:", req.method); // Log the method of the incoming request

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            // Log the body of the request (for POST)
            console.log("Request body:", req.body);

            switch (type) {
                case 'price': {
                    const { foodNames } = req.body || {};

                    // Check if foodNames is a valid array
                    if (!foodNames || !Array.isArray(foodNames) || foodNames.length === 0) {
                        return res.status(400).json({ error: 'Invalid or empty foodNames array' });
                    }

                    console.log("Food names:", foodNames);

                    // Use the pg Pool to run the query
                    const queryText = `
                        SELECT menu_items.item_name, item_sizes.item_size, item_sizes.price
                        FROM menu_items
                        JOIN item_sizes ON item_sizes.item_id = menu_items.id
                        WHERE menu_items.item_name = ANY($1);
                    `;
                    const queryParams = [foodNames];

                    // Execute the query
                    result = await pool.query(queryText, queryParams);

                    break;
                }

                case 'usage': {
                    console.log("Executing usage query");
                    // Add your SQL query for the 'usage' case here
                    const queryText = `...`;  // Your SQL query
                    result = await pool.query(queryText);
                    break;
                }

                default:
                    return res.status(400).json({ error: 'Invalid action' });
            }

            // Log the result before sending it back
            console.log("Query result:", result.rows); // result.rows contains the actual data

            // Send the result back as JSON
            res.status(200).json(result.rows);
        } catch (error) {
            // Log any errors
            console.error('Error fetching product data:', error);
            res.status(500).json({ error: 'Failed to fetch product data' });
        }
    } else {
        // Handle method not allowed
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
