// src/components/ui/employee/cashier/order/food_types/FoodTypes.js
import React from "react";

const FoodTypes = ({ foodItems, onFoodItemClick }) => (
    <div className="food-types">
        <h3>Food Items</h3>
        <div className="menu-grid">
            {foodItems.map((food) => (
                <button 
                    key={food} 
                    className="menu-button" 
                    onClick={() => onFoodItemClick(food)}
                >
                    {food}
                </button>
            ))}
        </div>
    </div>
);

export default FoodTypes;
