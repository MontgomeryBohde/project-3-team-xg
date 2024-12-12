/**
 * @file Entree.js
 * @description Entree component to display menu items and handle adding them to the current meal or cart.
 * @requires react
 */

import React from 'react';

/**
 * Entree component to display menu items and handle adding them to the current meal or cart.
 *
 * @param {Object[]} menuItems - Array of menu item objects.
 * @param {Function} handleAddToCurrentMeal - Function to handle adding an item to the current meal.
 * @param {Function} handleAddToCart - Function to handle adding an item to the cart.
 * @param {string} currentMenu - The current menu context, e.g., 'mealSelection'.
 * @returns {JSX.Element} The rendered Entree component.
 */
const Entree = ({ menuItems, handleAddToCurrentMeal, handleAddToCart, currentMenu }) => (
    <div className="card mb-4">
        <div className="card-body">
            <div className="row">
                {menuItems.map((entree) => (
                    <div key={entree.id} className="col-md-6 mb-3">
                        <button
                            className="btn btn-outline-primary w-100 h-100 btn-lg"
                            onClick={() => {
                                if (currentMenu === 'mealSelection' && handleAddToCurrentMeal) {
                                    handleAddToCurrentMeal(entree);
                                } else if (handleAddToCart) {
                                    handleAddToCart(entree);
                                }
                            }}
                        >
                            {entree.item_name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Entree;
