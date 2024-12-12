/**
 * @file getInventory.js
 * @description API handler for managing inventory items. Supports retrieving, adding, editing, and removing inventory items from the database.
 * @module api/getInventory
 * @requires @lib/db
 */

import { query } from '@lib/db';

/**
 * API handler function for inventory operations.
 * Handles different types of requests like retrieving, adding, editing, and removing inventory items.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
export default async function handler(req, res) {
    /**
     * Extracts the `type` query parameter to determine the operation type.
     * @type {string} type
     */
    const { type } = req.query;

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let result;

            switch (type) {

                /**
                 * Retrieve all inventory items.
                 * @route GET /api/getInventory?type=inventory
                 */
                case 'inventory': {
                    result = await query('SELECT * FROM inventory_items;');
                    return res.status(200).json(result || []);
                }

                /**
                 * Add a new inventory item to the database.
                 * @route POST /api/getInventory?type=addInventoryItem
                 * @param {string} item_name - Name of the item.
                 * @param {string} category - Category of the item.
                 * @param {number} current_stock - Initial stock quantity.
                 * @param {string} restock_date - Date to restock the item.
                 * @param {number} unit_price - Price per unit.
                 * @param {boolean} is_allergen - Whether the item contains allergens.
                 * @param {boolean} is_vegan - Whether the item is vegan.
                 */
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

                /**
                 * Edit an existing inventory item in the database.
                 * @route POST /api/getInventory?type=editInventoryItem
                 * @param {number} id - ID of the inventory item.
                 * @param {string} item_name - Updated name of the item.
                 * @param {string} category - Updated category.
                 * @param {number} current_stock - Updated stock quantity.
                 * @param {string} restock_date - Updated restock date.
                 * @param {number} unit_price - Updated price per unit.
                 * @param {boolean} is_allergen - Whether the item contains allergens.
                 * @param {boolean} is_vegan - Whether the item is vegan.
                 */
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

                /**
                 * Default case for invalid action type.
                 */
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
