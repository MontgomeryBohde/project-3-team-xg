/**
 * @file getProducts.js
 * @description API handler for retrieving product information including usage, pricing, and menu details.
 * @module api/getProducts
 * @requires @lib/db
 */

import { query } from '@lib/db';

/**
 * Handles the API requests for various data fetching operations that have to do with menu/product items.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
export default async function handler(req, res) {
    /**
     * Extract query parameters.
     * @type {string} type - Type of the query (e.g., usage, price, menu).
     * @type {number} [limit=10] - Maximum number of results (default: 10).
     */
    const { type, limit } = req.query;
    const limitValue = limit ? parseInt(limit, 10) : 10;

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            switch (type) {
                /**
                 * Fetch product usage statistics.
                 * @route GET /api/getProducts?type=usage
                 * @param {number} limit - Maximum number of items to return.
                 */
                case 'usage': {
                    console.log("Executing usage query");

                    const queryText = `
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
                            COALESCE(m.item_name, 'Unknown') AS meal_item_name,  -- Display the actual item name or 'Unknown' if not found
                            COUNT(*) AS times_ordered
                        FROM combined_meal_items cm
                        LEFT JOIN menu_items m ON m.id = cm.item_id   -- Join with menu_items to get the actual name of the item
                        GROUP BY meal_item_name  -- Group by the meal_item_name which is the alias created above
                        ORDER BY times_ordered DESC
                        LIMIT $1;  -- Use the limit parameter
                    `;

                    result = await query(queryText, [limitValue]);
                    break;
                }
                /**
                 * Fetch product prices for specific items.
                 * @route POST /api/getProducts?type=price
                 * @param {string[]} foodNames - List of food item names to fetch prices for.
                 */
                case 'price': {
                    const { foodNames } = req.body || {};

                   
                    if (!foodNames || !Array.isArray(foodNames) || foodNames.length === 0) {
                        return res.status(400).json({ error: 'Invalid or empty foodNames array' });
                    }

                    console.log("Food names:", foodNames);

                    
                    const queryText = `
                        SELECT menu_items.item_name, item_sizes.item_size, item_sizes.price
                        FROM menu_items
                        JOIN item_sizes ON item_sizes.item_id = menu_items.id
                        WHERE menu_items.item_name = ANY($1);
                    `;
                    const queryParams = [foodNames];

                  
                    result = await query(queryText, queryParams);

                    break;
                }
                /**
                 * Fetch a list of menu items.
                 * @route GET /api/getProducts?type=menu
                 */
                case 'menu': {
                    console.log("Fetching menu items");
                    const queryText = `
                        SELECT menu_items.item_name AS name, menu_items.category
                        FROM menu_items;
                    `;
                    result = await query(queryText);
                    break;
                }

                /**
                 * Fetch menu items with sizes and associated data.
                 * @route GET /api/getProducts?type=menu-with-sizes
                 */
                case 'menu-with-sizes': {
                    console.log("Fetching menu items with sizes, IDs, and calories");
                    const queryText = `
                        SELECT 
                            menu_items.id AS item_id,
                            menu_items.item_name AS name, 
                            item_sizes.item_size AS size, 
                            menu_items.category, 
                            ARRAY_AGG(inventory_items.item_name) AS inventory_names, 
                            item_sizes.price,
                            item_sizes.calories
                        FROM menu_items
                        JOIN item_sizes ON menu_items.id = item_sizes.item_id
                        LEFT JOIN inventory_items ON inventory_items.id = ANY(menu_items.inventory_item_ids)
                        GROUP BY menu_items.id, item_sizes.item_size, item_sizes.price, item_sizes.calories;
                    `;
                    
                    result = await query(queryText);
                    break;
                }

                default:
                    return res.status(400).json({ error: 'Invalid action' });
            }

            
            console.log("Query result:", result);

            // check for null
            if (!result || result.length === 0) {
                return res.status(404).json({ error: 'No data found' });
            }

           
            res.status(200).json(result);

        } catch (error) {
           
            console.error('Error executing query:', error);

            
            res.status(500).json({ error: 'Failed to execute query', details: error.message });
        }
    } else {
       
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}