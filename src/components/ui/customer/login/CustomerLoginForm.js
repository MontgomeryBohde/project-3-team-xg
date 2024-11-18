"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CustomerLoginForm = () => {
    const [code, setCode] = useState('');
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
                // Simulate fetching customer data associated with the code (if needed)
                const customer = { name: "Guest 1", id: 1 }; // Replace with real customer data if applicable
                localStorage.setItem("loggedInCustomer", JSON.stringify(customer));
                localStorage.setItem("loggedInCustomerName", customer.name);

                // Navigate to the meal selection page
                router.push("/customer/kiosk/menuselection/");
            } else {
                setError("Invalid code. Please enter a valid 4-digit code.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    const navigateToKioskPage = () => {
        router.push("/customer/kiosk"); // Navigate back to the Kiosk Page
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
