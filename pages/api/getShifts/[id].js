// pages/api/getShifts/[id].js
import { query } from "@lib/db";

export default async function handler(req, res) {
    const { method, query: params, body } = req;
    const { id } = params;

    try {
        if (method === "PATCH") {
            console.log("Received Shift ID:", id); // Debugging

            if (!id) {
                return res.status(400).json({ message: "Shift ID is required for this action." });
            }

            const { action } = body;

            if (action === "clock-out") {
                // Ensure the shift exists and is active
                const result = await query(
                    "SELECT * FROM shifts WHERE id = $1 AND end_time IS NULL",
                    [id]
                );

                if (!result || result.length === 0) {
                    console.error(`Shift not found or already ended for ID: ${id}`);
                    return res.status(404).json({ message: "Shift not found or already ended." });
                }

                // Update the shift to set the end_time
                const updatedShift = await query(
                    "UPDATE shifts SET end_time = NOW() WHERE id = $1 RETURNING *",
                    [id]
                );

                if (!updatedShift || updatedShift.length === 0) {
                    console.error(`Failed to clock out for Shift ID: ${id}`);
                    return res.status(500).json({ message: "Failed to clock out. Please try again." });
                }

                console.log("Clocked Out Successfully:", updatedShift[0]);
                return res.status(200).json({ shift: updatedShift[0] });
            }

            console.error("Invalid action for PATCH request:", action);
            return res.status(400).json({ message: "Invalid action for PATCH request." });
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
        console.error("Error handling shift request:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
