/**
 * @file getItemSizes.js
 * @description API handler for retrieving item sizes based on the item ID.
 * @module api/getItemSizes
 * @requires @lib/db
 */

import { query } from '@lib/db';

/**
 * API handler function for retrieving item sizes.
 * Fetches size details for a specific item based on its ID.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
export default async function handler(req, res) {

    if (req.method === 'GET') {
        /**
         * Extracts the `item_id` query parameter to identify the item.
         * @type {string|number} item_id
         */
        const { item_id } = req.query;

        if (!item_id) {
            return res.status(400).json({ error: 'item_id is required' });
        }

        try {
            /**
             * Query the database to fetch sizes for the given item ID.
             * @type {Array<object>}
             */
            const itemSizes = await query(
                'SELECT * FROM item_sizes WHERE item_id = $1;',
                [item_id]
            );
            res.status(200).json(itemSizes);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch item sizes' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
