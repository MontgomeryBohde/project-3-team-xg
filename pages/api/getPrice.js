import { Client } from 'pg';

export default async function handler(req, res) {
    console.log("Received request body:", req.body); 

    const { foodNames } = req.body;

    if (!foodNames || !Array.isArray(foodNames) || foodNames.length === 0) {
        console.error("Invalid foodNames input:", foodNames);
        return res.status(400).json({ error: "Bad Request: foodNames is required and should be a non-empty array" });
    }

    const client = new Client({
        host: 'csce-315-db.engr.tamu.edu',
        user: 'team_xg',
        password: 'palenumber97',
        database: 'team_xg_db',
    });

    try {
        await client.connect();
        console.log("Database connected successfully");

        const query = `
            SELECT 
                menu_items.name, 
                item_sizes.size, 
                item_sizes.price
            FROM 
                menu_items
            JOIN 
                item_sizes ON item_sizes.item_id = menu_items.id  -- Use item_id to join
            WHERE 
                menu_items.name = ANY($1);
        `;

        const values = [foodNames];

        const result = await client.query(query, values);
        console.log("Fetched prices:", result.rows); 

       
        const prices = result.rows.reduce((acc, row) => {
            if (!acc[row.name]) {
                acc[row.name] = {};
            }
            acc[row.name][row.size] = row.price; 
            return acc;
        }, {});

        res.status(200).json(prices);
    } catch (error) {
        console.error("Error during database query:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.end();
        console.log("Database connection closed");
    }
}
