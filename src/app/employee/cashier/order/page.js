// src/app/employee/order/page.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./order.css";

const mealTypes = [
    { name: "Bowl", sides: 1, entrees: 1 },
    { name: "Plate", sides: 1, entrees: 2 },
    { name: "Bigger Plate", sides: 1, entrees: 3 },
    { name: "Cub Meal", sides: 1, entrees: 1 },
    { name: "Family Meal", sides: 2, entrees: 3 }
];
const entrees = [
    "Orange Chicken", "Grilled Teriyaki Chicken", "Broccoli Beef",
    "Kung Pao Chicken", "Honey Sesame Chicken Breast", "Beijing Beef",
    "Mushroom Chicken", "Sweetfire Chicken Breast", "String Bean Chicken Breast",
    "Black Pepper Chicken", "Black Pepper Sirloin Steak", "Honey Walnut Shrimp"
];
const sides = ["Chow Mein", "Fried Rice", "White Steamed Rice", "Super Greens"];

const OrderPage = () => {
    const router = useRouter();
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [order, setOrder] = useState([]);
    const [selectedSides, setSelectedSides] = useState([]);
    const [selectedEntrees, setSelectedEntrees] = useState([]);

    const handleLogout = () => {
        router.push("/employee/login");
    };

    const handleMealTypeClick = (mealType) => {
        setSelectedMeal(mealType);
        setSelectedSides([]);
        setSelectedEntrees([]);
    };

    const handleEntreeClick = (entree) => {
        if (selectedEntrees.length < selectedMeal.entrees) {
            setSelectedEntrees((prev) => [...prev, entree]);
            setOrder((prevOrder) => [...prevOrder, { name: entree, price: "0" }]);
        }
    };

    const handleSideClick = (side) => {
        if (selectedSides.length < selectedMeal.sides) {
            setSelectedSides((prev) => [...prev, side]);
            setOrder((prevOrder) => [...prevOrder, { name: side, price: "0" }]);
        }
    };

    const handleBackClick = () => {
        setSelectedMeal(null);
        setOrder([]);
    };

    return (
        <div className="order-container">
            <header className="header">
                <span>Name: &lt;Cashier Name logged in&gt;</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>

            <div className="main-content">
                {selectedMeal ? (
                    <div className="detailed-menu">
                        <button className="back-button" onClick={handleBackClick}>Back</button>
                        <h2>{selectedMeal.name}</h2>
                        <p>Description of the inclusions</p>
                        
                        <div className="menu-category">
                            <h3>Entree</h3>
                            <p>Choose up to {selectedMeal.entrees} entree(s)</p>
                            <div className="menu-grid">
                                {entrees.map((entree) => (
                                    <button 
                                        key={entree} 
                                        className="menu-button" 
                                        onClick={() => handleEntreeClick(entree)}
                                        disabled={selectedEntrees.includes(entree) || selectedEntrees.length >= selectedMeal.entrees}
                                    >
                                        {entree}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="menu-category">
                            <h3>Side</h3>
                            <p>Choose up to {selectedMeal.sides} side(s)</p>
                            <div className="menu-grid">
                                {sides.map((side) => (
                                    <button 
                                        key={side} 
                                        className="menu-button" 
                                        onClick={() => handleSideClick(side)}
                                        disabled={selectedSides.includes(side) || selectedSides.length >= selectedMeal.sides}
                                    >
                                        {side}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="meal-types">
                        <h3>Meal Types</h3>
                        <div className="menu-grid">
                            {mealTypes.map((meal) => (
                                <button 
                                    key={meal.name} 
                                    className="menu-button" 
                                    onClick={() => handleMealTypeClick(meal)}
                                >
                                    {meal.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Order Summary */}
                <div className="order-summary">
                    <h3>Order</h3>
                    {order.map((item, index) => (
                        <div key={index} className="order-item">
                            <span>{item.name}</span> <span>${item.price}</span>
                        </div>
                    ))}
                    <div className="order-summary-footer">
                        <div className="summary-line">Subtotal <span>$0</span></div>
                        <div className="summary-line">Discount <span>$0</span></div>
                        <div className="summary-line">Tax <span>$0</span></div>
                        <div className="summary-line total">Total <span>$0.00</span></div>
                        <button className="confirm-button">Confirm Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
