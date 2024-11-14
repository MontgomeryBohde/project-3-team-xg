// src/app/customer/kiosk/login/page.js
"use client";
import React from "react";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import CustomerLoginForm from "@/components/ui/customer/login/CustomerLoginForm";

const CustomerLoginPage = () => {
    return (
        <div className="customer-login-container vh-100 d-flex flex-column bg-light">
            <CustomerHeader />
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center" style={{ padding: '2rem' }}>
                <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
                    <CustomerLoginForm />
                </div>
            </div>
        </div>
    );
};

export default CustomerLoginPage;