import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

/**
 * Handles the API requests for fetching a list of orders with information on the meal type, price, items, etc.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const query = `
                SELECT
    o.id AS order_id,
    o.placed_time,
    o.order_total,
    o.payment_method,  -- Keep payment method from orders table

    -- Retrieve all food item names associated with this order
    ARRAY(
        SELECT menu_item.item_name
        FROM menu_items AS menu_item
        WHERE menu_item.id = ANY(o.meal_item_ids)  -- Correctly using meal_item_ids
    ) AS food_names,

    -- Retrieve the meal type from the meal_items table
    CASE
        WHEN m.id IS NOT NULL THEN m.meal_type  -- Assuming meal_type is a field in meal_items
        ELSE NULL
    END AS meal_type,

    -- Retrieve the side name associated with the meal item
    CASE
        WHEN m.side_id IS NOT NULL THEN side.item_name  -- side's name from menu_items
        ELSE NULL
    END AS side_name,

    -- Retrieve all entree names associated with the meal item
    CASE
        WHEN m.entree_ids IS NOT NULL THEN 
            ARRAY(
                SELECT entree.item_name
                FROM menu_items AS entree
                WHERE entree.id = ANY(m.entree_ids)  -- Get entree names from menu_items
            )
        ELSE NULL
    END AS entree_names

FROM orders AS o
LEFT JOIN meal_items AS m ON m.id = ANY(o.meal_item_ids)  -- Join meal_items on meal_item_ids in orders
LEFT JOIN menu_items AS side ON side.id = m.side_id  -- Join menu_items as side for side_id
LEFT JOIN menu_items AS entree ON entree.id = ANY(m.entree_ids)  -- Join menu_items as entree for entree_ids
ORDER BY o.placed_time DESC
LIMIT $1 OFFSET $2;

;

`

const limit = parseInt(req.query.limit) || 100;  //100 items per page
const offset = parseInt(req.query.offset) || 0;  //offset starts at 0


const { rows } = await pool.query(query, [limit, offset]);

/**
 * Transforms the raw order data into a structured array of order.
 * @param {Array} rows - An array of objects representing raw order data.
 * @returns {Array} - An array of order objects with aggregated information.
 */
const orders = rows.reduce((acc, row) => {
    const existingOrder = acc.find(order => order.id === row.order_id);
    
    if (existingOrder) {
        // Ensure meal_type is an array and push the current meal_type if not already present
        if (row.meal_type && !existingOrder.meal_type.includes(row.meal_type)) {
            existingOrder.meal_type.push(row.meal_type);
        }

        // Add new side if it's available and not already in the array
        if (row.side_name && !existingOrder.side.includes(row.side_name)) {
            existingOrder.side.push(row.side_name);
        }

        // Push entree names only if they are available and unique
        if (row.entree_names) {
            existingOrder.entree_names = existingOrder.entree_names || [];
            row.entree_names.forEach(entree => {
                if (!existingOrder.entree_names.includes(entree)) {
                    existingOrder.entree_names.push(entree);
                }
            });
        }

        // Push food names only if they are available and unique
        if (row.food_names) {
            existingOrder.food_names = existingOrder.food_names || [];
            row.food_names.forEach(food => {
                if (!existingOrder.food_names.includes(food)) {
                    existingOrder.food_names.push(food);
                }
            });
        }

    } else {
        // First occurrence of this order, initialize it with the current row's data
        acc.push({
            id: row.order_id,
            time: row.placed_time,
            side: row.side_name ? [row.side_name] : [],  // Initialize side as an array
            food_names: row.food_names || [],  
            entree_names: row.entree_names || [],  
            total: parseFloat(row.order_total).toFixed(2),
            meal_type: row.meal_type ? [row.meal_type] : [],  // Initialize meal_type as an array
            payment_method: row.payment_method || null
        });
    }
    return acc;
}, []);

// Log final orders to ensure they are being aggregated correctly
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