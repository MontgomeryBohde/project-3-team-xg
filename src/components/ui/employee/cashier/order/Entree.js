// Entree.js
import React from 'react';

const Entree = ({ menuItems, handleAddToCurrentMeal }) => (
    <div className="card mb-4">
        <div className="card-body">
            <div className="row">
                {menuItems.map((Entree) => (
                    <div key={Entree.id} className="col-md-6 mb-3">
                        <button
                            className="btn btn-outline-primary w-100"
                            onClick={() => handleAddToCurrentMeal(Entree)}
                        >
                            {Entree.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Entree;
