import { Pool } from 'pg'; 

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

/**
 * Handles the API requests for deleting an order.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        try {
          
            const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.status(200).json({ message: "Order deleted!!" });
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Failed to delete order :(" });
        }
    } else {
        res.status(405).json({ message: "Not Allowed" });  // Only allow DELETE requests
    }
}
