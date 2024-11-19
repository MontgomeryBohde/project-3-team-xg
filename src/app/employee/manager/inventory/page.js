// src/app/employee/manager/inventory/page.js
'use client';

import { useState, useEffect } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import InventoryPopUp from '@/components/ui/employee/manager/inventory/InventoryPopUp';

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

    // Fetch inventory items function
    const fetchInventoryItems = async () => {
        try {
            const response = await fetch('/api/getInventory?type=inventory');
            if (!response.ok) throw new Error('Failed to fetch inventory items');
    
            const data = await response.json();
            const categorizedItems = data.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
            }, {});
    
            // Ensure all categories exist in the state
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

    const handlePopup = (item) => {
        if (item) {
            // Set fields for editing
            setItemId(item.id || null);
            setItemName(item.item_name || '');
            setItemCategory(item.category || 'Appetizer');
            setItemPrice(item.unit_price || 0.50);
            setCurrentStock(item.current_stock || 0);
            setRestockDate(item.restock_date ? item.restock_date.split('T')[0] : '');
            setIsAllergen(item.is_allergen || false);
            setIsVegan(item.is_vegan || false);
            setSelectedItem(item); // Set the actual item for editing
        } else {
            // Reset fields for adding a new item
            resetFields();
            setSelectedItem(true); // Set to true to show the "Add New Item" form
        }
    };    

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
            resetFields(); // Reset fields after adding the item
        }
    };    

    const editItem = async () => {
        if (!itemId || !itemName.trim() || !itemCategory || isNaN(itemPrice) || isNaN(currentStock) || !restockDate) {
            alert('All fields are required and must have valid values!');
            return;
        }
    
        try {
            console.log('Editing item with ID:', itemId);
    
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
                console.warn(`Item with ID ${itemId} not found for editing.`);
                alert(`Item not found. Please refresh and try again.`);
                return;
            }
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to edit inventory item');
            }
    
            console.log('Edited item successfully.');
    
            // Add a small delay before fetching updated inventory to ensure the backend has fully processed the request
            await new Promise((resolve) => setTimeout(resolve, 500));
    
            // Refetch the updated inventory items from the server
            await fetchInventoryItems();
        } catch (error) {
            console.error('Error editing item:', error);
            alert(`Error editing item: ${error.message}`);
        } finally {
            resetFields(); // Reset fields after editing the item
        }
    };    
    
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
    
            // Check if the response was successful
            if (response.status === 404) {
                console.warn(`Item with ID ${selectedItem.id} was not found, which means it has likely already been deleted.`);
            } else if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to remove inventory item');
            }
            await fetchInventoryItems();
        } catch (error) {
            console.error('Error removing item:', error);
            alert(`Error removing item: ${error.message}`);
        } finally {
            resetFields(); // Reset fields after deleting an item
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
            <div className="header-container">
                <EmployeeLogInHeader />
            </div>
            <div className="container mt-4">
                <h1 className="text-center mb-4">Inventory Management</h1>
                <div className="row">
                    <div className="col-md-3">
                        <nav className="list-group">
                            {Object.keys(inventoryItems).map((category) => (
                                <button
                                    key={category}
                                    className={`list-group-item list-group-item-action ${selectedCategory === category ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="col-md-9">
                        <h2 className="text-center">{selectedCategory}</h2>
                        <div className="row g-3">
                            {renderItems().map((item, index) => (
                                <div key={index} className="col-4">
                                    <button
                                        className="btn btn-outline-primary w-100"
                                        onClick={() => item && handlePopup(item)}
                                    >
                                        {item?.item_name || 'Unnamed Item'}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-success w-100 mt-3" onClick={() => handlePopup(null)}>
                            Add New Item
                        </button>
                    </div>
                </div>
            </div>

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
