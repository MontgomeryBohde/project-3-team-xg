// pages/api/getEmployees.js
import { query } from "@lib/db";

/**
 * Handles the API requests for fetching a list of employees.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const result = await query("SELECT * FROM employees;");
            res.status(200).json(result);
        } catch (error) {
            console.error("Error fetching employees:", error);
            res.status(500).json({ error: "Error fetching employees" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
