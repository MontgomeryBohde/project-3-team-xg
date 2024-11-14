// pages/api/getPopularity.js
import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

export default async function handler(req, res) {
  const { n } = req.query; // Retrieve 'n' from the query params

  if (!n) {
    return res.status(400).json({ error: 'Missing "n" parameter' });
  }

  try {
    // Query for the top 'n' most popular menu items
    const result = await pool.query(`
        -- Count both menu items and meal items, aggregating all orders
        WITH combined_items AS (
            -- Get menu items from orders
            SELECT menu_item_id AS item_id, 'menu_item' AS item_type
            FROM orders o
            CROSS JOIN unnest(o.menu_item_ids) AS menu_item_id
            UNION ALL
            -- Get entree items from meal items in orders (from entree_ids)
            SELECT unnest(mi.entree_ids) AS item_id, 'entree_item' AS item_type
            FROM orders o
            JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
            UNION ALL
            -- Get side items from meal items in orders (side_id)
            SELECT mi.side_id AS item_id, 'side_item' AS item_type
            FROM orders o
            JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
        )
        -- Count the occurrences of each item and get details about it
        SELECT 
            COALESCE(m.food_name, mi.meal_type) AS item_name,
            COUNT(*) AS times_ordered
        FROM combined_items ci
        LEFT JOIN menu_items m ON m.id = ci.item_id
        LEFT JOIN meal_items mi ON mi.id = ci.item_id
        GROUP BY item_name
        ORDER BY times_ordered DESC
        LIMIT $1; -- Pass the number of top items you want
    `, [parseInt(n)]);


    return res.status(200).json(result.rows); // Return only the rows from the query result
  } catch (error) {
    console.error('Error fetching popular items:', error);
    return res.status(500).json({ error: 'Failed to fetch popular items' });
  }
}