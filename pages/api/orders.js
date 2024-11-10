import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const query = `
                SELECT
                    o.id AS order_id,
                    o.order_time,
                    o.order_total,

                    -- Renaming side_names to food_names based on menu_item_ids
                    ARRAY(
                        SELECT menu_item.food_name
                        FROM menu_items menu_item
                        WHERE menu_item.id = ANY(o.menu_item_ids)
                    ) AS food_names,

                    -- Fetching meal_type, side_id, and entree_ids from meal_items based on meal_item_ids
                    CASE
                        WHEN m.id IS NOT NULL THEN m.meal_type
                        ELSE NULL
                    END AS meal_type,

                    CASE
                        WHEN m.side_id IS NOT NULL THEN side.food_name
                        ELSE NULL
                    END AS side_name,

                    CASE
                        WHEN m.entree_ids IS NOT NULL THEN 
                            ARRAY(
                                SELECT entree.food_name
                                FROM menu_items entree
                                WHERE entree.id = ANY(m.entree_ids)
                            )
                        ELSE NULL
                    END AS entree_names

                FROM orders o
                LEFT JOIN meal_items m ON m.id = ANY(o.meal_item_ids)
                LEFT JOIN menu_items side ON side.id = m.side_id
                LEFT JOIN menu_items entree ON entree.id = ANY(m.entree_ids)
                ORDER BY o.order_time DESC
                LIMIT 100;
            `;

            const { rows } = await pool.query(query);

            const orders = rows.reduce((acc, row) => {
                const existingOrder = acc.find(order => order.id === row.order_id);
                
                if (existingOrder) {
                    // Ensure arrays are initialized before calling push
                    if (!existingOrder.entrees) existingOrder.entrees = [];
                    if (!existingOrder.food_names) existingOrder.food_names = [];
                    
                    // Add side_name and entree_names to the existing order
                    if (row.side_name) existingOrder.side = row.side_name;
                    if (row.entree_names) existingOrder.entrees.push(...row.entree_names);
                    if (row.food_names) existingOrder.food_names.push(...row.food_names);
                } else {
                    // Create a new order entry
                    acc.push({
                        id: row.order_id,
                        time: row.order_time,
                        side: row.side_name || null,  // Set to null if no side
                        food_names: row.food_names || [],  // Default to empty array if no food_names
                        entree_names: row.entree_names || [],  // Default to empty array if no entree_names
                        total: parseFloat(row.order_total).toFixed(2),
                        meal_type: row.meal_type || null
                    });
                }
                return acc;
            }, []);

            // Log the final orders array to ensure all data is correct
            console.log('Final Orders:', orders);
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
