// src/app/customer/kiosk/meal/meal.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import "./meal-select.css";

const CustomerMealSelect = () => {
	const [entrees, setEntrees] = useState([]);
	const [sides, setSides] = useState([]);

	// Fetch entrees and sides from the database using the API endpoint
	useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("/api/getProducts?action=menu");
                if (!response.ok) throw new Error("Failed to fetch menu items");

                const data = await response.json();
                console.log("API Response:", data);

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format from API");
                }

                // Filter and set entrees and sides
                setEntrees(
                    data.filter((item) => item.category.toLowerCase() === "entree").map((item) => item.name)
                );
                setSides(
                    data.filter((item) => item.category.toLowerCase() === "side").map((item) => item.name)
                );
            } catch (err) {
                console.error("Error fetching menu items:", err);
                setError("Failed to fetch menu items. Please try again later.");
            }
        };
	
		fetchMenuItems();
	}, []);	
	

	const mealTypes = [
		{ name: "Bowl", sides: 1, entrees: 1, price: 8.30 },
		{ name: "Plate", sides: 1, entrees: 2, price: 10.00 },
		{ name: "Bigger Plate", sides: 1, entrees: 3, price: 11.75 },
	];
	const [meal, setMeal] = useState("Bowl");
	useEffect(() => {
		// Retrieve 'selectedMeal' from sessionStorage when the component mounts
		const storedMeal = localStorage.getItem('selectedMeal');

		// If a value is found in sessionStorage, update the state
		if (storedMeal) {
			setMeal(storedMeal);
		}
	}, []);  // Empty dependency array ensures this runs once on mount

	// Update price, numSides, and numEntrees based on selected meal
	const [mealPrice, setMealPrice] = useState(8.30);
	const [numSides, setNumSides] = useState(1);
	const [numEntrees, setNumEntrees] = useState(1);
	useEffect(() => {
		// Find the selected meal type from the mealTypes array
		const selectedMeal = mealTypes.find((item) => item.name === meal);

		if (selectedMeal) {
			// Update state based on the selected meal type
			setMealPrice(selectedMeal.price);
			setNumSides(selectedMeal.sides);
			setNumEntrees(selectedMeal.entrees);
		}
	}, [meal]);


	const [selectedSides, setSelectedSides] = useState([]);
	const [selectedEntrees, setSelectedEntrees] = useState([]);
	const [cart, setCart] = useState(() => {
		const storedCart = sessionStorage.getItem('cart');
		return storedCart ? JSON.parse(storedCart) : [];
	});

	const router = useRouter();

	// Handle item button press
	const handlePressed = (item, type) => {
		if (type === "Side") {
			setSelectedSides((prevSelectedSides) => {
				if (prevSelectedSides.includes(item)) {
					return prevSelectedSides.filter((side) => side !== item); // Unselect if already selected
				} else {
					return [...prevSelectedSides, item]; // Select the item
				}
			});
		} else if (type === "Entree") {
			setSelectedEntrees((prevSelectedEntrees) => {
				if (prevSelectedEntrees.includes(item)) {
					return prevSelectedEntrees.filter((entree) => entree !== item); // Unselect if already selected
				} else {
					return [...prevSelectedEntrees, item]; // Select the item
				}
			});
		}
	};

	// Handle quantity change for selected entrees
	const handleQuantityChange = (item, increment) => {
		setSelectedEntrees((prevSelectedEntrees) => {
			let updatedEntrees = [...prevSelectedEntrees]; // Create a copy of the previous state

			if (increment > 0 && canAddEntree()) {
				// Add item increment times if we can add more entrees
				for (let i = 0; i < increment; i++) {
					updatedEntrees.push(item); // Add the item increment number of times
				}
			} else if (increment < 0) {
				// Remove item increment times if increment is negative
				for (let i = 0; i < Math.abs(increment); i++) {
					const index = updatedEntrees.indexOf(item);
					if (index !== -1) {
						updatedEntrees.splice(index, 1); // Remove the item if it exists
					}
				}
			}

			return updatedEntrees; // Return the updated state
		});
	};


	// Helper function to check if you can add more entrees
	const canAddEntree = () => {
		return selectedEntrees.length < numEntrees; // Ensure selectedEntrees doesn't exceed numEntrees
	};



	// Handle cancel action
	const handleCancel = () => {
		router.push("/customer/kiosk/menuselection"); // TODO: Navigate to the menu page
	};

	const handleConfirm = () => {
		// Check if the number of selected items equals the expected number of entrees + 1 (for sides)
		if (selectedEntrees.length === numEntrees && selectedSides.length === numSides) {
			// Add selected items to the cart as a complex object
			const mealCartItem = {
				mealItem: meal,
				entrees: selectedEntrees,
				sides: selectedSides,
				quantity: 1, // Adjust quantity if needed
				price: mealPrice,
			};

			console.log(mealCartItem);
			console.log("addedtocart");

			// Update the cart state and then sessionStorage
			setCart(prevCart => {
				const updatedCart = [...prevCart, mealCartItem]; // Create a new cart array with the new item
				sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to sessionStorage
				return updatedCart; // Return the updated cart as the new state
			});

			// Wait a moment to ensure cart is updated in sessionStorage
			setTimeout(() => {
				const updatedCart = JSON.parse(sessionStorage.getItem("cart"));
				console.log(updatedCart[0]); // Log the first item from the updated cart
				router.push("/customer/kiosk/menuselection"); // Navigate after cart update
			}, 500); // Adjust the timeout as needed
		} else {
			// Optional: show an error or alert if the user hasn't selected the correct number of items
			alert("Not enough items selected!");
		}
	};


	return (
		<div>
			<EmployeeHeader />
			<div className="main-content">
				<h1>Meal: {meal}</h1>
				<section className="section">
					<h2>Sides</h2>
					<h4>Select 1</h4>
					<div className="row row-cols-3 g-3"> {/* Bootstrap grid layout with gaps */}
						{sides.map((item, index) => {
							const isSelected = selectedSides.includes(item);
							return (
								<div key={index} className="col">
									<button
										className={`btn btn-outline-secondary w-100 h-100 ${isSelected ? "btn-selected" : ""}`}
										onClick={() => {
											if (!isSelected) {
												// Only allow selection if no side is selected yet
												if (selectedSides.length < 1) {
													handlePressed(item, "Side");
												}
											} else {
												// Unselect the side if it's already selected
												handlePressed(item, "Side");
											}
										}}
									>
										{item}
									</button>
								</div>
							);
						})}
					</div>
				</section>

				<section className="section">
					<h2>Entrees</h2>
					<h4>Select {numEntrees}</h4>
					<div className="row row-cols-3 g-3">
						{entrees.map((item, index) => {
							const isSelected = selectedEntrees.includes(item);
							return (
								<div key={index} className="col">
									<button
										className={`btn btn-outline-secondary w-100 ${isSelected ? "btn-selected" : ""}`}
										onClick={() => {
											if (!isSelected && selectedEntrees.length < numEntrees) {
												handlePressed(item, "Entree");
											} else if (isSelected) {
												handlePressed(item, "Entree");
											}
										}}
									>
										{item}
									</button>

									{/* Show quantity slider only when selected */}
									{isSelected && numEntrees > 1 && (
										<div className="quantity-slider">
											<button
												className="btn btn-outline-secondary"
												onClick={() => handleQuantityChange(item, -1)}
											>
												-
											</button>
											<span>{selectedEntrees.filter(entree => entree === item).length}</span>
											<button
												className="btn btn-outline-secondary"
												onClick={() => selectedEntrees.length < numEntrees && handleQuantityChange(item, 1)}
											>
												+
											</button>
										</div>
									)}
								</div>
							);
						})}
					</div>

				</section>


				{/* Display selected meal items */}
				<section className="section">
					<h3>Selected Items:</h3>

					<div>
						<h4>Sides:</h4>
						{selectedSides.length > 0 ? (
							<ul>
								{selectedSides.map((side, index) => (
									<li key={index}>{side}</li> // List selected sides
								))}
							</ul>
						) : (
							<p>No sides selected</p>
						)}
					</div>

					<div>
						<h4>Entrees:</h4>
						{selectedEntrees.length > 0 ? (
							<ul>
								{selectedEntrees.map((entree, index) => (
									<li key={index}>
										{entree}
									</li>
								))}
							</ul>
						) : (
							<p>No entrees selected</p>
						)}
					</div>
				</section>

			</div>

			{/* Order confirm buttons */}
			<div className="order-confirm">
				<button className="cancel-button" onClick={handleCancel}>Cancel</button>
				<button className="confirm-button" onClick={handleConfirm}>Confirm</button>
			</div>
		</div>
	);
};

export default CustomerMealSelect;