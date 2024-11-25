// src/app/employee/manager/employeeinfo/page.js
"use client";

import React, { useState } from "react";
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import EmployeeDetails from "@/components/ui/employee/manager/employee/EmployeeDetails";
import EmployeePay from "@/components/ui/employee/manager/employee/EmployeePay";

const EmployeeInfo = () => {
    const [activeTab, setActiveTab] = useState("details");

    const renderTabContent = () => {
        if (activeTab === "details") {
            return <EmployeeDetails />;
        } else if (activeTab === "pay") {
            return <EmployeePay />;
        }
    };

    return (
        <div className="container mt-4">
            <EmployeeLogInHeader />
            <div className="d-flex justify-content-center my-3">
                <button
                    className={`btn me-2 ${
                        activeTab === "details" ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setActiveTab("details")}
                >
                    <i className="fas fa-info-circle me-2"></i>
                    Employee Details
                </button>
                <button
                    className={`btn ${
                        activeTab === "pay" ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setActiveTab("pay")}
                >
                    <i className="fas fa-dollar-sign me-2"></i>
                    Pay Information
                </button>
            </div>
            <div className="tab-content p-4 border rounded shadow">{renderTabContent()}</div>
        </div>
    );
};

export default EmployeeInfo;
