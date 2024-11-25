// src/app/employee/manager/reports/product-usage/page.js
"use client";

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart from Chart.js
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head'; // Import Head for page metadata
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary components from Chart.js

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductUsageChart = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [n, setN] = useState(10); // Default number of items to display is 10

    useEffect(() => {
        // Fetch product usage data from the API with the specified number of items (n)
        const fetchProductUsageData = async () => {
            setLoading(true);  // Set loading to true
            setError(null);     // Reset error message
            
            try {
                // Include the number of items (n) in the API request
                const response = await fetch(`/api/getProducts?type=usage&limit=${n}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    setProductData(data);  // Update the state with the fetched data
                } else {
                    setError("No data found");  // Show error message if no data is found
                }
            } catch (err) {
                setError("Failed to load data");  // Show error message if the fetch fails
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);  // Set loading to false after fetching is done
            }
        };

        fetchProductUsageData();
    }, [n]); // Re-run this effect whenever `n` changes

    // Handle the change in the number of items to display
    const handleNChange = (e) => {
        setN(Number(e.target.value)); // Update the number of items to display
    };

    // Prepare chart data
    const chartData = {
        labels: productData.map(item => item.meal_item_name || 'Unknown'), // Handle missing names
        datasets: [
            {
                label: 'Times Ordered',
                data: productData.map(item => item.times_ordered || 0), // Handle missing counts
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Ordered: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Times Ordered',
                },
                type: 'linear',  // Ensure the y-axis scale is linear
            },
            x: {
                title: {
                    display: true,
                    text: 'Meal Items',
                },
                type: 'category',  // Ensure the x-axis is categorical
            },
        },
    };

    return (
        <>
            <Head>
                <title>Product Usage Report</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Product Usage Report</h2>

                <div className="form-group">
                    <label htmlFor="itemsToShow">Number of items to display:</label>
                    <input
                        id="itemsToShow"
                        type="number"
                        min="1"
                        value={n}
                        onChange={handleNChange}
                        className="form-control"
                    />
                </div>

                {loading ? (
                    <div className="alert alert-info text-center" role="alert">
                        Loading data...
                    </div>
                ) : error ? (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                ) : (
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <Bar data={chartData} options={options} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductUsageChart;
