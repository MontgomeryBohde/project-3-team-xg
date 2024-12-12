// src/app/employee/manager/reports/daily-reports/X-Report/page.js
"use client";

/**
 * @requires useEffect
 * @requires useState
 * @requires EmployeeLogInHeader
 * @requires Head
 */

import { useEffect, useState } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head';


/**
 * XReport component
 * @component
 * @returns {JSX.Element} The XReport component
 */
const XReport = () => {
    const [reportData, setReportData] = useState(null);
    const [selectedHour, setSelectedHour] = useState(getCurrentHour()); // Default to current hour
    const [hourlyData, setHourlyData] = useState(null);

    /**
     * Get the current hour, adjusted for open hours (10:00 AM to 9:00 PM)
     * @function
     * @returns {number} The current hour adjusted for open hours
     */
    function getCurrentHour() {
        const currentHour = new Date().getHours();
        if (currentHour < 10) {
            return 10; // Before 10:00 AM, default to 10:00 AM
        }
        return currentHour <= 21 ? currentHour : 21; // After 9:00 PM, default to 9:00 PM
    }

    /**
     * Handle hour change event
     * @function
     * @param {Object} event - The event object
     */
    const handleHourChange = (event) => {
        const hour = event.target.value;
        setSelectedHour(hour);
        fetchReportForHour(hour);  // Fetch data for selected hour
    };

    /**
     * Fetch report data for a selected hour
     * @async
     * @function
     * @param {number} hour - The selected hour
     */
    const fetchReportForHour = async (hour) => {
        try {
            const response = await fetch(`/api/getReports?type=xReport&hour=${hour}`);
            const text = await response.text(); // Get raw response text
            console.log('Raw response:', text);
            const data = JSON.parse(text); // Manually parse the text to JSON
            console.log('Parsed data:', data);
            if (data.success && Array.isArray(data.data)) {
                setHourlyData(data.data);
            } else {
                console.error('Unexpected data format:', data);
                setHourlyData([]);
            }
        } catch (error) {
            console.error('Error fetching X report data:', error);
            setHourlyData([]);
        }
    };

    useEffect(() => {
        fetchReportForHour(selectedHour);
    }, [selectedHour]);

    const formatCurrency = (value) => {
        // Convert the value to a number and check if it's a valid number
        const numericValue = Number(value);
        
        // Check if the numeric value is a valid number
        if (isNaN(numericValue)) {
            return '$0.00'; // Return default value if invalid
        }
    
        // Format the number as a currency string
        return `$${numericValue.toFixed(2)}`;
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
                {hourlyData && hourlyData.length > 0 ? (
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
                                    <td>{row.order_hour === 10 ? '10:00 AM' : `${row.order_hour}:00`}</td>
                                    <td>{formatCurrency(row.total_sales)}</td>
                                    <td>{row.transaction_count}</td>
                                    <td>{formatCurrency(row.cash_collected)}</td>
                                    <td>{formatCurrency(row.credit_card_payments)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available for the selected hour.</p>
                )}
            </div>
        </>
    );
};

export default XReport;