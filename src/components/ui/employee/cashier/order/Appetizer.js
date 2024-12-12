// Appetizer.js
/**
 * @file Appetizer.js
 * @description This file contains the Appetizer component which displays a list of appetizer menu items.
 */

import React from 'react';

/**
 * Appetizer component to display a list of appetizer menu items.
 *
 * @param {Object[]} menuItems - Array of appetizer menu items.
 * @param {Object} menuItems[].id - Unique identifier for the appetizer.
 * @param {string} menuItems[].item_name - Name of the appetizer.
 * @param {Function} handleAddToCart - Function to handle adding an appetizer to the cart.
 * @returns {JSX.Element} The rendered component.
 */
const Appetizer = ({ menuItems, handleAddToCart }) => (
    <div className="card mb-4 shadow-sm">
        <div className="card-body md">
            <div className="row">
                {menuItems.map((appetizer) => (
                    <div key={appetizer.id} className="col-md-6 mb-3">
                        <button
                            className="btn btn-outline-primary w-100 py-3 btn-lg"
                            onClick={() => handleAddToCart(appetizer)}
                        >
                            {appetizer.item_name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Appetizer;
