// pages/api/getAllSales.js

import { Pool } from 'pg';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_xg',
    password: 'palenumber97',
    database: 'team_xg_db',
    port: 5432,
});

export default async function getAllSales(req, res) {
    if (req.method === 'GET') {
        try {
            // Get the time range from query params (default to 7 days)
            const { period } = req.query;

            let dateFilter = '';
            if (period === '7') {
                dateFilter = `WHERE order_time >= NOW() - INTERVAL '7 days'`;
            } else if (period === '30') {
                dateFilter = `WHERE order_time >= NOW() - INTERVAL '30 days'`;
            } else if (period === '180') {
                dateFilter = `WHERE order_time >= NOW() - INTERVAL '6 months'`;
            } else if (period === '365') {
                dateFilter = `WHERE order_time >= NOW() - INTERVAL '1 year'`;
            }

            const query = `
                SELECT 
                    DATE(order_time) AS order_date,
                    SUM(order_total) AS daily_total
                FROM 
                    orders
                ${dateFilter}
                GROUP BY 
                    DATE(order_time)
                ORDER BY 
                    order_date
            `;

            const { rows } = await pool.query(query);

            const sales = rows.map(row => ({
                date: row.order_date,
                total: parseFloat(row.daily_total),
            }));

            res.status(200).json(sales);
        } catch (error) {
            console.error('Error fetching sales data:', error);
            res.status(500).json({ error: 'Failed to fetch sales data', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
