"use client";

/**
 * @file EmployeePay.js
 * @description This file contains the EmployeePay component which fetches and displays employee pay data.
 * @requires React
 */

import React, { useEffect, useState } from "react";

/**
 * EmployeePay component fetches and displays employee pay data.
 * 
 * @component
 * @example
 * return (
 *   <EmployeePay />
 * )
 * @returns {JSX.Element} The EmployeePay component.
 */
const EmployeePay = () => {
    const [employeePayData, setEmployeePayData] = useState([]);

    useEffect(() => {
        /**
         * Fetches shifts and employees data, processes it to calculate total hours and pay for each employee.
         * 
         * @async
         * @function fetchPayData
         * @returns {Promise<void>}
         */
        const fetchPayData = async () => {
            try {
                // Fetch shifts and employees data
                const shiftsResponse = await fetch("/api/getShifts");
                const employeesResponse = await fetch("/api/getEmployees");

                if (shiftsResponse.ok && employeesResponse.ok) {
                    const { shifts } = await shiftsResponse.json();
                    const employees = await employeesResponse.json();

                    // Map employees by ID for quick lookup
                    /**
                     * Maps employees by their ID.
                     * 
                     * @param {Object} acc - Accumulator object.
                     * @param {Object} employee - Employee object.
                     * @param {number} employee.id - Employee ID.
                     * @param {string} employee.first_name - Employee first name.
                     * @param {string} employee.last_name - Employee last name.
                     * @param {string} employee.hourly_rate - Employee hourly rate.
                     * @returns {Object} - Accumulator object with employee data mapped by ID.
                     */
                    const employeesById = employees.reduce((acc, employee) => {
                        acc[employee.id] = {
                            firstName: employee.first_name,
                            lastName: employee.last_name,
                            hourlyRate: parseFloat(employee.hourly_rate),
                        };
                        return acc;
                    }, {});

                    /**
                     * Filters out shifts with no end_time.
                     * 
                     * @param {Object} shift - Shift object.
                     * @param {string} shift.end_time - Shift end time.
                     * @returns {boolean} - True if shift has an end_time, false otherwise.
                     */
                    const validShifts = shifts.filter((shift) => shift.end_time !== null);

                    /**
                     * Processes valid shifts data to calculate total hours and pay for each employee.
                     * 
                     * @param {Object} acc - Accumulator object.
                     * @param {Object} shift - Shift object.
                     * @param {number} shift.employee_id - Employee ID.
                     * @param {string} shift.start_time - Shift start time.
                     * @param {string} shift.end_time - Shift end time.
                     * @returns {Object} - Accumulator object with calculated pay data for each employee.
                     */
                    const payData = validShifts.reduce((acc, shift) => {
                        const employee = employeesById[shift.employee_id];
                        if (!employee) return acc;

                        const { firstName, lastName, hourlyRate } = employee;
                        const startTime = new Date(shift.start_time);
                        const endTime = new Date(shift.end_time);
                        const hoursWorked = (endTime - startTime) / (1000 * 60 * 60); // Convert ms to hours

                        if (!acc[shift.employee_id]) {
                            acc[shift.employee_id] = {
                                id: shift.employee_id,
                                firstName,
                                lastName,
                                totalHours: 0,
                                hourlyRate,
                                totalPay: 0,
                            };
                        }

                        acc[shift.employee_id].totalHours += hoursWorked;
                        acc[shift.employee_id].totalPay =
                            acc[shift.employee_id].totalHours * hourlyRate;

                        return acc;
                    }, {});

                    setEmployeePayData(Object.values(payData));
                } else {
                    console.error("Failed to fetch data from one or both APIs.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPayData();
    }, []);

    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <i className="fas fa-money-check-alt me-2"></i>
                    Employee Pay Details
                </h1>
                <p className="text-muted">View the total hours, hourly rates, and pay for all employees</p>
            </div>
            <div className="card shadow-lg p-4">
                <table className="table table-hover table-bordered align-middle">
                    <thead className="table-dark text-center">
                        <tr>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Total Hours</th>
                            <th scope="col">Hourly Rate</th>
                            <th scope="col">Total Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeePayData.map((employee) => (
                            <tr key={employee.id} className="text-center">
                                <td>{employee.id}</td>
                                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                                <td>{employee.totalHours.toFixed(2)}</td>
                                <td>${employee.hourlyRate.toFixed(2)}</td>
                                <td>${employee.totalPay.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {employeePayData.length === 0 && (
                    <p className="text-center text-muted mt-3">No pay details available.</p>
                )}
            </div>
        </div>
    );
};

export default EmployeePay;
