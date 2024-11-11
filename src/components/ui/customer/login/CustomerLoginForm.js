"use client";
// src/components/ui/employee/login/LoginForm.js

import { getCustomerByPhoneNumber } from '@/backend/customer';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';
import './CustomerLoginForm.css';

const CustomerLoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Reset error state
    setError(null);

    const customer = await getCustomerByPhoneNumber(phoneNumber);

    if (!customer) {
      setError("Customer not Found");
      return;
    } else {
      // store this employee in local storage
      console.log(customer)
      localStorage.setItem('loggedInCustomer', customer);
      localStorage.setItem('loggedInCustomerName', customer.name);
    }

    // Validate password
    if (password !== "1234") {
      setError("Incorrect password");
      return;
    }
    router.push("/customer/meal/");
  };

  return (
    <div id="form-wrapper">
        <h1 className="text-center mb-4">Login</h1>
        <form className="p-4" onSubmit={handleLogin}>
            <div className="form-group mb-3">
            <label htmlFor="user-id">Phone Number</label>
            <input
                type="text"
                className="form-control"
                id="user-id"
                placeholder="(123)-456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            </div>
            <div className="form-group mb-3">
            <label htmlFor="user-password">Password</label>
            <input
                type="password"
                className="form-control"
                id="user-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            {error && (
            <div className="alert alert-danger mb-3">
                {error}
            </div>
        )}

            <button type="submit" className="btn btn-primary bg-danger w-100">
                Submit
            </button>
        </form>
        <button type="button" className="btn btn-secondary w-20 mt-2 bg-danger" onClick={() => router.push('/customer/guest/')}>
                Guest Login
        </button>
    </div>
  );
};

export default CustomerLoginForm;
