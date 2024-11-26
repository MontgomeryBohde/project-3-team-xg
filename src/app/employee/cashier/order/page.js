// src/app/employee/cashier/order/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Cart from '@/components/ui/employee/cashier/order/Cart';
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";
import Link from 'next/link';
import Appetizer from '@/components/ui/employee/cashier/order/Appetizer';
import Entree from '@/components/ui/employee/cashier/order/Entree';
import Side from '@/components/ui/employee/cashier/order/Side';
import Drink from '@/components/ui/employee/cashier/order/Drink';
import SizeSelection from '@/components/ui/employee/cashier/order/SizeSelection';

const OrderPage = () => {
    const [entreeCount, setEntreeCount] = useState(0);
    const [sideCount, setSideCount] = useState(0);
    const [selectedMealType, setSelectedMealType] = useState(null);
    const [cart, setCart] = useState([]);
    const [inProgressMeal, setInProgressMeal] = useState(null);
    const [currentMenu, setCurrentMenu] = useState('main');
    const [warningMessage, setWarningMessage] = useState('');
    const [menuItems, setMenuItems] = useState({
        appetizers: [],
        entrees: [],
        sides: [],
        drinks: []
    });
    const [selectedItem, setSelectedItem] = useState(null);

    const mealTypes = [
        { item_name: "Bowl", sides: 1, entrees: 1, price: 8.30 },
        { item_name: "Plate", sides: 1, entrees: 2, price: 10.00 },
        { item_name: "Bigger Plate", sides: 1, entrees: 3, price: 11.75 },
        { item_name: "Cub Meal", sides: 1, entrees: 1, price: 6.00 },
        { item_name: "Family Meal", sides: 2, entrees: 3, price: 32.00 }
    ];

    useEffect(() => {
        console.log('Current inProgressMeal:', inProgressMeal);
    }, [inProgressMeal]);

    
    // Fetch menu items from the database using the API endpoint
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('/api/getMenu?type=menu');
                if (!response.ok) throw new Error('Failed to fetch menu items');
    
                const data = await response.json();    
                // Filter items into categories
                const appetizers = data.filter(item => item.category.toLowerCase() === 'appetizer');
                const entrees = data.filter(item => item.category.toLowerCase() === 'entree');
                const sides = data.filter(item => item.category.toLowerCase() === 'side');
                const drinks = data.filter(item => item.category.toLowerCase() === 'drink');
    
                setMenuItems({ appetizers, entrees, sides, drinks });
            } catch (error) {
                console.error('Error fetching menu items:', error);
                setWarningMessage('Error fetching menu items. Please try again later.');
            }
        };
    
        fetchMenuItems();
    }, []);    

    useEffect(() => {
        const handlePopState = () => {
            // Retrieve cart items from sessionStorage when navigating back
            const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
            setCart(storedCart); // Make sure storedCart is defined before using it
        };
    
        // Add event listener for the popstate event (browser back button)
        window.addEventListener('popstate', handlePopState);
    
        // Retrieve cart items initially
        handlePopState();
    
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);    

    // Start meal order without adding it to the cart immediately
    const handleStartMealOrder = (mealType) => {
        setInProgressMeal({ 
            ...mealType, 
            items: [], 
            price: mealType.price, 
            quantity: 1 
        });
        setSelectedMealType(mealType);
        setEntreeCount(0);
        setSideCount(0);
        setWarningMessage('');
        setCurrentMenu('mealSelection');
    };    
    // Add entree or side to the in-progress meal
    const handleAddToInProgressMeal = (item, type) => {
        if (!inProgressMeal) {
            console.log('In-progress meal is null');
            return;
        }
    
        const updatedMeal = { ...inProgressMeal };
    
        if (type === 'entree' && selectedMealType && entreeCount < selectedMealType.entrees) {
            updatedMeal.items.push(item);
            console.log('Added entree:', item);
            setEntreeCount(entreeCount + 1);
        } else if (type === 'side' && selectedMealType && sideCount < selectedMealType.sides) {
            updatedMeal.items.push(item);
            console.log('Added side:', item);
            setSideCount(sideCount + 1);
        } else {
            setWarningMessage('You cannot add more items than allowed for this meal type.');
            console.log('Warning message set.');
            return;
        }
    
        setInProgressMeal(updatedMeal);
        console.log('Updated meal:', updatedMeal);
    };    

    // Complete the in-progress meal and add to cart
    const handleCompleteMealOrder = () => {
        if (inProgressMeal && entreeCount === selectedMealType.entrees && sideCount === selectedMealType.sides) {
            setCart([...cart, inProgressMeal]);
            setInProgressMeal(null);
            setSelectedMealType(null);
            setEntreeCount(0);
            setSideCount(0);
            setCurrentMenu('main'); setWarningMessage('');
        } else {
            setWarningMessage('Please complete the meal by selecting the required number of entrees and sides.');
        }
    };

    // Handle selecting an item to choose size
    const handleAddToCart = (item, size, price) => {
        try {
            setCart([...cart, { ...item, size: size, price: price, quantity: 1 }]);
            setCurrentMenu('main'); setWarningMessage('');
            setWarningMessage('');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setWarningMessage('Error adding item to cart. Please try again later.');
        }
    };

    const handleSelectItemForSize = async (item) => {
        try {
            const response = await fetch(`/api/getItemSizes?item_id=${item.id}`);
            if (!response.ok) throw new Error('Failed to fetch item sizes');

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                // Set the selected item including its available sizes
                const updatedItem = {
                    ...item,
                    sizes: data.map((item_size) => ({
                        id: item_size.id,
                        item_size: item_size.item_size,
                        price: item_size.price,
                        calories: item_size.calories,
                    })),
                };
                
                setSelectedItem(updatedItem);
                setCurrentMenu('sizeSelection');
                setWarningMessage('');
            } else {
                throw new Error('No available sizes found for the selected item');
            }
        } catch (error) {
            console.error('Error fetching item sizes:', error);
            setWarningMessage('No available sizes found for the selected item.');
        }
    };

    const handleNavigateToConfirmation = () => {
        // Save the current cart state to local storage before navigating
        sessionStorage.setItem('cart', JSON.stringify(cart));
    };    

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                {warningMessage && (
                    <div className="alert alert-warning text-center">{warningMessage}</div>
                )}
    
                <div className="row">
                    {currentMenu === 'main' && (
                        <>
                            <div className="col-md-6 mb-4">
                                <div className="meal-types p-3 border rounded bg-light">
                                    <h3 className="text-center text-primary">Meal Types</h3>
                                    <div className="menu-grid mt-3">
                                        {mealTypes.map((meal) => (
                                            <button
                                                key={meal.item_name}
                                                className="btn btn-outline-primary w-100 mb-3 btn-lg"
                                                onClick={() => handleStartMealOrder(meal)}
                                            >
                                                {meal.item_name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="food-types p-3 border rounded bg-light">
                                    <h3 className="text-center text-primary">Food Items</h3>
                                    <div className="menu-grid mt-3">
                                        {['Appetizers', 'Entrees', 'Sides', 'Drinks'].map((food) => (
                                            <button
                                                key={food}
                                                className="btn btn-outline-primary w-100 mb-3 btn-lg"
                                                onClick={() => {
                                                    setWarningMessage('');
                                                    switch (food) {
                                                        case 'Appetizers':
                                                            setCurrentMenu('appetizer');
                                                            break;
                                                        case 'Entrees':
                                                            setCurrentMenu('entree');
                                                            break;
                                                        case 'Sides':
                                                            setCurrentMenu('side');
                                                            break;
                                                        case 'Drinks':
                                                            setCurrentMenu('drink');
                                                            break;
                                                    }
                                                }}
                                            >
                                                {food}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
    
                    {currentMenu === 'mealSelection' && selectedMealType && (
                        <div className="col-12">
                            <div className="text-center mb-4">
                                <h3 className="text-primary">Customize Your Meal</h3>
                                <p>
                                    {selectedMealType.item_name} - Remaining Entrees:{" "}
                                    {selectedMealType.entrees - entreeCount}, Remaining Sides:{" "}
                                    {selectedMealType.sides - sideCount}
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Entree 
                                        menuItems={menuItems.entrees} 
                                        handleAddToCurrentMeal={(item) => handleAddToInProgressMeal(item, 'entree')}
                                        setInProgressMeal={inProgressMeal}
                                        currentMenu={currentMenu}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Side 
                                        menuItems={menuItems.sides} 
                                        handleAddToCurrentMeal={(item) => handleAddToInProgressMeal(item, 'side')}
                                        setInProgressMeal={inProgressMeal}
                                        currentMenu={currentMenu}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-secondary btn-lg me-3"
                                    onClick={() => {
                                        setCurrentMenu('main');
                                        setWarningMessage('');
                                        setInProgressMeal(null);
                                        setSelectedMealType(null);
                                        setEntreeCount(0);
                                        setSideCount(0);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={handleCompleteMealOrder}
                                >
                                    Complete Meal
                                </button>
                            </div>
                        </div>
                    )}
    
                    {['appetizer', 'entree', 'side', 'drink'].includes(currentMenu) && (
                        <div className="col-12">
                            <h3 className="text-center text-primary">
                                {currentMenu.charAt(0).toUpperCase() + currentMenu.slice(1)}s
                            </h3>
                            <div className="row">
                                <div className="col">
                                    {currentMenu === 'appetizer' && (
                                        <Appetizer
                                            menuItems={menuItems.appetizers}
                                            handleAddToCart={(item) => handleSelectItemForSize(item)}
                                        />
                                    )}
                                    {currentMenu === 'entree' && (
                                        <Entree
                                            menuItems={menuItems.entrees}
                                            handleAddToCart={(item) => handleSelectItemForSize(item)}
                                        />
                                    )}
                                    {currentMenu === 'side' && (
                                        <Side
                                            menuItems={menuItems.sides}
                                            handleAddToCart={(item) => handleSelectItemForSize(item)}
                                        />
                                    )}
                                    {currentMenu === 'drink' && (
                                        <Drink
                                            menuItems={menuItems.drinks}
                                            handleAddToCart={(item) => handleSelectItemForSize(item)}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-secondary btn-lg"
                                    onClick={() => {
                                        setCurrentMenu('main');
                                        setWarningMessage('');
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    )}
    
                    {currentMenu === 'sizeSelection' && (
                        <div className="col-12">
                            <h3 className="text-center text-primary">Choose Size</h3>
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <SizeSelection
                                        item={selectedItem}
                                        handleAddToCart={handleAddToCart}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-secondary btn-lg"
                                    onClick={() => {
                                        setCurrentMenu(selectedItem.category.toLowerCase());
                                        setWarningMessage('');
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
    
                <div className="mt-4">
                    <Cart
                        cartItems={cart}
                        inProgressMeal={inProgressMeal}
                        setInProgressMeal={setInProgressMeal}
                        setEntreeCount={setEntreeCount}
                        setSideCount={setSideCount}
                        setCart={setCart}
                        showQuantityControls={currentMenu === 'main'}
                        handleQuantityChange={(index, quantity) => {
                            const updatedCart = [...cart];
                            updatedCart[index].quantity = quantity || 1;
                            setCart(updatedCart);
                        }}
                        handleRemoveItem={(index, type = null, itemIndex = null) => {
                            let updatedCart = [...cart];
                            if (type && type === 'meal') {
                                const updatedMeal = { ...updatedCart[index] };
                                updatedMeal.items = updatedMeal.items.filter(
                                    (_, i) => i !== itemIndex
                                );
                                updatedCart[index] = updatedMeal;
                            } else {
                                updatedCart = updatedCart.filter((_, i) => i !== index);
                            }
                            setCart(updatedCart);
                            setWarningMessage('');
                        }}
                        currentMenu={currentMenu}
                    />
                    <div className="text-center mt-4">
                        <button className="btn btn-danger btn-lg" onClick={() => setCart([])}>
                            Clear Cart
                        </button>
                        {cart.length > 0 && currentMenu === 'main' && (
                            <Link href="/employee/cashier/order/confirmation" legacyBehavior>
                                <a
                                    className="btn btn-success btn-lg ms-3"
                                    onClick={handleNavigateToConfirmation}
                                >
                                    Check Out
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default OrderPage;
