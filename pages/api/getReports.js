// pages/api/reports.js
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
                    const today = new Date().toISOString().split('T')[0];
                    const now = new Date().toISOString();
                    const openTime = `${today} 10:00:00`;
                    result = await query(
                        `
                        SELECT 
                            CURRENT_DATE AS date,
                            SUM(order_total) AS total_sales,
                            COUNT(*) AS transaction_count,
                            SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_total,
                            SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_total
                        FROM orders
                        WHERE placed_time BETWEEN $1 AND $2;
                        `,
                        [openTime, now]
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
                            SELECT unnest(mi.entree_ids) AS item_id, 'entree_item' AS item_type
                            FROM orders o
                            JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
                            UNION ALL
                            SELECT mi.side_id AS item_id, 'side_item' AS item_type
                            FROM orders o
                            JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
                        )
                        SELECT 
                            COALESCE(m.item_name, ei.item_name, si.item_name) AS food_name, 
                            COALESCE(m.category, ei.category, si.category) AS menu_category,
                            COUNT(*) AS times_ordered
                        FROM combined_items ci
                        LEFT JOIN item_sizes isz ON isz.id = ci.item_id
                        LEFT JOIN menu_items m ON m.id = isz.item_id
                        LEFT JOIN menu_items ei ON ei.id = ANY(mi.entree_ids)
                        LEFT JOIN menu_items si ON si.id = mi.side_id
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
