// src/app/employee/manager/reports/menu-popularity/page.js

"use client";

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';  // Importing Bar chart from Chart.js
import Chart from 'chart.js/auto';      // Automatically registering Chart.js components
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head';  // Import Head for page metadata

const ProductUsageChart = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProductUsageData = async () => {
            try {
                const response = await fetch('/api/getProducts?type=usage');
                if (!response.ok) {
                    throw new Error('Failed to fetch product usage data');
                }
                const data = await response.json();
    
                // Process the data into the format Chart.js requires
                if (data && data.length > 0) {
                    setProductData(data);
                }
            } catch (error) {
                console.error('Error fetching product usage data:', error);
            }
        };
    
        fetchProductUsageData();
    }, []);    

    // Prepare chart data
    const chartData = {
        labels: productData.map(item => item.meal_item_name),  // X-axis labels (meal names)
        datasets: [
            {
                label: 'Times Ordered',
                data: productData.map(item => item.times_ordered),  // Y-axis data (order counts)
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',        // Bar border color
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
    };

    return (
        <>
            <Head>
                <title>Menu Popularity</title>
            </Head>
            <EmployeeLogInHeader />
            <h2 className="m-4 text-center">Product Usage Report</h2>

            {productData.length > 0 ? (
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Bar data={chartData} options={options} />
                    </div>
                </div>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    Loading data...
                </div>
            )}
        </>
    );
};

export default ProductUsageChart;