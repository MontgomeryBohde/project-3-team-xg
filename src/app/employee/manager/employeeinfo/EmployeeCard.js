import React from "react";
import "./EmployeeCard.css"; 

const EmployeeCard = ({ employeeId, name, clockedIn, position }) => {
    return (
        <div className="employee-card">
            <h3>Employee ID: {employeeId}</h3>
            <p>Name: {name}</p>
            <p>Clocked In: {clockedIn ? "Yes" : "No"}</p>
            <p>Position: {position}</p>
        </div>
    );
};

export default EmployeeCard;
