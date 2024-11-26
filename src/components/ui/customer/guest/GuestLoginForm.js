"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GuestLoginForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Reset error state
    setError(null);

    // Validate name input
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    // Create guest customer object
    const customer = {
      first_name: name.trim(),
      last_name: null,
      phone_number: null,
      email: null,
      rewards_points: 0,
      is_guest: true,
    };

    try {
      // Store guest customer locally for session purposes
      window.sessionStorage.setItem("loggedInCustomer", JSON.stringify(customer));

      // Send the guest customer to the API
      const response = await fetch("/api/getCustomer?type=addCustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error("Failed to log in as a guest");
      }

      // Navigate to the menu selection page
      router.push("/customer/kiosk/menuselection");
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Failed to log in as a guest. Please try again.");
    }
  };

  // Navigate back to the customer login page
  const navigateToCustomerLoginPage = () => {
    router.push("/customer/kiosk/login");
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
      <button
        type="button"
        className="btn btn-secondary w-100 mt-3"
        onClick={navigateToCustomerLoginPage}
      >
        Back to Customer Login Page
      </button>
    </div>
  );
};

export default GuestLoginForm;
