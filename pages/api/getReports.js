// pages/api/getReports.js
import { query } from '@lib/db';

export default async function handler(req, res) {
    const { type, period, hour, n } = req.query;

    if (req.method === 'GET') {
        try {
            let result;

            switch (type) {
                case 'xReport': {
					// Use the provided hour directly for filtering
					result = await query(
						`
						SELECT 
							EXTRACT(HOUR FROM placed_time) AS order_hour, 
							SUM(order_total) AS total_sales,
							COUNT(*) AS transaction_count,
							SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_collected,
							SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_payments
						FROM orders
						WHERE DATE(placed_time) = DATE(NOW())
						AND EXTRACT(HOUR FROM placed_time) = $1  -- Filter by the specific hour
						GROUP BY order_hour
						ORDER BY order_hour;
						`,
						[hour]  // Pass hour as parameter
					);
					result = result || []; // Ensure result is an array.
					break;
				}
				
                case 'zReport': {
					result = await query(
						`
						SELECT 
							CURRENT_DATE AS date,
							SUM(order_total) AS total_sales,
							COUNT(*) AS transaction_count,
							SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_total,
							SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_total
						FROM orders
						WHERE DATE(placed_time) = CURRENT_DATE;
						`,
						[]
					);
				
					result = result || [];
					break;
				}

                case 'allSales': {
                    const dateFilter = period
                        ? `WHERE placed_time >= NOW() - INTERVAL '${parseInt(period)} days'`
                        : '';
                    result = await query(`
                        SELECT DATE(placed_time) AS order_date, SUM(order_total) AS daily_total
                        FROM orders
                        ${dateFilter}
                        GROUP BY DATE(placed_time)
                        ORDER BY order_date;
                    `);
                    result = result || [];
                    break;
                }

                case 'popularity': {
                    if (!n || isNaN(parseInt(n, 10))) {
                        return res.status(400).json({ success: false, error: 'Invalid or missing "n" parameter' });
                    }
                    result = await query(
                        `
                        WITH combined_items AS (
                            SELECT unnest(o.item_size_ids) AS item_id, 'menu_item' AS item_type
                            FROM orders o
                            UNION ALL
                            SELECT unnest(meal_items.entree_ids) AS item_id, 'entree_item' AS item_type
                            FROM orders o
                            JOIN meal_items ON meal_items.id = ANY(o.meal_item_ids)
                            UNION ALL
                            SELECT meal_items.side_id AS item_id, 'side_item' AS item_type
                            FROM orders o
                            JOIN meal_items ON meal_items.id = ANY(o.meal_item_ids)
                        )
                        SELECT 
                            COALESCE(menu_items.item_name, entree_items.item_name, side_items.item_name) AS food_name, 
                            COALESCE(menu_items.category, entree_items.category, side_items.category) AS menu_category,
                            COUNT(*) AS times_ordered
                        FROM combined_items
                        LEFT JOIN item_sizes ON item_sizes.id = combined_items.item_id
                        LEFT JOIN menu_items ON menu_items.id = item_sizes.item_id
                        LEFT JOIN menu_items entree_items ON entree_items.id = combined_items.item_id
                        LEFT JOIN menu_items side_items ON side_items.id = combined_items.item_id
                        GROUP BY food_name, menu_category
                        ORDER BY times_ordered DESC
                        LIMIT $1;
                        `,
                        [parseInt(n, 10)]
                    );
                    result = result || [];
                    break;
                }

                default:
                    return res.status(400).json({ success: false, error: 'Invalid report type' });
            }

            res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching report data:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
    }
}
