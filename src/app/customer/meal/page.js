"use client";

import React, { useEffect, useState } from "react";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import "bootstrap/dist/css/bootstrap.css";

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
  const [mealItems, setMealItems] = useState([]);

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

  // Helper function to get count of selected entrees
  const getEntreeCount = () => {
    return mealItems.filter((item) => item.type === "Entree").reduce((sum, item) => sum + item.quantity, 0);
  };

  // Handle item button press
  const handlePressed = (item, type) => {
    const existingItem = mealItems.find((mealItem) => mealItem.name === item);

    if (type === "Side") {
      // Restrict to only 1 side selection
      if (existingItem) {
        setMealItems([]);
      } else {
        setMealItems([{ name: item, quantity: 1, type }]);
      }
    } else if (type === "Entree") {
      // Restrict entrees to numEntrees
      if (existingItem) {
        setMealItems(mealItems.filter((mealItem) => mealItem.name !== item));
      } else if (getEntreeCount() < numEntrees) {
        setMealItems([...mealItems, { name: item, quantity: 1, type }]);
      }
    }
  };

  // Handle quantity change for entrees
  const handleQuantityChange = (item, increment) => {
    setMealItems((prevItems) =>
      prevItems
        .map((mealItem) =>
          mealItem.name === item ? { ...mealItem, quantity: mealItem.quantity + increment } : mealItem
        )
        .filter((mealItem) => mealItem.quantity > 0)
    );
  };

  return (
    <div>
      <EmployeeHeader />
      <h1>Meal: {meal}</h1>

      <section className="section">
        <h2>Sides</h2>
        <h4>Select 1</h4>
        <div className="button-grid">
          {sides.map((item, index) => {
            const existingItem = mealItems.find((mealItem) => mealItem.name === item);
            return (
              <button
                key={index}
                className="item-button"
                onClick={() => handlePressed(item, "Side")}
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
            const existingItem = mealItems.find((mealItem) => mealItem.name === item);
            return (
              <div key={index} className="item-container">
                <button
                  className="item-button"
                  onClick={() => handlePressed(item, "Entree")}
                >
                  {item}
                </button>
                {existingItem && numEntrees > 1 && (
                  <div className="quantity-slider">
                    <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                    <span>{existingItem.quantity}</span>
                    <button
                      onClick={() =>
                        getEntreeCount() < numEntrees && handleQuantityChange(item, 1)
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
        <h2>Selected Items</h2>
        <ul>
          {mealItems.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        .item-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .quantity-slider {
          display: flex;
          gap: 10px;
          margin-top: 5px;
        }
        .quantity-slider button {
          width: 30px;
          height: 30px;
        }
      `}</style>
    </div>
  );
};

export default CustomerMealSelect;
