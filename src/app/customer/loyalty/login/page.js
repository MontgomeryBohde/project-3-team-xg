"use client";
import React, { useEffect } from "react";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import LoyaltyLoginForm from "@/components/ui/customer/loyalty/LoyaltyLoginForm";

/**
 * Assembles the Customer Loyalty Login Page
 * @returns Customer Loyalty Page login page from customer header and loyalty login form. 
 */
const LoyaltyLoginPage = () => {
    useEffect(() => {
        // Delete items from localStorage on page load
        localStorage.removeItem('loyaltyCustomer');
        localStorage.removeItem('loggedInCustomer');
        localStorage.removeItem('loggedInCustomerName');
    }, []);

    return (
        <div className="customer-login-container vh-100 d-flex flex-column bg-light">
            <CustomerHeader />
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center" style={{ padding: '2rem' }}>
                <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
                    <LoyaltyLoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoyaltyLoginPage;
