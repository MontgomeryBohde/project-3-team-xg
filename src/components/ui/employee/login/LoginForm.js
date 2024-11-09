"use client";
// src/components/ui/employee/login/LoginForm.js

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';
import './LoginForm.css';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    console.log("handle submit button");
    event.preventDefault();

    // Reset error state
    setError(null);

    // Find the employee by user ID
    const employee = employees.find(emp => emp.id.toString() === userId);

    // Check if the employee exists
    if (!employee) {
      setError("User ID not found");
      return;
    }
    else // store this employee in local storage
    {
      localStorage.setItem('loggedInEmployee', JSON.stringify(employee));
    }

    // Validate password
    if (password !== "1234") {
      setError("Incorrect password");
      return;
    }

    // Check if the employee is a manager
    if (employee.is_manager) {
      const navigateToManager = window.confirm(
        "Do you want to go to the Manager page or Employee page? Click 'OK' for Manager, 'Cancel' for Employee."
      );

      if (navigateToManager) {
        router.push('/employee/manager/menu'); // Navigate to manager page
      } else {
        router.push('/employee/cashier/order'); // Navigate to general employee page
      }
    } else {
      // Navigate to cashier page if not a manager
      router.push('/employee/cashier/order');
    }

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
