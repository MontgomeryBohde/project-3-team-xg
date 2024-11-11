// Drink.js
import React from 'react';

const Drink = ({ menuItems, handleAddToCurrentMeal }) => (
    <div className="card mb-4">
        <div className="card-body">
            <div className="row">
                {menuItems.map((Drink) => (
                    <div key={Drink.id} className="col-md-6 mb-3">
                        <button
                            key={Drink.id}
                            className="btn btn-outline-primary w-100"
                            onClick={() => handleAddToCurrentMeal(Drink)}
                        >
                            {Drink.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Drink;