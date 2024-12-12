// src/app/customer/kiosk/login/page.js
"use client";
import React, { useEffect } from "react";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import CustomerLoginForm from "@/components/ui/customer/login/CustomerLoginForm";

/**
 * CustomerLoginPage component
 * 
 * This component represents the login page for customers. It clears any 
 * logged-in customer information from localStorage when the component mounts.
 * 
 * @component
 * @example
 * return (
 *   <CustomerLoginPage />
 * )
 */
const CustomerLoginPage = () => {
    useEffect(() => {
        // Clear localStorage items after component mounts (in the browser)
        localStorage.removeItem("loggedInCustomer");
        localStorage.removeItem("loggedInCustomerName");
    }, []);

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