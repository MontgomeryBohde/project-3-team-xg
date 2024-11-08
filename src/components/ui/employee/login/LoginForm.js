"use client";
// src/components/ui/employee/login/LoginForm.js

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';
import './LoginForm.css';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    console.log("handle submit button");
    event.preventDefault();

    // Example logic for checking user ID and password
    if (password === "1234") {
      if (userId === '1') {
        console.log("manager");
        const navigateToManager = window.confirm("Do you want to go to the Manager page or Employee page? Click 'OK' for Manager, 'Cancel' for Employee.");

        if (navigateToManager) {
          router.push('/employee/manager/menu');  // Navigate to manager page
        } else {
          router.push('/employee/employee-page');  // Navigate to employee page (replace with actual route)
        }
      } else if (['2', '3', '4', '5'].includes(userId)) {
        console.log("cashier");
        router.push('/employee/cashier/order');
      } else {
        setError("Incorrect UserID");
      }
    } else {
      setError("Incorrect password/UserID");
    }

    /*
    Console.log("handle submit button");
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/employee/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Employee not found');
        return;
      }

      const data = await response.json();

      // Check if password matches (implement password check if you have it in the database)
      if (data.password !== password) {
        setError("Incorrect password");
        return;
      }

      // Navigate based on the employee's role
      if (data.is_manager) {
        router.push('/manager/home');
      } else {
        router.push('/employee/cashier/order');
      }
    }
    catch (err) {
      setError("Failed to log in. Please try again.");
      console.error("Login error:", err);
    }
    */
   
  };

  return (
    <div id="form-wrapper">
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="user-id">ID</label>
          <input
            type="text"
            className="form-control"
            id="user-id"
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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

        {/* Error message */}
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

export default LoginForm;