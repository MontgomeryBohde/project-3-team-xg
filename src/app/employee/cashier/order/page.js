// src/app/employee/order/page.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MealTypes from "@/components/ui/employee/cashier/order/meal_types/MealTypes";
import FoodTypes from "@/components/ui/employee/cashier/order/food_types/FoodTypes";
import DetailedMenu from "@/components/ui/employee/cashier/order/detailed_menu/DetailedMenu";
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
        setSelectedFoodType(foodType);
        setSelectedMeal(null);
    };

    const handleAddToOrder = (item, type) => {
        setOrder((prevOrder) => [...prevOrder, { name: item, type, price: "0" }]);
    };

    const handleBackClick = () => {
        setSelectedMeal(null);
        setSelectedFoodType(null);
        setOrder([]);
    };

    return (
        <div className="order-container">
            <header className="header">
                <span>Name: &lt;Cashier Name&gt;</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>

            <div className="main-content">
                {selectedMeal || selectedFoodType ? (
                    <DetailedMenu
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

                <Cart order={order} />
            </div>
        </div>
    );
};

export default OrderPage;
