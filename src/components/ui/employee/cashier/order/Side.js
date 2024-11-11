// Side.js
import React from 'react';

const Side = ({ menuItems, handleAddToCurrentMeal }) => (
    <div className="card mb-4">
        <div className="card-body">
            {menuItems.map((Side) => (
                <button
                    key={Side.id}
                    className="btn btn-outline-primary w-100 mb-2"
                    onClick={() => handleAddToCurrentMeal(Side)}
                >
                    {Side.name}
                </button>
            ))}
        </div>
    </div>
);

export default Side;