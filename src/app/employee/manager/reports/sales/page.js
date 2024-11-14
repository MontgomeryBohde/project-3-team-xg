// src/app/employee/manager/reports/sales/page.js
"use client";

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
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";

import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";

ChartJS.register(TimeScale, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesReport = () => {
    return (
        <>
            <Head>
                <title>Sales Report</title>
            </Head>
            <EmployeeHeader />
            <div className="container mt-4">
                <h2 className="text-center">Sales Report</h2>
                <SalesChart />
            </div>
        </>
    );
};

function SalesChart() {
    const [chartData, setChartData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('365'); // Default is 1 year

    const fetchSalesData = async (period) => {
        try {
            const response = await fetch(`/api/getAllSales?period=${period}`);
            const salesData = await response.json();

            const labels = salesData.map(entry => new Date(entry.date));
            const data = salesData.map(entry => entry.total);

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
                    stepSize: 7, // Change step size as needed
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