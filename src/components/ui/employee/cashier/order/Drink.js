// Drink.js
import React from 'react';

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
                            {Drink.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Drink;