// src/components/ui/employee/cashier/order/appetizers/AppetizerMenu.js
import React from "react";

const appetizers = [
    "Chicken Egg Roll", 
    "Veggie Spring Roll", 
    "Cream Cheese Rangoon", 
    "Apple Pie Roll"
];

const AppetizerMenu = ({ onBackClick, onAddToOrder }) => {
    const handleAddAppetizer = (appetizer) => {
        onAddToOrder(appetizer, "appetizer");
    };

    return (
        <div className="appetizers-menu">
            <button className="back-button" onClick={onBackClick}>Back</button>
            <h2>Appetizers</h2>
            <div className="menu-grid">
                {appetizers.map((appetizer) => (
                    <button 
                        key={appetizer} 
                        className="menu-button" 
                        onClick={() => handleAddAppetizer(appetizer)}
                    >
                        {appetizer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AppetizerMenu;
