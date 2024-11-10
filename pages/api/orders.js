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
        const query = `
            SELECT 
                o.id AS order_id,
                o.order_time,
                o.order_total,
                m.food_name AS menu_item,
                meal.meal_type
            FROM orders o
            LEFT JOIN menu_items m ON m.id = ANY(o.menu_item_ids)
            LEFT JOIN meal_items meal ON meal.id = ANY(o.meal_item_ids)
            ORDER BY o.order_time;
        `;
        
        const { rows } = await pool.query(query);
        
        // Process the data into the desired structure
        const orders = rows.reduce((acc, row) => {
            const existingOrder = acc.find(order => order.id === row.order_id);
            
            if (existingOrder) {
                existingOrder.contents.push(row.menu_item);
            } else {
                acc.push({
                    id: row.order_id,
                    time: row.order_time,
                    type: row.meal_type,
                    contents: [row.menu_item],
                    total: row.order_total
                });
            }
            return acc;
        }, []);

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}
