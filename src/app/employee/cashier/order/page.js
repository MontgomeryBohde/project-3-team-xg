"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MealTypes from "@/components/ui/employee/cashier/order/meal_types/MealTypes";
import FoodTypes from "@/components/ui/employee/cashier/order/food_types/FoodTypes";
import EntreeAndSideMenu from "@/components/ui/employee/cashier/order/detailed_menu/EntreeAndSideMenu";
import AppetizerMenu from "@/components/ui/employee/cashier/order/detailed_menu/AppetizerMenu";
import Cart from "@/components/ui/employee/cashier/order/cart/Cart";
import "./order.css";

const mealTypes = [
    { name: "Bowl", sides: 1, entrees: 1 },
    { name: "Plate", sides: 1, entrees: 2 },
    { name: "Bigger Plate", sides: 1, entrees: 3 },
    { name: "Cub Meal", sides: 1, entrees: 1 },
    { name: "Family Meal", sides: 2, entrees: 3 }
];

const foodItems = ["Appetizers", "Entrees & Sides", "Drinks"];

const OrderPage = () => {
    const router = useRouter();
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selectedFoodType, setSelectedFoodType] = useState(null);
    const [order, setOrder] = useState([]);
    const [selectedSides, setSelectedSides] = useState([]);
    const [selectedEntrees, setSelectedEntrees] = useState([]);
    const [showAppetizers, setShowAppetizers] = useState(false);

    const handleLogout = () => {
        router.push("/employee");
    };

    const handleMealTypeClick = (mealType) => {
        setSelectedMeal(mealType);
        setSelectedSides([]);
        setSelectedEntrees([]);
        setSelectedFoodType(null);
    };

    const handleFoodTypeClick = (foodType) => {
        if (foodType === "Appetizers") {
            setShowAppetizers(true);
        } else {
            setSelectedFoodType(foodType);
            setSelectedMeal(null);
        }
    };

    const handleAddToOrder = (item, type, price = 5) => { // Default price for demonstration
        setOrder((prevOrder) => {
            // Check if the item is already in the cart
            const existingItemIndex = prevOrder.findIndex(
                (orderItem) => orderItem.name === item && orderItem.type === type
            );
            if (existingItemIndex >= 0) {
                // Item already in cart, increase the quantity
                const updatedOrder = [...prevOrder];
                updatedOrder[existingItemIndex].quantity += 1;
                return updatedOrder;
            } else {
                // New item, add to cart
                return [...prevOrder, { name: item, type, price, quantity: 1 }];
            }
        });
    };

    const handleBackClick = () => {
        setSelectedMeal(null);
        setSelectedFoodType(null);
        setShowAppetizers(false);
    };

    return (
        <div className="order-container">
            <header className="header">
                <span>Name: &lt;Cashier Name&gt;</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>

            <div className="main-content">
                {showAppetizers ? (
                    <AppetizerMenu 
                        onBackClick={handleBackClick} 
                        onAddToOrder={handleAddToOrder} 
                    />
                ) : selectedMeal || selectedFoodType ? (
                    <EntreeAndSideMenu
                        mealType={selectedMeal}
                        foodType={selectedFoodType}
                        selectedSides={selectedSides}
                        selectedEntrees={selectedEntrees}
                        setSelectedSides={setSelectedSides}
                        setSelectedEntrees={setSelectedEntrees}
                        onAddToOrder={handleAddToOrder}
                        onBackClick={handleBackClick}
                    />
                ) : (
                    <div className="menu-columns">
                        <MealTypes mealTypes={mealTypes} onMealTypeClick={handleMealTypeClick} />
                        <FoodTypes foodItems={foodItems} onFoodTypeClick={handleFoodTypeClick} />
                    </div>
                )}

                <Cart 
                    order={order}
                    setOrder={setOrder} // Pass setOrder to allow modification of the cart
                />
            </div>
        </div>
    );
};

export default OrderPage;
