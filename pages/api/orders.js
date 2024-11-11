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
                    o.payment_method,  -- Added payment method from the orders table

                    -- Retrieve all food item names associated with this order
                    ARRAY(
                        SELECT menu_item.name
                        FROM menu_items AS menu_item
                        WHERE menu_item.id = ANY(o.menu_item_ids)
                    ) AS food_names,

                    -- Determine the type of meal for each order
                    CASE
                        WHEN m.id IS NOT NULL THEN m.meal_type
                        ELSE NULL
                    END AS meal_type,

                    -- Retrieve the side name associated with the meal item
                    CASE
                        WHEN m.side_id IS NOT NULL THEN side.name
                        ELSE NULL
                    END AS side_name,

                    -- Retrieve all entree names associated with the meal item
                    CASE
                        WHEN m.entree_ids IS NOT NULL THEN 
                            ARRAY(
                                SELECT entree.name
                                FROM menu_items AS entree
                                WHERE entree.id = ANY(m.entree_ids)
                            )
                        ELSE NULL
                    END AS entree_names

                FROM orders AS o
                LEFT JOIN meal_items AS m ON m.id = ANY(o.meal_item_ids)
                LEFT JOIN menu_items AS side ON side.id = m.side_id
                ORDER BY o.order_time DESC
                LIMIT 100;`


            const { rows } = await pool.query(query);

            const orders = rows.reduce((acc, row) => {
                const existingOrder = acc.find(order => order.id === row.order_id);
                
                if (existingOrder) {
                 
                    if (!existingOrder.entrees) existingOrder.entrees = [];
                    if (!existingOrder.food_names) existingOrder.food_names = [];
                    
                    if (row.side_name) existingOrder.side = row.side_name;
                    if (row.entree_names) existingOrder.entrees.push(...row.entree_names);
                    if (row.food_names) existingOrder.food_names.push(...row.food_names);
                } else {
                  
                    acc.push({
                        id: row.order_id,
                        time: row.order_time,
                        side: row.side_name || null,  
                        food_names: row.food_names || [],  
                        entree_names: row.entree_names || [],  
                        total: parseFloat(row.order_total).toFixed(2),
                        meal_type: row.meal_type || null,
                        payment_method: row.payment_method || null
                    });
                }
                return acc;
            }, []);

      
           // console.log('Final Orders:', orders);
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
