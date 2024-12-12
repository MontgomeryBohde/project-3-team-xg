import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

/**
 * Handles HTTP requests to update the inventory of menu items.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {string} req.method - The HTTP method (e.g., 'POST').
 * @param {Object} req.body - The body of the HTTP request.
 * @param {number} req.body.menuItemId - The ID of the menu item to update.
 * @param {number} req.body.inventoryItemId - The ID of the inventory item to add or remove.
 * @param {string} req.body.action - The action to perform ('add' or 'remove').
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves when the request is handled.
 */
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { menuItemId, inventoryItemId, action } = req.body;  // 'action' can be 'add' or 'remove'

        try {
            await pool.query('BEGIN');  // Start transaction

            let updateQuery;
            if (action === 'add') {
                updateQuery = `
                    UPDATE menu_items
                    SET inventory_item_ids = array_append(inventory_item_ids, $1)
                    WHERE id = $2
                    RETURNING *;
                `;
            } else if (action === 'remove') {
                updateQuery = `
                    UPDATE menu_items
                    SET inventory_item_ids = array_remove(inventory_item_ids, $1)
                    WHERE id = $2
                    RETURNING *;
                `;
            } else {
                return res.status(400).json({ error: 'Invalid action' });
            }

            const result = await pool.query(updateQuery, [inventoryItemId, menuItemId]);

            if (result.rows.length === 0) {
                await pool.query('ROLLBACK');
                return res.status(404).json({ error: 'Menu item not found' });
            }

            await pool.query('COMMIT');
            res.status(200).json(result.rows[0]);  // Return updated item
        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error updating inventory:', error);  // Log detailed error
            res.status(500).json({ error: error.message || 'Database update failed' });  // Send specific error message
        }
        
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
