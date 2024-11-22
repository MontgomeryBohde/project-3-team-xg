import { Pool } from 'pg'; 

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

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

                case 'menu': {
                    console.log("Fetching menu items");
                    const queryText = `
                        SELECT menu_items.item_name AS name, menu_items.category
                        FROM menu_items;
                    `;
                    result = await pool.query(queryText);
                    break;
                }

                case 'menu-with-sizes': {
                    console.log("Fetching menu items with sizes, IDs, and calories");
                    const queryText = `
                        SELECT 
                            menu_items.id AS item_id,
                            menu_items.item_name AS name, 
                            item_sizes.item_size AS size, 
                            menu_items.category, 
                            menu_items.inventory_item_ids AS inventory_ids, 
                            item_sizes.price,
                            item_sizes.calories  -- Add the calories column from item_sizes
                        FROM menu_items
                        JOIN item_sizes ON menu_items.id = item_sizes.item_id;
                    `;
                    
                    // Run the query and get the result
                    result = await pool.query(queryText);
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
