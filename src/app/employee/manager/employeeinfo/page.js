"use client";

import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import "./EmployeeInfo.css";
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

const EmployeeInfo = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("/api/getEmployees"); //api from apges for getting emmployee
                if (response.ok) {
                    const data = await response.json();
                    
                    setEmployees(data);
                } else {
                    console.error("error");
                }
            } catch (error) {
                console.error("Fetching employees error:", error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="employee-info-container">
                <h1 className="title">Employee Information</h1>
                <div className="employee-cards-container">
                    {employees.map((employee) => (
                        <EmployeeCard
                            key={employee.id} //all fields from db
                            employeeId={employee.id}
                            firstName={employee.first_name}
                            lastName={employee.last_name}
                            title={employee.title}
                            isManager={employee.is_manager}
                            hireDate={employee.hire_date}
                            hourlyRate={employee.hourly_rate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeeInfo;
