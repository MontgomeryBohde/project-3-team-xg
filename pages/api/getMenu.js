/**
 * @file getMenu.js
 * @description API handler for managing menu items. Supports retrieving, adding, editing, and removing menu items in the database.
 * @module api/getMenu
 * @requires @lib/db
 */

import { query } from "@lib/db";

/**
 * API handler function for menu operations.
 * Handles different operations like retrieving, adding, editing, and removing menu items.
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

    if (req.method === "GET" || req.method === "POST") {
        try {
            let result;

            switch (type) {
                /**
                 * Retrieve all menu items.
                 * @route GET /api/getMenu?type=menu
                 */
                case "menu": {
                    // Fetch all menu items
                    result = await query("SELECT * FROM menu_items;");
                    return res.status(200).json(result || []);
                }

                /**
                 * Add a new menu item to the database.
                 * @route POST /api/getMenu?type=addMenuItem
                 * @param {string} item_name - Name of the menu item.
                 * @param {string} category - Category of the menu item.
                 * @param {string} descr - Description of the menu item.
                 * @param {boolean} available - Availability status of the menu item.
                 * @param {boolean} is_seasonal - Whether the menu item is seasonal.
                 * @param {string|null} image_url - URL of the menu item's image.
                 */
                case "addMenuItem": {
                    const {
                        item_name,
                        category,
                        descr,
                        available = true,
                        is_seasonal = false,
                        image_url = null,
                    } = req.body || {};

                    // Validate input for adding menu items
                    if (!item_name || !category || !descr) {
                        return res.status(400).json({ error: "Invalid input for adding menu item" });
                    }

                    result = await query(
                        `
                        INSERT INTO menu_items (item_name, category, descr, available, is_seasonal, image_url)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING *;
                        `,
                        [item_name, category, descr, available, is_seasonal, image_url]
                    );
                    break;
                }

                /**
                 * Edit an existing menu item in the database.
                 * @route POST /api/getMenu?type=editMenuItem
                 * @param {number} id - ID of the menu item to edit.
                 * @param {string} item_name - Updated name of the menu item.
                 * @param {string} category - Updated category.
                 * @param {string} descr - Updated description.
                 * @param {boolean} available - Updated availability status.
                 * @param {boolean} is_seasonal - Updated seasonal status.
                 * @param {string|null} image_url - Updated image URL of the menu item.
                 */
                case "editMenuItem": {
                    const {
                        id,
                        item_name,
                        category,
                        descr,
                        available,
                        is_seasonal,
                        image_url,
                    } = req.body || {};

                    // Validate inputs
                    if (!id || !item_name || !category || !descr) {
                        return res.status(400).json({ error: "Invalid input for editing menu item" });
                    }

                    result = await query(
                        `
                        UPDATE menu_items
                        SET item_name = $1, category = $2, descr = $3, available = $4, is_seasonal = $5, image_url = $6
                        WHERE id = $7
                        RETURNING *;
                        `,
                        [item_name, category, descr, available, is_seasonal, image_url, id]
                    );
                    break;
                }

                /**
                 * Remove a menu item from the database.
                 * @route POST /api/getMenu?type=removeMenuItem
                 * @param {number} id - ID of the menu item to remove.
                 */
                case "removeMenuItem": {
                    const { id } = req.body || {};

                    if (!id) {
                        return res
                            .status(400)
                            .json({ error: "Menu item ID is required for removal" });
                    }

                    result = await query(
                        `
                        DELETE FROM menu_items
                        WHERE id = $1
                        RETURNING *;
                        `,
                        [id]
                    );

                    if (!result?.rows?.length) {
                        return res.status(404).json({ error: "Menu item not found" });
                    }
                    break;
                }

                /**
                 * Default case for invalid action type.
                 */
                default:
                    return res.status(400).json({ error: "Invalid action type" });
            }

            res.status(200).json(result?.rows || []);
        } catch (error) {
            console.error("Error handling menu request:", error);
            res.status(500).json({ error: "Failed to process menu request" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
