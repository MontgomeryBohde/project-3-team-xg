// Entree.js
import React from 'react';

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
                            {entree.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Entree;
