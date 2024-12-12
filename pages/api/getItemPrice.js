// pages/api/getItemPrice.js
import { query } from "@lib/db";

/**
 * API handler to get the price of a menu item based on its size.
 * 
 * @param {Object} req - The request object.
 * @param {string} req.method - The HTTP method of the request.
 * @param {Object} req.body - The body of the request.
 * @param {number} req.body.menuItemId - The ID of the menu item.
 * @param {number} req.body.itemSizeId - The ID of the item size.
 * @param {Object} res - The response object.
 * @param {Function} res.status - Function to set the HTTP status code.
 * @param {Function} res.json - Function to send a JSON response.
 */
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { menuItemId, itemSizeId } = req.body;

        try {
            const sqlQuery = `
                SELECT ROUND(price, 2) AS price
                FROM item_sizes
                WHERE id = $1 AND menu_item_id = $2;
            `;
            const values = [itemSizeId, menuItemId];
            const { rows } = await query(sqlQuery, values); // Use the query function from @lib/db

            if (rows.length > 0) {
                res.status(200).json({ price: rows[0].price });
            } else {
                res.status(404).json({ message: 'Price not found' });
            }
        } catch (error) {
            console.error("Error fetching price:", error);
            res.status(500).json({ error: 'Error fetching price' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
