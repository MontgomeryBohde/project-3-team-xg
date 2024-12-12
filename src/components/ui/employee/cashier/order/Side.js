/**
 * @file Side.js
 * @description This file contains the Side component which renders a list of side menu items as buttons.
 * @requires React
 */

import React from 'react';

/**
 * Side component renders a list of side menu items as buttons.
 * 
 * @param {Object[]} menuItems - Array of menu items to be displayed.
 * @param {Function} handleAddToCurrentMeal - Function to handle adding an item to the current meal.
 * @param {Function} handleAddToCart - Function to handle adding an item to the cart.
 * @param {string} currentMenu - The current menu context, e.g., 'mealSelection'.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const Side = ({ menuItems, handleAddToCurrentMeal, handleAddToCart, currentMenu }) => (
    <div className="card mb-4">
        <div className="card-body">
            {menuItems.map((side) => (
                <button
                    key={side.id}
                    className="btn btn-outline-primary w-100 mb-3 btn-lg"
                    onClick={() => {
                        if (currentMenu === 'mealSelection' && handleAddToCurrentMeal) {
                            handleAddToCurrentMeal(side);
                        } else if (handleAddToCart) {
                            handleAddToCart(side);
                        }
                    }}
                >
                    {side.item_name}
                </button>
            ))}
        </div>
    </div>
);

export default Side;
