// src/components/ui/employee/manager/employee/EmployeeDetails.js
"use client";

/**
 * @fileoverview This file contains the EmployeeDetails component which fetches and displays employee information.
 * @requires react
 * @requires react/useEffect
 * @requires react/useState
 * @requires @/components/ui/employee/manager/employee/EmployeeCard
 */

import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";

/**
 * EmployeeDetails component fetches employee data from an API and displays it using EmployeeCard components.
 *
 * @component
 * @example
 * return (
 *   <EmployeeDetails />
 * )
 * @returns {JSX.Element} The EmployeeDetails component
 */
const EmployeeDetails = () => {
    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        /**
         * Fetches employee data from the API and sets the state with the formatted data.
         * 
         * @async
         * @function fetchEmployees
         * @returns {Promise<void>}
         */
        const fetchEmployees = async () => {
            try {
                const response = await fetch("/api/getEmployees");
                if (response.ok) {
                    const data = await response.json();
                    // Transform API data to align with component prop names
                    const formattedData = data.map((employee) => ({
                        id: employee.id,
                        firstName: employee.first_name,
                        lastName: employee.last_name,
                        title: employee.title,
                        isManager: employee.is_manager,
                        hireDate: employee.hire_date,
                        hourlyRate: employee.hourly_rate,
                    }));
                    setEmployees(formattedData);
                } else {
                    console.error("Failed to fetch employees.");
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4 text-primary">
                <i className="fas fa-users me-2"></i>
                Employee Information
            </h1>
            <div className="d-flex flex-column gap-3">
                {employees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>
        </div>
    );
};

export default EmployeeDetails;

