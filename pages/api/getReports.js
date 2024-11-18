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
            SELECT EXTRACT(HOUR FROM order_time) AS order_hour,
                   SUM(order_total) AS total_sales,
                   COUNT(*) AS transaction_count,
                   SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_collected,
                   SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_payments
            FROM orders
            WHERE DATE(order_time) = $1
              AND EXTRACT(HOUR FROM order_time) BETWEEN 9 AND 21
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
            SELECT CURRENT_DATE AS date,
                   SUM(order_total) AS total_sales,
                   COUNT(*) AS transaction_count,
                   SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_total,
                   SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_total
            FROM orders
            WHERE order_time BETWEEN $1 AND $2;
            `,
            [openTime, now]
          );
          break;
        }

        case 'allSales': {
          let dateFilter = '';
          if (period === '7') dateFilter = "WHERE order_time >= NOW() - INTERVAL '7 days'";
          else if (period === '30') dateFilter = "WHERE order_time >= NOW() - INTERVAL '30 days'";
          else if (period === '180') dateFilter = "WHERE order_time >= NOW() - INTERVAL '6 months'";
          else if (period === '365') dateFilter = "WHERE order_time >= NOW() - INTERVAL '1 year'";

          result = await query(
            `
            SELECT DATE(order_time) AS order_date, SUM(order_total) AS daily_total
            FROM orders
            ${dateFilter}
            GROUP BY DATE(order_time)
            ORDER BY order_date;
            `
          );
          break;
        }

        case 'popularity': {
          if (!n) {
            return res.status(400).json({ error: 'Missing "n" parameter' });
          }

          result = await query(
            `
            WITH combined_items AS (
              SELECT menu_item_id AS item_id, 'menu_item' AS item_type
              FROM orders o CROSS JOIN unnest(o.menu_item_ids) AS menu_item_id
              UNION ALL
              SELECT unnest(mi.entree_ids) AS item_id, 'entree_item' AS item_type
              FROM orders o JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
              UNION ALL
              SELECT mi.side_id AS item_id, 'side_item' AS item_type
              FROM orders o JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
            )
            SELECT COALESCE(m.food_name, mi.meal_type) AS item_name, COUNT(*) AS times_ordered
            FROM combined_items ci
            LEFT JOIN menu_items m ON m.id = ci.item_id
            LEFT JOIN meal_items mi ON mi.id = ci.item_id
            GROUP BY item_name
            ORDER BY times_ordered DESC
            LIMIT $1;
            `,
            [parseInt(n)]
          );
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
