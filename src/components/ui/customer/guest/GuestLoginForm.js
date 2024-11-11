"use client";
// src/components/ui/employee/login/LoginForm.js

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';
import './GuestLoginForm.css';

const CustomerLoginForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    window.localStorage.setItem('loggedInCustomerName', name);

    // Reset error state
    setError(null);

    router.push("/customer/meal/");
  };

  return (
    <div id="form-wrapper">
        <h1 className="text-center mb-4">Login</h1>
        <form className="p-4" onSubmit={handleLogin}>
            <div className="form-group mb-3">
            <label htmlFor="user-id">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
    </div>
  );
};

export default CustomerLoginForm;
