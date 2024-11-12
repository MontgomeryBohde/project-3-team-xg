// Side.js
import React from 'react';

const Side = ({ menuItems, handleAddToCurrentMeal, handleAddToCart, currentMenu }) => (
    <div className="card mb-4">
        <div className="card-body">
            {menuItems.map((side) => (
                <button
                    key={side.id}
                    className="btn btn-outline-primary w-100 mb-2"
                    onClick={() => {
                        if (currentMenu === 'mealSelect' && handleAddToCurrentMeal) {
                            handleAddToCurrentMeal(side);
                        } else if (handleAddToCart) {
                            handleAddToCart(side);
                        }
                    }}
                >
                    {side.name}
                </button>
            ))}
        </div>
    </div>
);

export default Side;
