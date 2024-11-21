// pages/api/getShifts/index.js
import { query } from "@lib/db";

export default async function handler(req, res) {
    const { method, body } = req;

    try {
        if (method === "GET") {
            const result = await query("SELECT * FROM shifts");
            return res.status(200).json({ shifts: result });
        }

        if (method === "POST") {
            const { employee_id, action } = body;

            if (action === "clock-in") {
                const activeShift = await query(
                    "SELECT * FROM shifts WHERE employee_id = $1 AND end_time IS NULL ORDER BY start_time DESC LIMIT 1",
                    [employee_id]
                );

                if (activeShift.length > 0) {
                    console.log(`Active shift found for Employee ${employee_id}:`, activeShift[0]);
                    return res.status(200).json({ shift: activeShift[0] });
                }

                const newShift = await query(
                    "INSERT INTO shifts (employee_id, start_time) VALUES ($1, NOW()) RETURNING *",
                    [employee_id]
                );

                if (!newShift || newShift.length === 0) {
                    console.error("Failed to create a new shift.");
                    return res.status(500).json({ message: "Failed to clock in. Please try again." });
                }

                console.log("New shift created for Employee:", newShift[0]);
                return res.status(201).json({ shift: newShift[0] });
            }

            return res.status(400).json({ message: "Invalid action for POST request." });
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
        console.error("Error handling shift request:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
