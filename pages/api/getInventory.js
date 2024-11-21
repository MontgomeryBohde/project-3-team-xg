// pages/api/getInventory.js
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
                        result = await query(
                            `
                            INSERT INTO inventory_items 
                            (item_name, category, current_stock, restock_date, unit_price, is_allergen, is_vegan)
                            VALUES ($1, $2, $3, $4, $5, $6, $7)
                            RETURNING *;
                            `,
                            [item_name, category, current_stock, restock_date, unit_price, is_allergen, is_vegan]
                        );

                        // Check if the result is empty
                        if (!result || result.length === 0) {
                            console.error('Database insertion failed or returned no rows.');
                            throw new Error('Failed to insert the inventory item.');
                        }
                    } catch (error) {
                        console.error('Database Error:', error.message);
                        res.status(500).json({ error: 'Failed to insert the inventory item' });
                    }
                    break;
                }

                case 'editInventoryItem': {
                    const {
                        id,
                        item_name,
                        category,
                        current_stock,
                        restock_date,
                        unit_price,
                        is_allergen,
                        is_vegan
                    } = req.body || {};
                
                    // Input validation
                    if (!id || !item_name || !category || isNaN(current_stock) || isNaN(unit_price) || !restock_date) {
                        console.error('Invalid input for editing item:', req.body);
                        return res.status(400).json({ error: 'Invalid input for editing inventory item' });
                    }
                
                    try {
                        const result = await query(
                            `
                            UPDATE inventory_items
                            SET item_name = $1, category = $2, current_stock = $3, restock_date = $4, 
                                unit_price = $5, is_allergen = $6, is_vegan = $7
                            WHERE id = $8
                            RETURNING *;
                            `,
                            [item_name, category, current_stock, restock_date, unit_price, is_allergen, is_vegan, id]
                        );
                
                        // Check if the result is empty or the update didn't succeed
                        if (!result || !result.length) {
                            console.error('No item found with ID:', id);
                            return res.status(404).json({ error: 'Item not found in the inventory' });
                        }
                
                        // Return the updated item
                        return res.status(200).json(result[0]);
                    } catch (error) {
                        console.error('Database Error in editInventoryItem:', error);
                        return res.status(500).json({ error: 'Failed to edit inventory item' });
                    }
                }

                case 'removeInventoryItem': {
                    const { id } = req.body || {};

                    if (!id) {
                        console.error('Validation Error: Missing item ID', req.body);
                        return res.status(400).json({ error: 'Item ID is required for removing an inventory item' });
                    }

                    try {
                        const result = await query(
                            `
                            DELETE FROM inventory_items
                            WHERE id = $1
                            RETURNING *;
                            `,
                            [id]
                        );

                        // Check if the item was found and deleted
                        if (!result || !result.length) {
                            console.error('No item found with ID:', id);
                            return res.status(404).json({ error: 'Item not found in the inventory' });
                        }

                        console.log('Item removed successfully with ID:', id);
                        return res.status(200).json({ message: 'Item removed successfully', item: result[0] });
                    } catch (error) {
                        console.error('Database Error in removeInventoryItem:', error);
                        return res.status(500).json({ error: 'Failed to remove inventory item' });
                    }
                }

                default:
                    return res.status(400).json({ error: 'Invalid action' });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('Error handling inventory request:', error);
            res.status(500).json({ error: 'Failed to process inventory request' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
