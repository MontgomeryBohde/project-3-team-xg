// src/components/ui/customer/header/CustomerHeader.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CustomerLoginForm = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    // Handle form submission
    const handleLogin = async (event) => {
        event.preventDefault();

        // Reset error state
        setError(null);

        try {
            // Validate the 4-digit code
            if (code === "1234") {
                // Simulate fetching customer data associated with the code
                const customer = { name: "Mike Moore", id: 1 }; // Replace with real customer data if applicable

                // Store customer in sessionStorage
                window.localStorage.setItem("loggedInCustomer", JSON.stringify(customer));
                window.localStorage.setItem("loggedInCustomerName", customer.name);

                // Navigate to menu selection
                router.push("/customer/kiosk/menu-selection/");
            } else {
                // Invalid code
                setError("No login found for code. Please enter a valid code.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        }
    };

    // Navigate back to the kiosk page
    const navigateToKioskPage = () => {
        router.push("/customer/kiosk/");
    };

    return (
        <div id="form-wrapper" className="bg-light p-4 rounded shadow-sm">
            <h1 className="text-center mb-4">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="user-code">Enter 4-Digit Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="user-code"
                        placeholder="1234"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="alert alert-danger mb-3">
                        {error}
                    </div>
                )}

                <button type="submit" className="btn btn-danger w-100">
                    Submit
                </button>
            </form>
            <button
                type="button"
                className="btn btn-secondary w-100 mt-3"
                onClick={() => router.push("/customer/kiosk/guest/")}
            >
                Guest Login
            </button>
            <button
                type="button"
                className="btn btn-secondary w-100 mt-3"
                onClick={navigateToKioskPage}
            >
                Back to Customer Page
            </button>
        </div>
    );
};

export default CustomerLoginForm;
