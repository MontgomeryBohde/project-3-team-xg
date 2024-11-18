import { query } from '@lib/db';

export default async function handler(req, res) {
    const { type } = req.query;

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            switch (type) {

                case 'inventory': {
                    result = await query('SELECT * FROM inventory_items;');
                    break;
                }

                case 'addInventoryItem': {
                    const {
                        item_name,
                        category,
                        current_stock = 0,
                        restock_date,
                        unit_price,
                        is_allergen = false,
                        is_vegan = false
                    } = req.body || {};
                
                    // Validate inputs
                    if (
                        !item_name ||
                        !category ||
                        isNaN(current_stock) ||
                        isNaN(unit_price) ||
                        !restock_date
                    ) {
                        console.error('Invalid input:', req.body);
                        return res
                            .status(400)
                            .json({ error: 'Invalid input for adding inventory item' });
                    }
                
                    try {
                        const result = await query(
                            `
                            INSERT INTO inventory_items 
                            (item_name, category, current_stock, restock_date, unit_price, is_allergen, is_vegan)
                            VALUES ($1, $2, $3, $4, $5, $6, $7)
                            RETURNING *;
                            `,
                            [item_name, category, current_stock, restock_date, unit_price, is_allergen, is_vegan]
                        );
                
                        console.log('Query Result:', result);
                
                        // Check if the result is empty
                        if (!result || result.length === 0) {
                            console.error('Database insertion failed or returned no rows.');
                            throw new Error('Failed to insert the inventory item.');
                        }
                    } catch (error) {
                        console.error('Database Error:', error.message);
                        res.status(500).json({ error: 'Failed to insert the inventory item' });
                    }
                }                 
                
                case 'removeInventoryItem': {
                    const { id } = req.body || {};
                
                    if (!id) {
                        console.error('Validation Error: Missing item ID', req.body);
                        return res.status(400).json({ error: 'Item ID is required for removing an inventory item' });
                    }
                
                    try {
                        console.log('Attempting to remove item with ID:', id); // Debugging log
                
                        const result = await query(
                            `
                            DELETE FROM inventory_items
                            WHERE id = $1
                            RETURNING *;
                            `,
                            [id]
                        );
                
                        if (!result.rows || result.rows.length === 0) {
                            console.error('No item found with ID:', id); // Debugging log
                            return res.status(404).json({ error: 'Item not found in the inventory' });
                        }
                
                        return res.status(200).json({ message: 'Item removed successfully', item: result.rows[0] });
                    } catch (error) {
                        console.error('Database Error in removeInventoryItem:', error);
                        res.status(500).json({ error: 'Failed to remove inventory item' });
                    }
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
