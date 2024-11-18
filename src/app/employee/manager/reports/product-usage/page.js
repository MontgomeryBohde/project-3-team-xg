// src/app/employee/manager/reports/product-usage/page.js
"use client";

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart from Chart.js
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head'; // Import Head for page metadata

const ProductUsageChart = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product usage data from the API
        const fetchProductUsageData = async () => {
            const response = await fetch('/api/getProducts?type=usage');
            const data = await response.json();

            // Process the data into the format Chart.js requires
            if (data && data.length > 0) {
                setProductData(data);
            }
        };

        fetchProductUsageData();
    }, []);

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
            },
            x: {
                title: {
                    display: true,
                    text: 'Meal Items',
                },
            },
        },
    };

    return (
        <>
            <Head>
                <title>Menu Popularity</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Product Usage Report</h2>

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
