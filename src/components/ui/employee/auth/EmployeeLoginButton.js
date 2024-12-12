// src/components/ui/employee/auth/EmployeeLoginButton.js
"use client";

import { signIn } from "next-auth/react"; 
import { useRouter } from "next/navigation";
/**
 * @returns Employee Login Button which authenticates user using github oauth.
 */
const EmployeeLoginButton = () => {
  const router = useRouter();

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
