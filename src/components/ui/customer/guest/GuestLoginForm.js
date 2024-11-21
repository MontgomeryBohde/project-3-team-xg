// src/components/ui/employee/guest/GuestLoginForm.js
"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';

import { insertCustomer } from '@/backend/customer';

const GuestLoginForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Reset error state
    setError(null);

    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    const customer = {
      first_name: name,
      last_name: null,
      phone_number: null,
      email: null,
      rewards_points: 0,
      is_guest: true
    };

    window.sessionStorage.setItem('loggedInCustomer', JSON.stringify(customer));

    try {
      await insertCustomer(customer);
    } catch (error) {
      console.error('Error during database operation:', error);
    }

    router.push("/customer/kiosk/menuselection");
  };

  const navigateToCustomerLoginPage = () => {
    router.push("/customer/kiosk/login"); // Navigate back to the Kiosk Page
  };

  return (
    <div id="form-wrapper" className="bg-light p-4 rounded shadow-sm">
        <h1 className="text-center mb-4">Guest Login</h1>
        <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
        <button type="button" className="btn btn-secondary w-100 mt-3" onClick={navigateToCustomerLoginPage}>
            Back to Customer Login Page
        </button>
    </div>
  );
};

export default GuestLoginForm;