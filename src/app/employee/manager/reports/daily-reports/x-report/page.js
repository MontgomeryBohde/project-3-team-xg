// src/app/employee/manager/reports/daily-reports/X-Report/page.js
"use client";

import { useEffect, useState } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head';

const XReport = () => {
    const [reportData, setReportData] = useState(null);
    const [selectedHour, setSelectedHour] = useState(getCurrentHour()); // Default to current hour
    const [hourlyData, setHourlyData] = useState(null);

    // Get the current hour, adjusted for open hours (10:00 AM to 9:00 PM)
    function getCurrentHour() {
        const currentHour = new Date().getHours();
        if (currentHour < 10) {
            return 10; // Before 10:00 AM, default to 10:00 AM
        }
        return currentHour <= 21 ? currentHour : 21; // After 9:00 PM, default to 9:00 PM
    }

    // Fetch report data for a selected hour
    const handleHourChange = (event) => {
        const hour = event.target.value;
        setSelectedHour(hour);
        fetchReportForHour(hour);  // Fetch data for selected hour
    };

    const fetchReportForHour = async (hour) => {
        try {
            const response = await fetch(`/api/getReports?type=xReport&hour=${hour}`);
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

    // Open hours from 10 AM to 9 PM
    const openHours = [...Array(12).keys()].map(i => i + 10); // 10 AM to 9 PM

    const getAdjustedOpenHours = () => {
        const adjustedHours = [...openHours];
        const currentHour = new Date().getHours();

        if (currentHour < 10) {
            adjustedHours[0] = 9; // If current hour is before 10 AM, show 9:00 AM to 10:00 AM
        }

        if (currentHour >= 21) {
            adjustedHours[adjustedHours.length - 1] = 22; // Show 9:00 PM to 10:00 PM if after 9 PM
        }

        return adjustedHours;
    };

    const adjustedOpenHours = getAdjustedOpenHours();

    return (
        <>
            <Head>
                <title>X Report</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                <h2 className="text-center">X Report</h2>

                {/* Dropdown to select the hour */}
                <div className="mb-3">
                    <label htmlFor="hour" className="form-label">Select Hour</label>
                    <select
                        id="hour"
                        className="form-select"
                        value={selectedHour}
                        onChange={handleHourChange}
                    >
                        {adjustedOpenHours.map(hour => (
                            <option key={hour} value={hour}>
                                {hour === 10 ? '10:00 AM' : `${hour}:00`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table to display the hourly report */}
                {hourlyData ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Time Slot</th>
                                <th>Total Sales</th>
                                <th>Transactions</th>
                                <th>Cash Collected</th>
                                <th>Credit Card Payments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hourlyData.map((row, idx) => (
                                <tr key={idx}>
                                    <td>{row.hour === 10 ? '10:00 AM' : `${row.hour}:00`}</td>
                                    <td>{formatCurrency(row.total_sales)}</td>
                                    <td>{row.transaction_count}</td>
                                    <td>{formatCurrency(row.cash_collected)}</td>
                                    <td>{formatCurrency(row.credit_card_payments)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading report...</p>
                )}
            </div>
        </>
    );
};

export default XReport;