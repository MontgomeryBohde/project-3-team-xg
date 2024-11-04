// sales report page
"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const SalesReport = () => {
    return (
        <>
            <Head>
                <title>Sales Report</title>
            </Head>
            <EmployeeHeader />
            <div className="container mt-4">
                <h2 className="text-center">Sales Report</h2>
                <SalesChart id="bitcoin" /> {} //id corresponds to db id
            </div>
        </>
    );
};

const SalesChart = ({ id }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const [days, setDays] = useState(30); // Default to 30 days

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&precision=2&interval=daily`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.log(error);
                setError("Failed to load chart data");
            }
        };
        fetchData();
    }, [id, days]);

    const handleDaysChange = (event) => {
        setDays(event.target.value);
    };

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!chartData || !chartData.prices) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
            </div>
        );
    }

    const { prices } = chartData;
    const data = {
        labels: prices.map(entry => new Date(entry[0]).toLocaleDateString()),
        datasets: [
            {
                label: "Price (USD)",
                data: prices.map(entry => entry[1].toFixed(2)),
                borderColor: "orange",
                borderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Sales Chart</h3>
                <select
                    className="form-select w-auto"
                    value={days}
                    onChange={handleDaysChange}
                >
                    <option value="1">1 Day</option>
                    <option value="7">7 Days</option>
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">6 Months</option>
                    <option value="365">1 Year</option>
                </select>
            </div>
            <Line data={data} />
        </div>
    );
};

export default SalesReport;
