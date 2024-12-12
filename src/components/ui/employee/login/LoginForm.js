// src/components/ui/employee/login/LoginForm.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon

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
        const response = await fetch('/api/getEmployees');
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

    // Store this employee in local storage for session persistence
    localStorage.setItem('loggedInEmployee', JSON.stringify(employee));

    // Validate password
    if (password !== "1234") {
      setError("Incorrect password");
      return;
    }

    // Redirect to the home page for employees
    router.push('/employee/home');
  };

  const handleGithubLogin = () => {
    const employee = employees.find(emp => emp.id.toString() === '2');
    localStorage.setItem('loggedInEmployee', JSON.stringify(employee));
    signIn("github", { callbackUrl: "/employee/home/"});
    localStorage.setItem('loggedInEmployee', JSON.stringify(employee));
    router.push('/employee/home');
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
        {/* GitHub Login Button */}
        <button
          type="button"
          className="btn btn-dark w-100 mt-3 d-flex align-items-center justify-content-center"
          onClick={handleGithubLogin}
        >
          <FaGithub size={20} className="me-2" />
          Login with GitHub
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
