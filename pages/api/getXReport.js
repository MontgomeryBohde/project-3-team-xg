// pages/api/getXReport.js// pages/api/getXReport.js
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
        try {
            const { hour } = req.query; // Get the selected hour from the frontend

            // Adjust the time query to include earlier or later sales in the appropriate bucket
            let adjustedHour = parseInt(hour);
            if (adjustedHour < 10) {
                adjustedHour = 10; // If the hour selected is before 10 AM, include in 10 AM slot
            }
            if (adjustedHour > 21) {
                adjustedHour = 21; // If the hour selected is after 9 PM, include in 9 PM slot
            }

            // Get today's date in 'YYYY-MM-DD' format
            const today = new Date().toISOString().split('T')[0];

            // Query to get total sales for the selected hour for today, including data from 9 AM to 9 PM
            const query = `
                SELECT
                    EXTRACT(HOUR FROM order_time) AS order_hour,
                    SUM(order_total) AS total_sales,
                    COUNT(*) AS transaction_count,
                    SUM(CASE WHEN payment_method = 'cash' THEN order_total ELSE 0 END) AS cash_collected,
                    SUM(CASE WHEN payment_method = 'credit card' THEN order_total ELSE 0 END) AS credit_card_payments
                FROM
                    orders
                WHERE
                    DATE(order_time) = $1
                    AND EXTRACT(HOUR FROM order_time) >= 9
                    AND EXTRACT(HOUR FROM order_time) <= 22  -- Include hours up to 10 PM (21)
                GROUP BY
                    order_hour
                ORDER BY
                    order_hour
            `;
            
            const { rows } = await pool.query(query, [today]);

            // Adjust data grouping for the first and last hour if needed
            let adjustedData = rows.map(row => ({
                hour: row.order_hour === 9 ? 10 : row.order_hour,  // Move 9 AM data to 10 AM slot
                total_sales: row.total_sales,
                transaction_count: row.transaction_count,
                cash_collected: row.cash_collected,
                credit_card_payments: row.credit_card_payments,
            }));

            // Combine data for the 9 AM and 10 AM slots, and the 9 PM and 10 PM slots
            const combinedData = adjustedData.reduce((acc, curr) => {
                if (curr.hour === 10) {
                    acc[10] = acc[10] ? {
                        total_sales: acc[10].total_sales + curr.total_sales,
                        transaction_count: acc[10].transaction_count + curr.transaction_count,
                        cash_collected: acc[10].cash_collected + curr.cash_collected,
                        credit_card_payments: acc[10].credit_card_payments + curr.credit_card_payments
                    } : curr;
                } else if (curr.hour === 21 || curr.hour === 22) {
                    // Combine the 9 PM and 10 PM data into the 9 PM slot
                    acc[21] = acc[21] ? {
                        total_sales: acc[21].total_sales + curr.total_sales,
                        transaction_count: acc[21].transaction_count + curr.transaction_count,
                        cash_collected: acc[21].cash_collected + curr.cash_collected,
                        credit_card_payments: acc[21].credit_card_payments + curr.credit_card_payments
                    } : curr;
                } else {
                    acc[curr.hour] = curr;
                }
                return acc;
            }, {});

            // Return the combined data for all hours (including the 9 PM slot)
            const finalReport = Object.values(combinedData).sort((a, b) => a.hour - b.hour);

            // Send the final report as the response
            res.status(200).json(finalReport);
        } catch (error) {
            console.error('Error fetching X report data:', error);
            res.status(500).json({ error: 'Failed to fetch X report data', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
