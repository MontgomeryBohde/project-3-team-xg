// pages/api/getMenu.js
import { query } from "@lib/db";

export default async function handler(req, res) {
    const { type } = req.query;

    if (req.method === "GET" || req.method === "POST") {
        try {
            let result;

            switch (type) {
                case "menu": {
                    // Fetch all menu items
                    result = await query("SELECT * FROM menu_items;");
                    return res.status(200).json(result || []);
                }

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
