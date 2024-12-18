// src/app/employee/page.js
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import GuestLoginForm from "@/components/ui/customer/guest/GuestLoginForm";


/**
 * CustomerLoginPage component
 * 
 * This component renders the customer login page. It removes the loggedInCustomer
 * from localStorage on page load and displays the login form.
 * 
 * @component
 * @returns {JSX.Element} The rendered component
 */
const CustomerLoginPage = () => {
    const router = useRouter();

    useEffect(() => {
        /**
         * Effect to remove loggedInCustomer from localStorage on page load
         */
        const loggedInCustomer = localStorage.getItem("loggedInCustomer");
        if (loggedInCustomer) {
            console.log("Removing loggedInCustomer from localStorage...");
            localStorage.removeItem("loggedInCustomer");
        }
    }, []);

    return (
        <div className="customer-login-container vh-100 d-flex flex-column bg-light">
            <CustomerHeader />
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center" style={{ padding: '2rem' }}>
                <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
                    <GuestLoginForm />
                </div>
            </div>
        </div>
    );
};

export default CustomerLoginPage;
