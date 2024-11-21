import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { menuItemId, itemSizeId } = req.body;
        try {
            const query = `
                SELECT ROUND(price, 2) AS price
                FROM item_sizes
                WHERE id = $1 AND menu_item_id = $2;
            `;
            const values = [itemSizeId, menuItemId];
            const { rows } = await pool.query(query, values);

            if (rows.length > 0) {
                res.status(200).json({ price: rows[0].price });
            } else {
                res.status(404).json({ message: 'Price not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching price' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
