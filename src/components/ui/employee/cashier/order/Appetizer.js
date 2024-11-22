// Appetizer.js
import React from 'react';

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
