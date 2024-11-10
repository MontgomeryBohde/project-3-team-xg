// src/app/employee/page.js
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import LoginForm from "@/components/ui/employee/login/LoginForm";

const LoginPage = () => {
    const router = useRouter();

    const navigateToOrder = () => {
        router.push("/employee/cashier/order"); 
    };

    return (
        <div>
            <EmployeeHeader />
            <LoginForm />
            {/* Temporary Navigation Button */}
            <button className="btn btn-primary bg-danger w-100" onClick={navigateToOrder}>
                Go to Order Page
            </button>
        </div>
    );
};

export default LoginPage;
