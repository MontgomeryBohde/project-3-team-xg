// src/app/employee/manager/inventory/page.js
'use client';

/**
 * @requires react
 * @requires react-icons/fa
 * @requires ./inventory.css
 * @requires @/components/ui/employee/header/EmployeeLogInHeader
 * @requires @/components/ui/employee/manager/inventory/InventoryPopUp
 */

import { useState, useEffect, useRef } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import InventoryPopUp from '@/components/ui/employee/manager/inventory/InventoryPopUp';
import { FaAppleAlt, FaDrumstickBite, FaCarrot, FaCocktail, FaToolbox, FaUtensils } from 'react-icons/fa';
import './inventory.css';

/**
 * Inventory component to manage and display inventory items.
 * 
 * @component
 * @returns {JSX.Element} The Inventory component.
 */
const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState({
        Appetizer: [],
        Meats: [],
        Vegetables: [],
        Assorted: [],
        Drinks: [],
        Utensils: [],
    });

    const [selectedCategory, setSelectedCategory] = useState("Appetizer");
    const [selectedItem, setSelectedItem] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState("Appetizer");
    const [itemPrice, setItemPrice] = useState(0.50);
    const [currentStock, setCurrentStock] = useState(0);
    const [restockDate, setRestockDate] = useState('');
    const [isAllergen, setIsAllergen] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const categoryRefs = {
        Appetizer: useRef(null),
        Meats: useRef(null),
        Vegetables: useRef(null),
        Assorted: useRef(null),
        Drinks: useRef(null),
        Utensils: useRef(null),
    };

    const categoryIcons = {
        Appetizer: <FaAppleAlt />,
        Meats: <FaDrumstickBite />,
        Vegetables: <FaCarrot />,
        Assorted: <FaToolbox />,
        Drinks: <FaCocktail />,
        Utensils: <FaUtensils />,
    };

    /**
     * Fetch inventory items from the server.
     * 
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const fetchInventoryItems = async () => {
        try {
            const response = await fetch('/api/getInventory?type=inventory');
            if (!response.ok) throw new Error('Failed to fetch inventory items');

            const data = await response.json();
            const categorizedItems = data.reduce((acc, item) => {
                acc[item.category] = acc[item.category] || [];
                acc[item.category].push(item);
                return acc;
            }, {});

            setInventoryItems((prev) => ({
                ...prev,
                ...categorizedItems,
            }));
        } catch (error) {
            console.error('Error fetching inventory items:', error);
        }
    };

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    /** 
     * Scroll to the selected category.
     */
    const handleNavigation = (category) => {
        const ref = categoryRefs[category];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    /**
     * Handle the popup for adding, editing, or removing an inventory item.
     */
    const handlePopup = (item) => {
        if (item) {
            setItemId(item.id || null);
            setItemName(item.item_name || '');
            setItemCategory(item.category || 'Appetizer');
            setItemPrice(item.unit_price || 0.50);
            setCurrentStock(item.current_stock || 0);
            setRestockDate(item.restock_date?.split('T')[0] || '');
            setIsAllergen(item.is_allergen || false);
            setIsVegan(item.is_vegan || false);
            setSelectedItem(item);
        } else {
            resetFields();
            setSelectedItem(true);
        }
    };

    /**
     * Add an inventory item to the database.
     */
    const addItem = async () => {
        if (!itemName.trim() || !itemCategory || isNaN(itemPrice) || isNaN(currentStock) || !restockDate) {
            alert('All fields are required and must have valid values!');
            return;
        }

        try {
            const response = await fetch('/api/getInventory?type=addInventoryItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_name: itemName.trim(),
                    category: itemCategory.trim(),
                    current_stock: parseInt(currentStock, 10),
                    restock_date: restockDate,
                    unit_price: parseFloat(itemPrice),
                    is_allergen: isAllergen,
                    is_vegan: isVegan,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add inventory item');
            }
            await fetchInventoryItems();
        } catch (error) {
            console.error('Error adding item:', error);
            alert(`Error adding item: ${error.message}`);
        } finally {
            resetFields();
        }
    };

    /**
     * Edit an inventory item in the database.
     */
    const editItem = async () => {
        if (!itemId || !itemName.trim() || !itemCategory || isNaN(itemPrice) || isNaN(currentStock) || !restockDate) {
            alert('All fields are required and must have valid values!');
            return;
        }

        try {
            const response = await fetch('/api/getInventory?type=editInventoryItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: itemId,
                    item_name: itemName.trim(),
                    category: itemCategory.trim(),
                    current_stock: parseInt(currentStock, 10),
                    restock_date: restockDate,
                    unit_price: parseFloat(itemPrice),
                    is_allergen: isAllergen,
                    is_vegan: isVegan,
                }),
            });

            if (response.status === 404) {
                alert('Item not found. Please refresh and try again.');
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to edit inventory item');
            }

            await new Promise((resolve) => setTimeout(resolve, 500));
            await fetchInventoryItems();
        } catch (error) {
            console.error('Error editing item:', error);
            alert(`Error editing item: ${error.message}`);
        } finally {
            resetFields();
        }
    };

    /**
     * Remove an inventory item from the database.
     */
    const removeItem = async () => {
        if (!selectedItem?.id) {
            alert('Item ID is required!');
            return;
        }

        try {
            const response = await fetch('/api/getInventory?type=removeInventoryItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedItem.id }),
            });

            if (!response.ok && response.status !== 404) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to remove inventory item');
            }
            await fetchInventoryItems();
        } catch (error) {
            console.error('Error removing item:', error);
            alert(`Error removing item: ${error.message}`);
        } finally {
            resetFields();
        }
    };

    const resetFields = () => {
        setItemId(null);
        setItemName('');
        setItemCategory("Appetizer");
        setItemPrice(0.50);
        setCurrentStock(0);
        setRestockDate('');
        setIsAllergen(false);
        setIsVegan(false);
        setSelectedItem(false);
    };

    const renderItems = () => inventoryItems[selectedCategory] || [];

    return (
        <div>
            {/* Header */}
            <div className="header-container">
                <EmployeeLogInHeader />
            </div>
    
            {/* Main Content */}
            <div className="main-content d-flex">
                {/* Sidebar */}
                <div className="sidebar">
                    <nav className="list-group">
                        {Object.keys(inventoryItems).map((category) => (
                            <button
                                key={category}
                                className={`list-group-item list-group-item-action d-flex align-items-center ${selectedCategory === category ? "active" : ""}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <span className="me-3 fs-4">{categoryIcons[category]}</span>
                                <span className="fs-5">{category}</span>
                            </button>
                        ))}
                    </nav>
                </div>
    
                {/* Items for Selected Category */}
                <div className="content-container container">
                    <h1 className="text-center mb-4">Inventory Management</h1>
                    <h2 className="text-center mb-4">{selectedCategory}</h2>
                    <div className="row g-4">
                        {renderItems().map((item, index) => (
                            <div key={index} className="col-md-4 col-sm-6">
                                <button
                                    className="btn btn-outline-primary btn-lg w-100"
                                    onClick={() => item && handlePopup(item)}
                                >
                                    {item?.item_name || 'Unnamed Item'}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-success btn-lg w-100 mt-4" onClick={() => handlePopup(null)}>
                        Add New {selectedCategory} Item
                    </button>
                </div>
            </div>
    
            {/* Inventory Popup */}
            {selectedItem && (
                <InventoryPopUp
                    itemId={itemId}
                    itemName={itemName}
                    itemCategory={itemCategory}
                    itemPrice={itemPrice}
                    currentStock={currentStock}
                    restockDate={restockDate}
                    isAllergen={isAllergen}
                    isVegan={isVegan}
                    setItemName={setItemName}
                    setItemCategory={setItemCategory}
                    setItemPrice={setItemPrice}
                    setCurrentStock={setCurrentStock}
                    setRestockDate={setRestockDate}
                    setIsAllergen={setIsAllergen}
                    setIsVegan={setIsVegan}
                    addItem={addItem}
                    removeItem={removeItem}
                    editItem={editItem}
                    resetFields={resetFields}
                />
            )}
        </div>
    );    
};

export default Inventory;
