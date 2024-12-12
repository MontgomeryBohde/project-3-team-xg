// src/app/employee/home/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

const EmployeeHomePage = () => {
	const [employee, setEmployee] = useState(null);
	const router = useRouter();

	useEffect(() => {
		// Retrieve the logged-in employee data from localStorage
		const loggedInEmployee = localStorage.getItem("loggedInEmployee");
		if (loggedInEmployee && loggedInEmployee !== "undefined") {
			setEmployee(JSON.parse(loggedInEmployee));
		} else {
		// Redirect to login if no employee data is found
			router.push("/employee");
		}
	}, [router]);

	if (!employee) {
		return <div>Loading...</div>; // Loading state while fetching employee data
	}

	const handleNavigation = (path) => {
		router.push(path);
	};

  return (
    <div className="employee-home-container vh-100 d-flex flex-column bg-light">
        <EmployeeLogInHeader />
        <div
            className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
            style={{ padding: "2rem" }}
        >
            <div className="card p-5 shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
                <h3 className="text-center mb-4 text-primary">Welcome, {employee.first_name}!</h3>
                <p className="text-center text-muted mb-4">
                    Select an action to get started.
                </p>
                <div className="d-flex flex-column gap-3">
                    <button
                        className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center"
                        onClick={() => handleNavigation("/employee/clock")}
                    >
                        <i className="bi bi-clock me-2"></i> Clock In / Clock Out
                    </button>
                    <button
                        className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center"
                        onClick={() => handleNavigation("/employee/cashier/order")}
                    >
                        <i className="bi bi-cash-coin me-2"></i> Cashier
                    </button>
                    {employee.is_manager && (
                        <button
                            className="btn btn-outline-warning btn-lg d-flex align-items-center justify-content-center"
                            onClick={() => handleNavigation("/employee/manager")}
                        >
                            <i className="bi bi-gear me-2"></i> Manager View
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default EmployeeHomePage;
