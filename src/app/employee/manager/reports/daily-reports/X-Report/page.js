// src/app/employee/manager/reports/daily-reports/X-Report/page.js

"use client";

import { useEffect, useState } from 'react';
import EmployeeHeader from '@/components/ui/employee/header/EmployeeHeader';
import Head from 'next/head';

const XReport = () => {
    const [reportData, setReportData] = useState(null);
    const [selectedHour, setSelectedHour] = useState(getCurrentHour()); // Default to the current hour
    const [hourlyData, setHourlyData] = useState(null);

    // Get the current hour, with constraints for open hours
    function getCurrentHour() {
        const currentHour = new Date().getHours();
        if (currentHour < 10) {
            return 10; // Before 10:00 AM, default to 10:00 AM
        }
        return currentHour <= 21 ? currentHour : 21; // After 9:00 PM, default to 9:00 PM
    }

    // Handle hour change from dropdown
    const handleHourChange = (event) => {
        const hour = event.target.value;
        setSelectedHour(hour);
        fetchReportForHour(hour);  // Fetch data for the selected hour
    };

    // Fetch the X report data
    const fetchReportForHour = async (hour) => {
        try {
            const response = await fetch(`/api/getXReport?hour=${hour}`);
            const data = await response.json();
            setHourlyData(data);
        } catch (error) {
            console.error('Error fetching X report data:', error);
        }
    };

    useEffect(() => {
        fetchReportForHour(selectedHour);
    }, [selectedHour]);

    const formatCurrency = (value) => {
        return value !== null && value !== undefined ? `$${value.toFixed(2)}` : '$0.00';
    };

    const openHours = [...Array(12).keys()].map(i => i + 10); // 10 AM to 9 PM

    return (
        <>
            <Head>
                <title>X Report</title>
            </Head>
            <EmployeeHeader />
            <div className="container mt-4">
                <h2 className="text-center">X Report</h2>
                
                {/* Hour selection dropdown */}
                <div className="mb-3">
                    <label htmlFor="hour" className="form-label">Select Hour</label>
                    <select
                        id="hour"
                        className="form-select"
                        value={selectedHour}
                        onChange={handleHourChange}
                    >
                        {/* Only allow selection from open hours (10 AM to 9 PM) */}
                        {openHours.map(hour => (
                            <option key={hour} value={hour}>
                                {hour}:00
                            </option>
                        ))}
                    </select>
                </div>

                {/* Display the report data */}
                {hourlyData ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Total Sales</th>
                                <th>Transactions</th>
                                <th>Cash Collected</th>
                                <th>Credit Card Payments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{formatCurrency(hourlyData.total_sales)}</td>
                                <td>{hourlyData.transaction_count}</td>
                                <td>{formatCurrency(hourlyData.cash_collected)}</td>
                                <td>{formatCurrency(hourlyData.credit_card_payments)}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default XReport;