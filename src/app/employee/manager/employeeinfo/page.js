"use client"

import React from "react";
import EmployeeCard from "./EmployeeCard"; 
import "./EmployeeInfo.css";


import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

const EmployeeInfo = () => {
    const employees = [
        { id: "1", name: "Alisa Lu", clockedIn: true, position: "Manager" },
        { id: "2", name: "Monte Bode", clockedIn: false, position: "Server" },
        { id: "3", name: "Rebecca Chen", clockedIn: true, position: "Server" },
        { id: "4", name: "Risha Thimmancherla", clockedIn: true, position: "Server" },
        { id: "5", name: "Tee Li", clockedIn: false, position: "Cashier" },
    ];

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="employee-info-container">
                <h1 className="title">Employee Information</h1>
                <div className="employee-cards-container">
                    {employees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employeeId={employee.id}
                            name={employee.name}
                            clockedIn={employee.clockedIn}
                            position={employee.position}
                        />
                    ))}
                </div>
            </div>
        </div>  
    );
};

export default EmployeeInfo;
