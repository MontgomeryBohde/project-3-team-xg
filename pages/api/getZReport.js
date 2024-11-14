// pages/api/getZReport.js

import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

export default async function getZReport(req, res) {
    if (req.method === 'GET') {
        try {
            // Get the current date and time
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
            const currentTime = now.getHours();

            const openTime = `${currentDate} 10:00:00`;
            const closeTime = currentTime < 21 ? now.toISOString() : `${currentDate} 21:00:00`; // If before 9 PM, use current time, else use 9 PM

            const query = `
                SELECT 
                    CURRENT_DATE AS date,
                    SUM(order_total) AS total_sales,
                    COUNT(*) AS transaction_count,
                    SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_total,
                    SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_total
                FROM 
                    orders
                WHERE 
                    order_time BETWEEN $1 AND $2
            `;
            const values = [openTime, closeTime];

            const { rows } = await pool.query(query, values);

            if (rows.length > 0) {
                const zReport = rows[0];
                res.status(200).json({
                    date: zReport.date,
                    total_sales: parseFloat(zReport.total_sales),
                    transaction_count: zReport.transaction_count,
                    cash_total: parseFloat(zReport.cash_total),
                    credit_card_total: parseFloat(zReport.credit_card_total),
                    total_tips: parseFloat(zReport.total_tips),
                    refunds: parseFloat(zReport.refunds),
                });
            } else {
                res.status(404).json({ error: 'No Z Report data available' });
            }
        } catch (error) {
            console.error('Error fetching Z Report data:', error);
            res.status(500).json({ error: 'Failed to fetch Z Report data' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
