"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoyaltyLoginForm = () => {
    const [num, setNum] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState(null);
    const router = useRouter();

    // Fetch customer data
    const fetchCustomerData = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log("num: ", num);

            const response = await fetch(`/api/getCustomer?type=getCustomerByNum&phoneNumber=${encodeURIComponent(num)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch customer data');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleLogin = async (event) => {
        event.preventDefault();

        // Reset error state
        setError(null);

        console.log("num: ", num);
        try {
            // Validate the entered phone number
            if (num) {
                // Fetch customer data associated with the num
                const customerData = await fetchCustomerData();

                if (!customerData || Object.keys(customerData).length === 0) {
                    setError("No customer found with the provided phone number.");
                    return;
                }

                setCustomer(customerData);
                console.log("customerData: ", customerData);

                // Store customer data in local storage and navigate
                localStorage.setItem("loyaltyCustomer", JSON.stringify(customerData));
                localStorage.setItem("loggedInCustomerName", customerData.first_name);

                // Navigate to the meal selection page
                router.push("/customer/loyalty/main");
            } else {
                setError("Invalid phone number. Please enter a valid phone number.");
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
                    <label htmlFor="user-code">Enter your Phone Number: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="user-code"
                        placeholder="1234567890"
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="alert alert-danger mb-3">
                        {error}
                    </div>
                )}

                <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
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

export default LoyaltyLoginForm;
