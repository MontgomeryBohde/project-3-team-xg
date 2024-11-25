// pages/api/reports.js
import { query } from '@lib/db';

export default async function handler(req, res) {
	const { type, period, hour, n } = req.query; // Add 'n' for popularity query

	if (req.method === 'GET') {
		try {
			let result;

			switch (type) {
				case 'xReport': {
					const today = new Date().toISOString().split('T')[0];
					result = await query(
						`
							SELECT 
								EXTRACT(HOUR FROM placed_time) AS order_hour, 
								SUM(order_total) AS total_sales,
								COUNT(*) AS transaction_count,
								SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_collected,
								SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_payments
							FROM orders
							WHERE DATE(placed_time) = $1
							AND EXTRACT(HOUR FROM placed_time) BETWEEN 9 AND 21
							GROUP BY order_hour
							ORDER BY order_hour;
						`,
						[today]
					);
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
					break;
				}

				case 'allSales': {
					const dateFilter = period
						? `WHERE placed_time >= NOW() - INTERVAL '${parseInt(period)} days'`
						: '';
					const salesData = await query(`
						SELECT DATE(placed_time) AS order_date, SUM(order_total) AS daily_total
						FROM orders
						${dateFilter}
						GROUP BY DATE(placed_time)
						ORDER BY order_date;
					`);
					res.status(200).json(salesData);
					break;
				}

				case 'popularity': {
					if (!n || isNaN(parseInt(n, 10))) {
						return res.status(400).json({ error: 'Invalid or missing "n" parameter' });
					}
				
					try {
						const result = await query(
							`
							WITH combined_items AS (
								-- Get item sizes from orders (only considering the menu_item_ids)
								SELECT unnest(o.item_size_ids) AS item_id, 'menu_item' AS item_type
								FROM orders o
				
								UNION ALL
				
								-- Get entree items from meal_items in orders (considered the same as menu items)
								SELECT unnest(mi.entree_ids) AS item_id, 'entree_item' AS item_type
								FROM orders o
								JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
				
								UNION ALL
				
								-- Get side items from meal_items in orders (considered the same as menu items)
								SELECT mi.side_id AS item_id, 'side_item' AS item_type
								FROM orders o
								JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
							)
				
							SELECT 
								COALESCE(m.item_name, ei.item_name, si.item_name) AS food_name, 
								COALESCE(m.category, ei.category, si.category) AS menu_category,  -- Add menu_category
								COUNT(*) AS times_ordered
							FROM combined_items ci
							LEFT JOIN item_sizes isz ON isz.id = ci.item_id
							LEFT JOIN menu_items m ON m.id = isz.item_id
							LEFT JOIN meal_items mi ON mi.id = ci.item_id
							LEFT JOIN menu_items ei ON ei.id = ANY(mi.entree_ids)
							LEFT JOIN menu_items si ON si.id = mi.side_id
							GROUP BY food_name, menu_category  -- Group by both food_name and menu_category
							ORDER BY times_ordered DESC
							LIMIT $1;
							`,
							[parseInt(n, 10)]
						);
				
						res.status(200).json(result);
					} catch (error) {
						console.error('Error fetching popularity data:', error);
						res.status(500).json({ error: 'Failed to fetch popularity data' });
					}
					break;
				}

				default:
					return res.status(400).json({ error: 'Invalid report type' });
			}

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ error: 'Failed to fetch report data' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
