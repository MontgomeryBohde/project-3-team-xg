import { query } from '@lib/db';

export default async function handler(req, res) {
    const { action } = req.query;

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            switch (action) {
                case 'price': {
                    const { foodNames } = req.body || {};
                    if (!foodNames || !Array.isArray(foodNames)) {
                        return res.status(400).json({ error: 'Invalid foodNames input' });
                    }
                    result = await query(
                        `
                        SELECT menu_items.name, item_sizes.size, item_sizes.price
                        FROM menu_items
                        JOIN item_sizes ON item_sizes.item_id = menu_items.id
                        WHERE menu_items.name = ANY($1);
                        `,
                        [foodNames]
                    );
                    break;
                }

                case 'usage': {
                    result = await query(
                        `
                        WITH combined_meal_items AS (
                            SELECT unnest(mi.entree_ids) AS item_id, 'entree' AS item_type, mi.meal_type
                            FROM orders o
                            JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)

                            UNION ALL

                            SELECT mi.side_id AS item_id, 'side' AS item_type, mi.meal_type
                            FROM orders o
                            JOIN meal_items mi ON mi.id = ANY(o.meal_item_ids)
                        )
                        SELECT 
                            COALESCE(mi.meal_type, 'Unknown') AS meal_item_name,
                            COUNT(*) AS times_ordered
                        FROM combined_meal_items cm
                        LEFT JOIN meal_items mi ON mi.id = cm.item_id
                        GROUP BY meal_item_name
                        ORDER BY times_ordered DESC
                        LIMIT 10;
                        `
                    );
                    break;
                }

                case 'menu': {
                    result = await query('SELECT * FROM menu_items;');
                    break;
                }

                default:
                    return res.status(400).json({ error: 'Invalid action' });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching product data:', error);
            res.status(500).json({ error: 'Failed to fetch product data' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
