import { Pool } from 'pg'; 

const pool = new Pool({
  user: 'team_xg', 
  host: 'csce-315-db.engr.tamu.edu',
  database: 'team_xg_db',
  password: 'palenumber97', 
  port: 5432,
});


export default async function handler(req, res) {
    console.log("API route reached: /api/getProducts");
    const { type } = req.query;

    

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            // Log the body of the request (for POST)
            console.log("Request body:", req.body);

            switch (type) {
                case 'price': {
                    const { foodNames } = req.body || {};

                   
                    if (!foodNames || !Array.isArray(foodNames) || foodNames.length === 0) {
                        return res.status(400).json({ error: 'Invalid or empty foodNames array' });
                    }

                    console.log("Food names:", foodNames);

                    
                    const queryText = `
                        SELECT menu_items.item_name, item_sizes.item_size, item_sizes.price
                        FROM menu_items
                        JOIN item_sizes ON item_sizes.item_id = menu_items.id
                        WHERE menu_items.item_name = ANY($1);
                    `;
                    const queryParams = [foodNames];

                  
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

                case 'menu': {
                    console.log("Fetching menu items");
                    const queryText = `
                        SELECT menu_items.item_name AS name, menu_items.category
                        FROM menu_items;
                    `;
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
