import { Pool } from 'pg';  // If you're using PostgreSQL

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        try {
            // Delete the order from the database
            const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Failed to delete order" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });  // Only allow DELETE requests
    }
}
