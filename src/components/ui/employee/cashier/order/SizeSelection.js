// SizeSelecion.js
/**
 * @file SizeSelection.js
 * @description This file contains the SizeSelection component which renders a list of size options for a given item.
 * @requires React
 */

import React from 'react';

/**
 * SizeSelection component renders a list of size options for a given item.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.item - The item object containing size information.
 * @param {string} props.item.item_name - The name of the item.
 * @param {Array} props.item.sizes - The array of size objects.
 * @param {Object} props.item.sizes[].id - The unique identifier for the size.
 * @param {string} props.item.sizes[].item_size - The size of the item.
 * @param {number} props.item.sizes[].price - The price of the item for the given size.
 * @param {Function} props.handleAddToCart - The function to handle adding the item to the cart.
 * @returns {JSX.Element} The rendered component.
 */
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
