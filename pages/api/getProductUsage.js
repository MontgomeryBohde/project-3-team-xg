// pages/api/getProductUsage.js
import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

export default async function handler(req, res) {
  try {
    // Query to get meal items usage (entrees and sides) in orders
    const result = await pool.query(`
      WITH combined_meal_items AS (
        -- Get entree items from meal_items in orders
        SELECT unnest(mi.entree_ids) AS item_id, 'entree' AS item_type, mi.meal_type
        FROM orders o
        JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
        
        UNION ALL
        
        -- Get side items from meal_items in orders
        SELECT mi.side_id AS item_id, 'side' AS item_type, mi.meal_type
        FROM orders o
        JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
      )
      -- Get the total number of orders for each individual meal item
      SELECT 
        COALESCE(mi.meal_type, 'Unknown') AS meal_item_name,
        COUNT(*) AS times_ordered
      FROM combined_meal_items cm
      LEFT JOIN meal_items mi ON mi.id = cm.item_id
      GROUP BY meal_item_name
      ORDER BY times_ordered DESC
      LIMIT 10;  -- Adjust the limit to show more or fewer items
    `);

    // Return the results as JSON
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching product usage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
