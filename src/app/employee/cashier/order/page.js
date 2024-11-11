// Page.js
'use client';
import './order.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import MealTypes from '@/components/ui/employee/cashier/order/MealTypes';
import FoodTypes from '@/components/ui/employee/cashier/order/FoodTypes';
import Cart from '@/components/ui/employee/cashier/order/Cart';
import EntreeAndSideMenu from '@/components/ui/employee/cashier/order/EntreeAndSideMenu';
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";
import Link from 'next/link';

const menuItems = {
    appetizers: [
        { name: "Chicken Egg Roll", sizes: [{ size: "Small", price: 2.50 }, { size: "Large", price: 4.00 }] },
        { name: "Veggie Spring Roll", sizes: [{ size: "Small", price: 2.00 }, { size: "Large", price: 3.50 }] },
        { name: "Cream Cheese Rangoon", sizes: [{ size: "Small", price: 1.95 }, { size: "Large", price: 3.25 }] },
        { name: "Chicken Potsticker", sizes: [{ size: "Small", price: 2.75 }, { size: "Large", price: 4.50 }] }
    ],
    entrees: [
        { name: "Orange Chicken", price: 6.00 },
        { name: "Kung Pao Chicken", price: 6.50 },
        { name: "Broccoli Beef", price: 7.00 },
        { name: "Grilled Teriyaki Chicken", price: 6.25 }
    ],
    sides: [
        { name: "Chow Mein", price: 3.50 },
        { name: "Fried Rice", price: 3.75 },
        { name: "White Steamed Rice", price: 3.00 },
        { name: "Super Greens", price: 3.25 }
    ],
    drinks: [
        { name: "Soft Drink", price: 1.95 },
        { name: "Bottled Water", price: 1.50 }
    ]
};

const mealTypes = [
    { name: "Bowl", sides: 1, entrees: 1, price: 8.30 },
    { name: "Plate", sides: 1, entrees: 2, price: 10.00 },
    { name: "Bigger Plate", sides: 1, entrees: 3, price: 11.75 },
    { name: "Cub Meal", sides: 1, entrees: 1, price: 6.00 },
    { name: "Family Meal", sides: 2, entrees: 3, price: 32.00 }
];

const foodTypes = ["Appetizers", "Entrees & Sides", "Drinks"];

