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
                setReportData(data);
            } catch (error) {
                console.error('Error fetching Z report data:', error);
            }
        }
    
        fetchZReport();
    }, []);    

    const formatCurrency = (value) => {
        return value !== null && value !== undefined ? `$${value.toFixed(2)}` : '$0.00';
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
                        {reportData ? (
                            <tr>
                                <td>{formatCurrency(reportData.total_sales)}</td>
                                <td>{reportData.transaction_count}</td>
                                <td>{formatCurrency(reportData.cash_total)}</td>
                                <td>{formatCurrency(reportData.credit_card_total)}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ZReport;