// SizeSelection.js
import React from 'react';

const SizeSelection = ({ item, handleAddItemWithSize }) => (
    <div className="card mb-4">
        <div className="card-body">
            <h4 className="card-title">Select Size for {item.name}</h4>
            {item.sizes && item.sizes.map((size) => (
                <button
                    key={size}
                    className="btn btn-outline-primary w-100 mb-2"
                    onClick={() => handleAddItemWithSize(size)}
                >
                    {size}
                </button>
            ))}
            <button className="btn btn-secondary w-100 mt-3" onClick={() => handleAddItemWithSize(null)}>Cancel</button>
        </div>
    </div>
);

export default SizeSelection;
