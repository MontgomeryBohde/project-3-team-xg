// Page.js
'use client';
import 'bootstrap/dist/css/bootstrap.css';
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
    const [selectedMealType, setSelectedMealType] = useState(null);
    const [cart, setCart] = useState([]);
    const [currentMenu, setCurrentMenu] = useState('main');
    const [entreeCount, setEntreeCount] = useState(0);
    const [sideCount, setSideCount] = useState(0);
    const [warningMessage, setWarningMessage] = useState('');
    const [menuItems, setMenuItems] = useState({
        appetizers: [],
        entrees: [],
        sides: [],
        drinks: []
    });
    const [selectedItem, setSelectedItem] = useState(null);

    const mealTypes = [
        { name: "Bowl", sides: 1, entrees: 1, price: 8.30 },
        { name: "Plate", sides: 1, entrees: 2, price: 10.00 },
        { name: "Bigger Plate", sides: 1, entrees: 3, price: 11.75 },
        { name: "Cub Meal", sides: 1, entrees: 1, price: 6.00 },
        { name: "Family Meal", sides: 2, entrees: 3, price: 32.00 }
    ];

    // Fetch menu items from the database using the API endpoint
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('/api/menu_items');
                if (!response.ok) throw new Error('Failed to fetch menu items');
                const data = await response.json();
                setMenuItems({
                    appetizers: data.menuItems.filter(item => item.category.toLowerCase() === 'appetizer'),
                    entrees: data.menuItems.filter(item => item.category.toLowerCase() === 'entree'),
                    sides: data.menuItems.filter(item => item.category.toLowerCase() === 'side'),
                    drinks: data.menuItems.filter(item => item.category.toLowerCase() === 'drink')
                });
            } catch (error) {
                console.error('Error fetching menu items:', error);
                setWarningMessage('Error fetching menu items. Please try again later.');
            }
        };
        fetchMenuItems();
    }, []);

    useEffect(() => {
        // Retrieve cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        // Save cart items to local storage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const handleAddToCart = async (item, size, price) => {
        try {
            setCart([...cart, { ...item, size: size, price: price, quantity: 1 }]);
            setCurrentMenu('main');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setWarningMessage('Error adding item to cart. Please try again later.');
        }
    };

    // Add meal to cart with size
    const handleAddMealToCart = (mealType) => {
        setCart([...cart, { ...mealType, items: [], price: mealType.price, quantity: 1 }]);
        setSelectedMealType(mealType);
        setEntreeCount(0);
        setSideCount(0);
        setWarningMessage('');
        setCurrentMenu('mealSelect');
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

    // Handle selecting an item to choose size
    const handleSelectItemForSize = async (item) => {
        try {
            const response = await fetch(`/api/item_sizes?item_id=${item.id}`);
            if (!response.ok) throw new Error('Failed to fetch item sizes');

            const data = await response.json();
            console.log(`Fetching item sizes for item ID: ${item.id}`);
            console.log('Fetch response:', data);

            if (Array.isArray(data) && data.length > 0) {
                // Set the selected item including its available sizes
                const updatedItem = {
                    ...item,
                    sizes: data.map((item_size) => ({
                        id: item_size.id,
                        size: item_size.size,
                        price: item_size.price,
                        calories: item_size.calories,
                    })),
                };
                
                setSelectedItem(updatedItem);
                console.log('Selected item:', updatedItem);
                setCurrentMenu('sizeSelection');
            } else {
                throw new Error('No available sizes found for the selected item');
            }
        } catch (error) {
            console.error('Error fetching item sizes:', error);
            setWarningMessage('No available sizes found for the selected item.');
        }
    };

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                {warningMessage && <div className="alert alert-warning text-center">{warningMessage}</div>}
                <div className="row">
                    {/* Left Column: Meal Types */}
                    <div className="col-md-6 mb-4">
                        {(currentMenu === 'main' || currentMenu === 'mealSelect') && (
                            <div className="meal-types">
                                <h3>Meal Types</h3>
                                <div className="menu-grid">
                                    {mealTypes.map((meal) => (
                                        <button
                                            key={meal.name}
                                            className="btn btn-outline-primary w-100 mb-2"
                                            onClick={() => handleAddMealToCart(meal)}
                                        >
                                            {meal.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Food Items */}
                    <div className="col-md-6 mb-4">
                        {(currentMenu === 'main' || currentMenu === 'mealSelect') && (
                            <div className="food-types">
                                <h3>Food Items</h3>
                                <div className="menu-grid">
                                    {['Appetizers', 'Entrees', 'Sides', 'Drinks'].map((food) => (
                                        <button
                                            key={food}
                                            className="btn btn-outline-primary w-100 mb-2"
                                            onClick={() => {
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
                        )}
                    </div>
                </div>

                {/* Dynamic Content Section */}
                {currentMenu === 'mealSelect' && selectedMealType && (
                    <div className="row">
                        <h3 className="text-center">Entrees & Sides</h3>
                        <div className="col-md-6">
                            <Entree 
                                menuItems={menuItems.entrees} 
                                handleAddToCurrentMeal={(item) => handleAddToCurrentMeal(item, 'entree')}
                                currentMenu={currentMenu}
                            />
                        </div>
                        <div className="col-md-6">
                            <Side 
                                menuItems={menuItems.sides} 
                                handleAddToCurrentMeal={(item) => handleAddToCurrentMeal(item, 'side')}
                                currentMenu={currentMenu}
                            />
                        </div>
                        <button onClick={() => setCurrentMenu('main')} className="btn btn-secondary mt-3">Back</button>
                    </div>
                )}

                {currentMenu === 'appetizer' && (
                    <div className="row">
                        <h3 className="text-center">Appetizers</h3>
                        <div className="col">
                            <Appetizer 
                                menuItems={menuItems.appetizers}
                                handleAddToCart={(item) => handleSelectItemForSize(item)}
                            />
                        </div>
                        <button onClick={() => setCurrentMenu('main')} className="btn btn-secondary mt-3">Back</button>
                    </div>
                )}

                {currentMenu === 'entree' && (
                    <div className="row">
                        <h3 className="text-center">Entrees</h3>
                        <div className="col">
                            <Entree 
                                menuItems={menuItems.entrees} 
                                handleAddToCart={(item) => handleSelectItemForSize(item)}
                            />
                        </div>
                        <button onClick={() => setCurrentMenu('main')} className="btn btn-secondary mt-3">Back</button>
                    </div>
                )}

                {currentMenu === 'side' && (
                    <div className="row">
                        <h3 className="text-center">Sides</h3>
                        <div className="col">
                            <Side 
                                menuItems={menuItems.sides} 
                                handleAddToCart={(item) => handleSelectItemForSize(item)}
                            />
                        </div>
                        <button onClick={() => setCurrentMenu('main')} className="btn btn-secondary mt-3">Back</button>
                    </div>
                )}

                {currentMenu === 'drink' && (
                    <div className="row">
                        <h3 className="text-center">Drinks</h3>
                        <div className="col">
                            <Drink 
                                menuItems={menuItems.drinks} 
                                handleAddToCart={(item) => handleSelectItemForSize(item)}
                            />
                        </div>
                        <button onClick={() => setCurrentMenu('main')} className="btn btn-secondary mt-3">Back</button>
                    </div>
                )}

                {currentMenu === 'sizeSelection' && (
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <SizeSelection
                                item={selectedItem}
                                handleAddToCart={handleAddToCart}
                            />
                        </div>
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
                    currentMenu={currentMenu}
                />

                {cart.length > 0 && currentMenu === 'main' && (
                    <div className="text-center mt-4">
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
