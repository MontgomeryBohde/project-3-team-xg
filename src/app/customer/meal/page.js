"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import "bootstrap/dist/css/bootstrap.css"; // Bootstrap is already included
import "./meal-select.css"; 

const CustomerMealSelect = () => {
  const [entrees, setEntrees] = useState([
    "Orange Chicken", "Black Pepper Sirloin Steak", "Honey Walnut Shrimp",
    "Grilled Teriyaki Chicken", "Kung Pao Chicken", "Honey Sesame Chicken Breast",
    "Beijing Beef", "Mushroom Chicken", "SweetFire Chicken Breast",
    "String Bean Chicken Breast", "Broccoli Beef", "Black Pepper Chicken", "Super Greens",
  ]);
  const [sides, setSides] = useState(["White Steamed Rice", "Fried Rice", "Chow Mein", "Super Greens"]);

  const [meal, setMeal] = useState("Bowl");
  const [numEntrees, setNumEntrees] = useState(null);
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedEntrees, setSelectedEntrees] = useState([]);

  const [cart, setCart] = useState([]); // Cart to hold both simple and complex objects

  const router = useRouter();

  // Update numEntrees based on selected meal
  useEffect(() => {
    if (meal === "Bowl") {
      setNumEntrees(1);
    } else if (meal === "Plate") {
      setNumEntrees(2);
    } else if (meal === "Bigger Plate") {
      setNumEntrees(3);
    }
  }, [meal]);

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
    router.push("/customer/menu"); // TODO: Navigate to the menu page
  };

  // Handle confirm action
  const handleConfirm = () => {
    // Check if the number of selected items equals the expected number of entrees + 1 (for sides)
    if (selectedEntrees.length === numEntrees && selectedSides.length === 1) {
      // Add selected items to the cart as a complex object
      const mealCartItem = {
        mealItem: meal,
        entrees: selectedEntrees,
        sides: selectedSides,
        quantity: 1, // Adjust quantity if needed
      };
      
      setCart([...cart, mealCartItem]); // Add the complex meal object to the cart

      localStorage.setItem("Cart", JSON.stringify([...cart, mealCartItem])); // Save cart to localStorage

      router.push("/customer/menu"); // Navigate to the menu page
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
          <div className="button-grid">
            {sides.map((item, index) => {
              const isSelected = selectedSides.includes(item); // Check if item is selected
              return (
                <button
                  key={index}
                  className={`item-button ${isSelected ? "selected" : ""}`}
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
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2>Entrees</h2>
          <h4>Select {numEntrees}</h4>
          <div className="button-grid">
            {entrees.map((item, index) => {
              const isSelected = selectedEntrees.includes(item); // Check if item is selected
              return (
                <div key={index} className="item-container">
                  <button
                    className={`item-button ${isSelected ? "selected" : ""}`}
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
                  {isSelected && numEntrees > 1 && (
                    <div className="quantity-slider">
                      <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                      <span>{1}</span> {/* Default to 1 if no quantity management needed */}
                      <button
                        onClick={() =>
                          selectedEntrees.length < numEntrees && handleQuantityChange(item, 1)
                        }
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