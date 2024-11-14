// pages/api/getXReport.js

import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

export default async function getXReport(req, res) {
    if (req.method === 'GET') {
        const { hour } = req.query;  // Get the hour from the query parameters
        if (!hour) {
            return res.status(400).json({ error: 'Hour is required' });
        }

        try {
            // Query for the data for the specified hour
            const query = `
                SELECT 
                    SUM(order_total) AS total_sales,
                    COUNT(order_id) AS transaction_count,
                    SUM(CASE WHEN payment_type = 'cash' THEN order_total ELSE 0 END) AS cash_collected,
                    SUM(CASE WHEN payment_type = 'credit card' THEN order_total ELSE 0 END) AS credit_card_payments
                FROM 
                    orders
                WHERE
                    EXTRACT(HOUR FROM order_time) = $1  -- Filter by the selected hour
                GROUP BY 
                    EXTRACT(HOUR FROM order_time)
            `;
            
            const { rows } = await pool.query(query, [hour]);

            // If no data, return default zero values
            if (rows.length === 0) {
                return res.status(200).json({
                    total_sales: 0,
                    transaction_count: 0,
                    cash_collected: 0,
                    credit_card_payments: 0
                });
            }

            // Return the data for the selected hour
            const data = rows[0];
            res.status(200).json({
                total_sales: parseFloat(data.total_sales),
                transaction_count: parseInt(data.transaction_count),
                cash_collected: parseFloat(data.cash_collected),
                credit_card_payments: parseFloat(data.credit_card_payments)
            });
        } catch (error) {
            console.error('Error fetching X report data:', error);
            res.status(500).json({ error: 'Failed to fetch X report data', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
