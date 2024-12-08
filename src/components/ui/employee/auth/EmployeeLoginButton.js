// src/components/EmployeeLoginButton.js
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
