// src/componets/ui/employee/cashier/order/MealTypes.js
import React from 'react';

const MealTypes = ({ mealTypes, onMealTypeClick }) => (
    <div className="meal-types">
        <h3>Meal Types</h3>
        <div className="menu-grid">
            {mealTypes.map((meal) => (
                <button 
                    key={meal.name} 
                    className="menu-button" 
                    onClick={() => onMealTypeClick(meal)}
                >
                    {meal.name}
                </button>
            ))}
        </div>
    </div>
);

export default MealTypes;