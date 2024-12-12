// src/components/ui/employee/auth/EmployeeLoginButton.js
"use client";

/**
 * @file EmployeeLoginButton.js
 * @description This file contains the EmployeeLoginButton component which provides a button for employee login using GitHub OAuth.
 * @requires next-auth/react
 * @requires next/navigation
 */


import { signIn } from "next-auth/react"; 
import { useRouter } from "next/navigation";
/**
 * EmployeeLoginButton component.
 * @component
 * @returns {JSX.Element} Employee Login Button which authenticates user using GitHub OAuth.
 */
const EmployeeLoginButton = () => {
  const router = useRouter();

  /**
   * Handles the login process.
   * @function
   * @returns {void}
   */
  const handleLogin = () => {
    signIn("github", { callbackUrl: "/employee" });
    console.log("signing in");
    router.push("/employee"); // Navigate to the employee login page
  };

  return (
    <div className="d-flex gap-5 justify-content-center">
      <button
        className="btn btn-outline-light btn-lg px-5 py-3 home-button"
        onClick={handleLogin}
      >
        Employee
      </button>
    </div>
  );
};

export default EmployeeLoginButton;
