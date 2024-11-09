import { Client } from 'pg';

export default async function handler(req, res) {
    console.log("Received request body:", req.body); // Check incoming request data

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

        // Updated query to fetch prices for both food_name and item_size
        const query = `
            SELECT food_name, item_size, price
            FROM menu_items
            WHERE food_name = ANY($1)
        `;

        const values = [foodNames];

        const result = await client.query(query, values);
        console.log("Fetched prices:", result.rows);  // Log database results

        // Organize the prices by food_name and item_size
        const prices = result.rows.reduce((acc, row) => {
            if (!acc[row.food_name]) {
                acc[row.food_name] = {};
            }
            acc[row.food_name][row.item_size] = row.price; // Price keyed by both food_name and item_size
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
