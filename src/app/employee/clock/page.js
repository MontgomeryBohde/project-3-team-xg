// src/app/employee/clock/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

const ClockPage = () => {
    const [employee, setEmployee] = useState(null);
    const [shift, setShift] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const loggedInEmployee = localStorage.getItem("loggedInEmployee");
        if (loggedInEmployee) {
            const parsedEmployee = JSON.parse(loggedInEmployee);
            setEmployee(parsedEmployee);

            // Fetch the current shift
            fetchCurrentShift(parsedEmployee.id);
        } else {
            router.push("/employee");
        }
    }, [router]);

    const fetchCurrentShift = async (employeeId) => {
        try {
            const response = await fetch(`/api/getShifts`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                const activeShift = data.shifts.find(
                    (shift) => shift.employee_id === employeeId && !shift.end_time
                );

                setShift(activeShift || null);
            } else {
                const { message } = await response.json();
                setError(message || "Failed to fetch current shift.");
            }
        } catch (err) {
            setError("An error occurred while fetching the current shift.");
        }
    };

    const handleClockIn = async () => {
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch(`/api/getShifts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employee_id: employee.id, action: "clock-in" }),
            });

            if (response.ok) {
                const data = await response.json();
                setShift(data.shift); // Set the new shift
                setSuccessMessage("Clocked in successfully!");
            } else {
                const { message } = await response.json();
                setError(message || "Failed to clock in.");
            }
        } catch (err) {
            setError("An error occurred while clocking in.");
        }
    };

    const handleClockOut = async () => {
        setError(null);
        setSuccessMessage(null);

        if (!shift || !shift.id) {
            setError("No active shift to clock out.");
            return;
        }

        try {
            const response = await fetch(`/api/getShifts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: shift.id, action: "clock-out" }),
            });

            if (response.ok) {
                const data = await response.json();
                setShift(null); // Clear the current shift
                setSuccessMessage("Clocked out successfully! Redirecting...");

                // Redirect to /employee/home after 3 seconds
                setTimeout(() => {
                    router.push("/employee/home");
                }, 3000);
            } else {
                const { message } = await response.json();
                setError(message || "Failed to clock out.");
            }
        } catch (err) {
            setError("An error occurred while clocking out.");
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-home-container vh-100 d-flex flex-column bg-light">
            <EmployeeLogInHeader />
            <div className="clock-page-container vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
                    <h3 className="text-center mb-4 text-primary">Clock In / Clock Out</h3>
                    <p className="text-center text-muted">Manage your shifts easily below</p>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <div className="d-flex flex-column gap-3">
                        {shift ? (
                            <button
                                className="btn btn-danger btn-lg d-flex align-items-center justify-content-center"
                                onClick={handleClockOut}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Clock Out
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                                onClick={handleClockIn}
                            >
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Clock In
                            </button>
                        )}
                    </div>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Having issues? Contact your manager for assistance.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClockPage;
