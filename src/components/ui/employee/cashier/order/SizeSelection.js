// SizeSelecion.js
import React from 'react';

const SizeSelection = ({ item, handleAddToCart }) => {
    if (!item) {
    return <p>Loading item data...</p>; // Handle when item is null or undefined
  }

  return (
    <div className="card mb-4">
		<div className="card-body">
			<h4 className="card-title">Select Size for {item.item_name}</h4>
			{item.sizes && item.sizes.map((size) => (
				<button
					key={size.id} // Use a unique identifier for each size if available
					className="btn btn-outline-primary w-100 mb-2 btn-lg"
					onClick={() => handleAddToCart && handleAddToCart(item, size.item_size, size.price)}
				>
				{size.item_size} - ${size.price}
			</button>
			))}
			<button className="btn btn-secondary w-100 mt-3" onClick={() => handleAddToCart && handleAddToCart(null)}>
			Cancel
			</button>
		</div>
    </div>
  );
};

export default SizeSelection;
