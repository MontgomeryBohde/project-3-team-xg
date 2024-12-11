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
                                SELECT 
                                    json_build_object(
                                        'item_name', mi.item_name, 
                                        'item_size', isize.item_size, 
                                        'price', isize.price
                                    )
                                FROM item_sizes isize
                                JOIN menu_items mi ON mi.id = isize.item_id
                                WHERE isize.id = ANY(o.item_size_ids)
                            ) AS item_size_details,
                            ARRAY(
                                SELECT 
                                    json_build_object(
                                        'item_name', mi.item_name, 
                                        'side_name', side.item_name, 
                                        'entree_names', STRING_AGG(entree.item_name, ', '), 
                                        'price', m.price
                                    )
                                FROM meal_items m
                                JOIN menu_items mi ON mi.id = m.id
                                LEFT JOIN menu_items side ON side.id = m.side_id
                                LEFT JOIN menu_items entree ON entree.id = ANY(m.entree_ids)
                                WHERE m.id = ANY(o.meal_item_ids)
                                GROUP BY mi.item_name, side.item_name, m.price
                            ) AS meal_item_details
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

                case 'month': {
                    console.log("Fetching number of orders made this month");

                    const queryText = `
                        SELECT COUNT(*) AS orders_this_month
                        FROM orders
                        WHERE customer_id = $1
                            AND EXTRACT(MONTH FROM placed_time) = EXTRACT(MONTH FROM CURRENT_DATE)
                            AND EXTRACT(YEAR FROM placed_time) = EXTRACT(YEAR FROM CURRENT_DATE);
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