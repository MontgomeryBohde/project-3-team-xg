// src/app/employee/manager/reports/daily-reports/Z-Report/page.js
"use client";

import { useEffect, useState } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head';

const ZReport = () => {
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        async function fetchZReport() {
            try {
                const response = await fetch('/api/getReports?type=zReport');
                if (!response.ok) {
                    throw new Error('Failed to fetch Z Report');
                }
                const data = await response.json();
                console.log('API Response:', data);  // Log the full response
                setReportData(data.data);  // Update the state with the API data
            } catch (error) {
                console.error('Error fetching Z report data:', error);
            }
        }

        fetchZReport();
    }, []);    

    const formatCurrency = (value) => {
        const numericValue = parseFloat(value); // Convert string to number
        if (isNaN(numericValue)) {
            return '$0.00'; // Return '$0.00' if the value is not a valid number
        }
        return `$${numericValue.toFixed(2)}`; // Format the number to two decimal places
    };

    return (
        <>
            <Head>
                <title>Z Report</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                <h2 className="text-center">Z Report</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Total Sales</th>
                            <th>Transactions</th>
                            <th>Cash Total</th>
                            <th>Credit Card Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData && reportData.length > 0 ? (
                            <tr>
                                <td>{formatCurrency(reportData[0].total_sales)}</td>
                                <td>{reportData[0].transaction_count}</td>
                                <td>{formatCurrency(reportData[0].cash_total)}</td>
                                <td>{formatCurrency(reportData[0].credit_card_total)}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="4">No data available for today</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ZReport;