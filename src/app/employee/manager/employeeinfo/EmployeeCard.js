import React from "react";

const EmployeeCard = ({ employeeId, firstName, lastName, title, isManager, hireDate, hourlyRate }) => (
    <div className="employee-card p-3 rounded d-flex justify-content-between">

        <div>
            <h3 className="fs-3">{`${firstName} ${lastName}`}</h3>
            <p className="fs-5">Title: {title}</p>
            <p className="fs-5">Manager: {isManager ? "Yes" : "No"}</p>
            <p className="fs-5">Hire Date: {new Date(hireDate).toLocaleDateString()}</p>
            <p className="fs-5">Hourly Rate: ${parseFloat(hourlyRate).toFixed(2)}</p>
            <p className="fs-5">Work Hours: 10:00 AM - 9:00 PM (M-F)</p>
        </div>

    </div>
);

export default EmployeeCard;