const OrderPage = () => {
    const [selectedMealType, setSelectedMealType] = useState(null);
    const [cart, setCart] = useState([]);
    const [currentMenu, setCurrentMenu] = useState('main');
    const [entreeCount, setEntreeCount] = useState(0);
    const [sideCount, setSideCount] = useState(0);
    const [selectedAppetizer, setSelectedAppetizer] = useState(null);
    const [warningMessage, setWarningMessage] = useState('');

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
        // Retrieve cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        // Save cart items to local storage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const handleAddToCart = (item, size = null) => {
        setCart([...cart, { ...item, size, quantity: 1 }]);
        setCurrentMenu('main');
    };

    // Add meal to cart with size
    const handleAddMealToCart = (mealType) => {
        setCart([...cart, { ...mealType, items: [], quantity: 1 }]);
        setSelectedMealType(mealType);
        setEntreeCount(0);
        setSideCount(0);
        setWarningMessage('');
        setCurrentMenu('entreeAndSide');
    };

    // Add entree or side to the current meal
    const handleAddToCurrentMeal = (item, type) => {
        const updatedCart = [...cart];
        const currentMealIndex = updatedCart.length - 1;

        if (type === 'entree' && selectedMealType && entreeCount < selectedMealType.entrees) {
            updatedCart[currentMealIndex].items.push(item);
            setEntreeCount(entreeCount + 1);
            if (entreeCount + 1 === selectedMealType.entrees && sideCount === selectedMealType.sides) {
                setCurrentMenu('main');
            }
        } else if (type === 'side' && selectedMealType && sideCount < selectedMealType.sides) {
            updatedCart[currentMealIndex].items.push(item);
            setSideCount(sideCount + 1);
            if (sideCount + 1 === selectedMealType.sides && entreeCount === selectedMealType.entrees) {
                setCurrentMenu('main');
            }
        } else {
            setWarningMessage('You cannot add more items than allowed for this meal type.');
            return;
        }

        setCart(updatedCart);
    };

    // Render the detailed menu for entrees or sides
    const handleEntreeOrSideSelection = (mealType) => {
        handleAddMealToCart(mealType);
    };

    // Render the detailed menu for appetizers
    const handleAppetizerSelection = () => {
        setCurrentMenu('appetizer');
    };

    // Handle selecting an appetizer size
    const handleAppetizerSizeSelection = (appetizer, size) => {
        handleAddToCart({ name: `${appetizer.name} (${size.size})`, price: size.price });
    };

    // Render the detailed menu for drinks
    const handleDrinkSelection = () => {
        setCurrentMenu('drink');
    };

    // Handle quantity change
    const handleQuantityChange = (index, quantity) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = quantity || 1;
        setCart(updatedCart);
    };

    // Handle removing an item from the cart
    const handleRemoveItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="page-container">
            {warningMessage && <div className="alert alert-warning warning-message">{warningMessage}</div>}
            {currentMenu === 'main' && (
                <div className="main-menu">
                    <div className="mb-4">
                        <MealTypes mealTypes={mealTypes} onMealTypeClick={handleEntreeOrSideSelection} />
                    </div>
                    <div>
                        <FoodTypes 
                            foodItems={foodTypes} 
                            onFoodTypeClick={(food) => {
                                if (food === "Appetizers") {
                                    handleAppetizerSelection();
                                } else if (food === "Drinks") {
                                    handleDrinkSelection();
                                } else if (food === "Entrees & Sides") {
                                    handleEntreeOrSideSelection(mealTypes[0]); // Use the first meal type for simplicity
                                }
                            }}
                        />
                    </div>
                </div>
            )}
            
            {currentMenu === 'entreeAndSide' && selectedMealType && (
                <div className="menu-container">
                    <h3>Entrees & Sides</h3>
                    <div className="row">
                        <div className="col-md-6 entree-section">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h4 className="card-title">Entrees</h4>
                                    {menuItems.entrees.map((entree) => (
                                        <button 
                                            key={entree.name} 
                                            className="btn btn-outline-primary menu-button mb-2 w-100"
                                            onClick={() => handleAddToCurrentMeal(entree, 'entree')}
                                        >
                                            {entree.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 side-section">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h4 className="card-title">Sides</h4>
                                    {menuItems.sides.map((side) => (
                                        <button 
                                            key={side.name} 
                                            className="btn btn-outline-primary menu-button mb-2 w-100"
                                            onClick={() => handleAddToCurrentMeal(side, 'side')}
                                        >
                                            {side.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setCurrentMenu('main')} className="btn btn-secondary back-button mt-3">Back</button>
                </div>
            )}
            
            {currentMenu === 'appetizer' && (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h4 className="card-title">Appetizers</h4>
                                    {menuItems.appetizers.map((item) => (
                                        <button
                                            key={item.name}
                                            className="btn btn-outline-primary menu-button mb-2 w-100"
                                            onClick={() => {
                                                setSelectedAppetizer(item);
                                                setCurrentMenu('appetizerSizeSelection');
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                    <button className="btn btn-secondary" onClick={() => setCurrentMenu('main')}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentMenu === 'appetizerSizeSelection' && selectedAppetizer && (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h4 className="card-title">Select Size for {selectedAppetizer.name}</h4>
                                    {selectedAppetizer.sizes.map((size) => (
                                        <button
                                            key={size.size}
                                            className="btn btn-outline-success menu-button mb-2 w-100"
                                            onClick={() => handleAppetizerSizeSelection(selectedAppetizer, size)}
                                        >
                                            {size.size}
                                        </button>
                                    ))}
                                    <button className="btn btn-secondary" onClick={() => setCurrentMenu('appetizer')}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {currentMenu === 'drink' && (
                <div className="menu-container">
                    <h3>Drinks</h3>
                    <div className="row">
                        {menuItems.drinks.map((drink) => (
                            <div className="col-md-6 mb-3" key={drink.name}>
                                <button 
                                    className="btn btn-outline-primary menu-button w-100"
                                    onClick={() => handleAddToCart(drink)}
                                >
                                    {drink.name}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setCurrentMenu('main')} className="btn btn-secondary back-button mt-3">Back</button>
                </div>
            )}

            <Cart 
                cartItems={cart} 
                showQuantityControls={currentMenu === 'main'} 
                handleQuantityChange={(index, quantity) => {
                    const updatedCart = [...cart];
                    updatedCart[index].quantity = quantity || 1;
                    setCart(updatedCart);
                }} 
                handleRemoveItem={(index) => {
                    const updatedCart = cart.filter((_, i) => i !== index);
                    setCart(updatedCart);
                }}
            />

            {cart.length > 0 && currentMenu === 'main' && (
                <div className="checkout-button-container mt-4">
                    <Link href={{ pathname: "/employee/cashier/order/confirmation", query: { cart: JSON.stringify(cart) } }}>
                        <button className="btn btn-success">Check Out</button>
                    </Link>
                </div>
            )}

        </div>
        </div>
    );
};

export default OrderPage;
