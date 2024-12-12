"use client";

/**
 * @fileoverview This file contains the SalesReport component which displays a sales report using Chart.js.
 * It includes the necessary imports and the SalesChart component to fetch and display sales data.
 * 
 * @requires chartjs-adapter-date-fns
 * @requires react
 * @requires react-chartjs-2
 * @requires chart.js
 * @requires next/head
 * @requires @/components/ui/employee/header/EmployeeLogInHeader
 */


import 'chartjs-adapter-date-fns';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    TimeScale,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    Title,
    Legend
} from "chart.js";
import Head from "next/head";

import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

ChartJS.register(TimeScale, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * SalesReport component that renders the sales report page.
 * 
 * @returns {JSX.Element} The SalesReport component.
 */
const SalesReport = () => {
    return (
        <>
            <Head>
                <title>Sales Report</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                <h2 className="text-center">Sales Report</h2>
                <SalesChart />
            </div>
        </>
    );
};

/**
 * SalesChart component that fetches and displays sales data in a chart.
 * 
 * @returns {JSX.Element} The SalesChart component.
 */
function SalesChart() {
    const [chartData, setChartData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('365'); // Default is 1 year

    /**
     * Fetches sales data for the specified period.
     * 
     * @param {string} period - The period for which to fetch sales data.
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const fetchSalesData = async (period) => {
        try {
            const response = await fetch(`/api/getReports?type=allSales&period=${period}`);
            if (!response.ok) {
                throw new Error('Failed to fetch sales data');
            }
    
            const salesData = await response.json();
            console.log('Sales Data:', salesData); // Debugging log
    
            if (!salesData.success || !Array.isArray(salesData.data)) {
                throw new Error('Invalid sales data format');
            }
    
            const labels = salesData.data.map(entry => new Date(entry.order_date));
            const data = salesData.data.map(entry => parseFloat(entry.daily_total));
    
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Daily Sales',
                        data: data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                        tension: 0.2,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };    

    useEffect(() => {
        fetchSalesData(selectedPeriod);
    }, [selectedPeriod]);

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'PP',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    autoSkip: true,
                    stepSize: 7,
                    minRotation: 45,
                    maxRotation: 90,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Sales Total ($)',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: context => `$${context.formattedValue}`,
                },
            },
        },
    };

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="timeRange" className="form-label">Select Time Period</label>
                <select
                    id="timeRange"
                    className="form-select"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                    <option value="7">Past 7 Days</option>
                    <option value="30">Past 30 Days</option>
                    <option value="180">Past 6 Months</option>
                    <option value="365">Past 1 Year</option>
                </select>
            </div>

            {chartData ? (
                <Line data={chartData} options={options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
}

export default SalesReport;
