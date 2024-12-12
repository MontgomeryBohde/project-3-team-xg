// Drink.js
/**
 * @fileoverview Drink component renders a list of drink items and allows adding them to the cart.
 * @requires React
 */

import React from 'react';

/**
 * Drink component renders a list of drink items and allows adding them to the cart.
 *
 * @param {Object[]} menuItems - Array of drink items to display.
 * @param {Object} menuItems[].id - Unique identifier for the drink item.
 * @param {string} menuItems[].item_name - Name of the drink item.
 * @param {Function} handleAddToCart - Function to handle adding a drink item to the cart.
 * @returns {JSX.Element} The rendered component.
 */
const Drink = ({ menuItems, handleAddToCart }) => (
    <div className="card mb-4">
        <div className="card-body">
            <div className="row">
                {menuItems.map((Drink) => (
                    <div key={Drink.id} className="col-md-6 mb-3">
                        <button
                            key={Drink.id}
                            className="btn btn-outline-primary w-100 btn-lg"
                            onClick={() => handleAddToCart(Drink)}
                        >
                            {Drink.item_name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Drink;