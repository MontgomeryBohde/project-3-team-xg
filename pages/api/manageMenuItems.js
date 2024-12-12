import { Pool } from 'pg'; 

/**
 * Creates a new pool instance for PostgreSQL connection.
 * @type {Pool}
 */
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

/**
 * API handler for managing menu items.
 * @param {Object} req - The request object.
 * @param {string} req.method - The HTTP method of the request.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.item_name - The name of the menu item.
 * @param {string} req.body.category - The category of the menu item.
 * @param {Array} req.body.inventory_item_ids - The inventory item IDs associated with the menu item.
 * @param {string} req.body.descr - The description of the menu item.
 * @param {boolean} req.body.available - The availability status of the menu item.
 * @param {boolean} req.body.is_seasonal - Whether the menu item is seasonal.
 * @param {string} req.body.image_url - The image URL of the menu item.
 * @param {Array} req.body.sizes - The sizes available for the menu item.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    console.log("API route reached: /api/manageMenuItems");
    
    if (req.method === 'POST') {
        // Handle adding a new menu item
        const { item_name, category, inventory_item_ids, descr, available, is_seasonal, image_url, sizes } = req.body;
        
        if (!item_name || !category || !Array.isArray(sizes) || sizes.length === 0) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        try {
            // Start a transaction to ensure both menu item and sizes are added together
            await pool.query('BEGIN');

            // Insert new menu item
            const insertMenuItemText = `
                INSERT INTO menu_items (item_name, category, inventory_item_ids, descr, available, is_seasonal, image_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id;
            `;
            const insertMenuItemValues = [item_name, category, inventory_item_ids || [], descr, available, is_seasonal, image_url];
            const resMenuItem = await pool.query(insertMenuItemText, insertMenuItemValues);

            // Get the new menu item id
            const menuItemId = resMenuItem.rows[0].id;

            // Insert sizes for the new item
            const insertSizeText = `
                INSERT INTO item_sizes (item_id, item_size, price, calories)
                VALUES ($1, $2, $3, $4);
            `;

            // Insert each size associated with the new menu item
            for (const size of sizes) {
                const { item_size, price, calories } = size;
                await pool.query(insertSizeText, [menuItemId, item_size, price, calories]);
            }

            // Commit transaction
            await pool.query('COMMIT');
            
            // Send response
            res.status(201).json({ message: 'Menu item added successfully' });
        } catch (error) {
            // Rollback transaction in case of error
            await pool.query('ROLLBACK');
            console.error('Error adding menu item:', error);
            res.status(500).json({ error: 'Failed to add menu item' });
        }
    } else if (req.method === 'DELETE') {
        // Handle removing a menu item
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Menu item ID is required' });
        }

        try {
            // Start a transaction to ensure both menu item and its sizes are deleted together
            await pool.query('BEGIN');

            // Delete item sizes for the menu item
            const deleteSizesText = `DELETE FROM item_sizes WHERE item_id = $1`;
            await pool.query(deleteSizesText, [id]);

            // Delete menu item
            const deleteMenuItemText = `DELETE FROM menu_items WHERE id = $1`;
            await pool.query(deleteMenuItemText, [id]);

            // Commit transaction
            await pool.query('COMMIT');

            // Send response
            res.status(200).json({ message: 'Menu item removed successfully' });
        } catch (error) {
            // Rollback transaction in case of error
            await pool.query('ROLLBACK');
            console.error('Error removing menu item:', error);
            res.status(500).json({ error: 'Failed to remove menu item' });
        }
    } else {
        // Handle method not allowed
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
