import { Pool } from "pg";

const pool = new Pool({
    host: "csce-315-db.engr.tamu.edu",
    user: "team_xg",
    database: "team_xg_db",
    password: "palenumber97",
    port: 5432,
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const result = await pool.query("SELECT * FROM employees");//want all information
            res.status(200).json(result.rows);
        } catch (error) {
            console.error("Error fetching employees:", error);
            res.status(500).json({ error: "Error fetching employees" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
