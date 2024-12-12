// src/components/ui/employee/manager/employee/EmployeeCard.js

/**
 * @file EmployeeCard.js
 * @description This component renders a card displaying employee details.
 * @requires React
 */

import React from "react";

/**
 * EmployeeCard component to display employee details.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.employee - Employee object
 * @param {string} props.employee.firstName - Employee's first name
 * @param {string} props.employee.lastName - Employee's last name
 * @param {string} props.employee.title - Employee's job title
 * @param {string} props.employee.hireDate - Employee's hire date
 * @param {number} props.employee.hourlyRate - Employee's hourly rate
 * @returns {JSX.Element} A card displaying employee details
 */
const EmployeeCard = ({ employee }) => (
    <div className="card mb-3 shadow-sm">
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title fw-bold mb-2">{`${employee.firstName} ${employee.lastName}`}</h5>
                    <p className="card-text text-muted mb-1">
                        <i className="fas fa-briefcase me-2"></i>
                        Title: <span className="text-dark">{employee.title}</span>
                    </p>
                    <p className="card-text text-muted mb-1">
                        <i className="fas fa-calendar-alt me-2"></i>
                        Hire Date:{" "}
                        <span className="text-dark">
                            {new Date(employee.hireDate).toLocaleDateString()}
                        </span>
                    </p>
                    <p className="card-text text-muted mb-1">
                        <i className="fas fa-dollar-sign me-2"></i>
                        Hourly Rate:{" "}
                        <span className="text-dark">${parseFloat(employee.hourlyRate).toFixed(2)}</span>
                    </p>
                    <p className="card-text text-muted mb-0">
                        <i className="fas fa-clock me-2"></i>
                        Work Hours:{" "}
                        <span className="text-dark">10:00 AM - 9:00 PM (M-F)</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default EmployeeCard;
