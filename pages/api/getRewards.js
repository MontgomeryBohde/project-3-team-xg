// pages/api/getRewards.js
import { query } from '@lib/db';

export default async function handler(req, res) {
    const { type, customer_id, n } = req.query;

    // Default n to 5 if not provided
    const limit = n ? Math.min(parseInt(n), 100) : 5; // Limit to a maximum of 100 orders, default to 5

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            switch (type) {
                case 'orders': { // Get past <= n orders
                    console.log("Executing orders query");

                    const queryText = `
                        SELECT 
                            o.id AS order_id,
                            o.order_total,
                            o.payment_method,
                            o.placed_time,
                            ARRAY(
                                SELECT mi.item_name
                                FROM menu_items mi
                                WHERE mi.id = ANY(o.item_size_ids)
                            ) AS item_size_names,
                            ARRAY(
                                SELECT mi.item_name
                                FROM menu_items mi
                                WHERE mi.id = ANY(o.meal_item_ids)
                            ) AS meal_item_names
                        FROM orders o
                        WHERE o.customer_id = $1
                        ORDER BY o.placed_time DESC
                        LIMIT $2;
                    `;

                    result = await query(queryText, [customer_id, limit]);
                    break;
                }

                case 'points': { // Get number of points
                    console.log("Fetching number of points");

                    const queryText = `
                        SELECT rewards_points
                        FROM customers
                        WHERE id = $1;
                    `;

                    result = await query(queryText, [customer_id]);
                    break;
                }

                default:
                    return res.status(400).json({ error: 'Invalid action' });
            }

            // Log the query result for debugging
            console.log("Query result:", result);

            // Send the query result as the response
            res.status(200).json(result);

        } catch (error) {
            // Log the error for debugging
            console.error('Error executing query:', error);

            // Return a 500 error with the message
            res.status(500).json({ error: 'Failed to execute query', details: error.message });
        }
    } else {
        // Handle unsupported HTTP methods
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
