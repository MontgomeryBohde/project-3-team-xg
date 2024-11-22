// src/app/employee/page.js
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import LoginForm from "@/components/ui/employee/login/LoginForm";

const EmployeeLoginPage = () => {

    return (
        <div className="employee-login-container vh-100 d-flex flex-column bg-light">
            <EmployeeHeader />
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center" style={{ padding: '2rem' }}>
                <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
                    <h2 className="text-center mb-4">Employee Login</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default EmployeeLoginPage;
