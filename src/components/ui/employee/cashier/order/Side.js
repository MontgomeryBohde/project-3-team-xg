// Side.js
import React from 'react';

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
