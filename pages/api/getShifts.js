// pages/api/getShifts/index.js
import { query } from "@lib/db";

export default async function handler(req, res) {
    const { method, body } = req;

    try {
        if (method === "GET") {
            // Get all shifts
            const result = await query("SELECT * FROM shifts");
            return res.status(200).json({ shifts: result });
        }

        if (method === "POST") {
            const { employee_id, action } = body;

            if (action === "clock-in") {
                // Check for an active shift
                const activeShift = await query(
                    "SELECT * FROM shifts WHERE employee_id = $1 AND end_time IS NULL ORDER BY start_time DESC LIMIT 1",
                    [employee_id]
                );

                if (activeShift.length > 0) {
                    return res.status(200).json({ shift: activeShift[0] });
                }

                // Start a new shift
                const newShift = await query(
                    "INSERT INTO shifts (employee_id, start_time) VALUES ($1, NOW()) RETURNING *",
                    [employee_id]
                );

                return res.status(201).json({ shift: newShift[0] });
            }

            if (action === "clock-out") {
                const { id } = body;

                if (!id) {
                    return res.status(400).json({ message: "Shift ID is required for clock-out." });
                }

                // Ensure the shift exists and is active
                const result = await query(
                    "SELECT * FROM shifts WHERE id = $1 AND end_time IS NULL",
                    [id]
                );

                if (result.length === 0) {
                    return res.status(404).json({ message: "Shift not found or already ended." });
                }

                // Update the shift to set the end_time
                const updatedShift = await query(
                    "UPDATE shifts SET end_time = NOW() WHERE id = $1 RETURNING *",
                    [id]
                );

                return res.status(200).json({ shift: updatedShift[0] });
            }

            return res.status(400).json({ message: "Invalid action for POST request." });
        }

        return res.status(405).json({ message: "Method not allowed." });
    } catch (error) {
        console.error("Error handling shift request:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
