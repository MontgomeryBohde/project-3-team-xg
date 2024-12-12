// pages/api/getShifts.js
import { query } from "@lib/db";

/**
 * API handler for managing shifts.
 * 
 * @param {Object} req - The request object.
 * @param {string} req.method - The HTTP method of the request.
 * @param {Object} req.body - The body of the request.
 * @param {Object} req.query - The query parameters of the request.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - The response to the client.
 */
export default async function handler(req, res) {
    const { method, body, query: queryParams } = req;

    try {
        if (method === "GET") {
            // Check if the request includes payData parameter
            if (queryParams.includePayData === "true") {
                const payDataQuery = `
                    SELECT 
                        e.id,
                        e.first_name,
                        e.last_name,
                        e.hourly_rate,
                        SUM(EXTRACT(EPOCH FROM (COALESCE(s.end_time, NOW()) - s.start_time)) / 3600) AS total_hours,
                        SUM(EXTRACT(EPOCH FROM (COALESCE(s.end_time, NOW()) - s.start_time)) / 3600) * e.hourly_rate AS total_pay
                    FROM 
                        employees e
                    LEFT JOIN 
                        shifts s ON e.id = s.employee_id
                    GROUP BY 
                        e.id, e.first_name, e.last_name, e.hourly_rate
                    ORDER BY 
                        e.id;
                `;

                const payData = await query(payDataQuery);
                return res.status(200).json({ payData });
            }

            // Default behavior: get all shifts
            const shifts = await query("SELECT * FROM shifts");
            return res.status(200).json({ shifts });
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
