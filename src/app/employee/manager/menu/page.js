'use client';

/**
 * @file page.js
 * @description Contains the Menu component which displays menu items.
 * @requires React
 * @requires EmployeeLogInHeader
 */

import React, { useEffect, useState } from "react";
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';

/**
 * Menu component that fetches and displays menu items.
 * @returns {JSX.Element} The rendered Menu component.
 */
const Menu = () => {
    const [entrees, setEntrees] = useState([]);
	const [sides, setSides] = useState([]);
    const [appetizers, setAppetizers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [seasonal, setSeasonal] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);

    /**
     * Fetches inventory items from the API.
     * @async
     * @function
     * @returns {Promise<void>}
     */
const fetchInventoryItems = async () => {
    try {
        const response = await fetch("/api/inventory-items");
        if (!response.ok) throw new Error("Failed to fetch inventory items");

        const data = await response.json();
        setInventoryItems(data); 
    } catch (err) {
        console.error("Error fetching inventory items:", err);
    }
};

useEffect(() => {
    fetchInventoryItems(); 
}, []);

    /**
     * Fetches menu items from the API and groups them by item ID.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const fetchMenuItems = async () => {
        try {
            const response = await fetch("/api/getProducts?type=menu-with-sizes");
            if (!response.ok) throw new Error("Failed to fetch menu items");
    
            const data = await response.json();
    
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format from API");
            }
    
            const groupedItems = data.reduce((acc, item) => {
                if (!acc[item.item_id]) {
                    acc[item.item_id] = {
                        ...item,
                        sizes: [],
                    };
                }
    
                acc[item.item_id].sizes.push({
                    size: item.size,
                    price: item.price,
                    calories: item.calories,
                });
                return acc;
            }, {});
    
            setEntrees(Object.values(groupedItems).filter(item => item.category?.toLowerCase() === "entree"));
            setSides(Object.values(groupedItems).filter(item => item.category?.toLowerCase() === "side"));
            setAppetizers(Object.values(groupedItems).filter(item => item.category?.toLowerCase() === "appetizer"));
            setDrinks(Object.values(groupedItems).filter(item => item.category?.toLowerCase() === "drink"));
            setSeasonal(Object.values(groupedItems).filter(item => item.category?.toLowerCase() === "seasonal"));
        } catch (err) {
            console.error("Error fetching menu items:", err);
        }
    };
    
    

    // to only run one time
    useEffect(() => {
        fetchMenuItems();
    }, []);

    const [selectedItem, setSelectedItem] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemSize, setItemSize] = useState('Medium');
    const [itemCategory, setItemCategory] = useState('Entree');
   // const [inventoryItems, setInventoryItems] = useState([]);  // This will hold the inventory items
    const [inventoryIds, setInventoryIds] = useState(""); 
    const [itemPrice, setItemPrice] = useState(0.00);
    const [itemCalories, setItemCalories] = useState(0); 
    
    const handlePopup = (item, category) => {
        if (!item) {
            console.log("in");
            setItemName('');
            setItemSize('Medium');
            setItemCategory(category);
            setInventoryIds('');
            setItemPrice(0.00);
            setItemCalories(0);

            setSelectedItem('Item Name'); 
        } else {
            setItemName(item.name);
            setItemCategory(category);
            setSelectedItem(item);
            setInventoryIds(item.inventory_names ? item.inventory_names.join(', ') : ''); 
            setItemSize(item.sizes[0]?.size || 'Medium');
            setItemPrice(item.sizes[0]?.price || 0.00);
            setItemCalories(item.sizes[0]?.calories || 0);
        }
    };
    
      

    const handleSizeChange = (selectedSize) => {
        console.log("chanfing");
        setItemSize(selectedSize); 
        const selectedSizeDetails = selectedItem.sizes.find(size => size.item_size === selectedSize);
    
        if (selectedSizeDetails) {
            setItemPrice(selectedSizeDetails.price); 
            setItemCalories(selectedSizeDetails.calories); 
        }
    };  
    

    const handleNavigation = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const resetFields = () => {
        setSelectedItem(null);
        setItemName('');
        setItemSize('Medium');
        setItemCategory('Entree');
        setInventoryIds('');
        setItemPrice(0.00);
        setItemCalories(0);
    };

    const [availableInventoryItems, setAvailableInventoryItems] = useState([]);
   

    /**
     * Fetches available inventory items from the API.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const fetchAvailableInventoryItems = async () => {
        try {
            const response = await fetch("/api/inventory-items");
            if (!response.ok) throw new Error("Failed to fetch inventory items");
    
            const data = await response.json();
            setAvailableInventoryItems(data); 
        } catch (err) {
            console.error("Error fetching inventory items:", err);
        }
    };

    

    
    useEffect(() => {
        fetchAvailableInventoryItems();
    }, []);

    /**
     * Adds a new menu item to the database.
     * @async
     * @function
     * @returns {Promise<void>}
    */
    const addItem = async () => {
        const itemData = {
            item_name: itemName,
            category: itemCategory,
            inventory_item_names: inventoryIds.split(',').map(name => name.trim()), 
            available: true,
            is_seasonal: itemCategory === "Seasonal",
            image_url: "",
            sizes: [
                { 
                    item_size: itemSize, 
                    price: parseFloat(itemPrice), 
                    calories: itemCalories 
                }
            ]
        };
        try {
            const response = await fetch("/api/manageMenuItems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
            });
    
            if (response.ok) {
                console.log("Item added successfully");
                fetchMenuItems();
                resetFields();
            } else {
                console.error("Failed to add item");
            }
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };
    
    
    /**
     * Removes a menu item from the database.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const removeItem = async () => {
        if (!selectedItem || !selectedItem.item_id) {
            console.error("No item selected for removal.");
            return; 
        }
    
        const itemData = { id: selectedItem.item_id };  
        
        try {
            const response = await fetch("/api/manageMenuItems", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData), 
            });
    
            if (response.ok) {
                console.log("Item removed successfully");
                fetchMenuItems(); 
                resetFields(); 
            } else {
                console.error("Failed to remove item:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error removing menu item:", error);
        }
    };
  
    /**
     * Adds an inventory item to a menu item.
     * @async
     * @function
     * @param {string} selectedInventoryItemName - The name of the inventory item to add.
     * @returns {Promise<void>}
     */
    const handleAddInventoryItem = async (selectedInventoryItemName) => {
        try {
           
            console.log("Selected ITEM :", selectedItem);
            console.log("Selected Inventory Item Name:", selectedInventoryItemName);
        console.log("Selected Menu Item ID:", selectedItem.item_id);  

            const inventoryResponse = await fetch(`/api/getInventoryId?name=${encodeURIComponent(selectedInventoryItemName)}`);
            const inventoryData = await inventoryResponse.json();
    
            if (!inventoryResponse.ok) {
                console.error("Error fetching inventory ID:", inventoryData.error);
                return;
            }
    
            const inventoryItemId = inventoryData.id; 
    
          
            const response = await fetch('/api/updateInventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menuItemId: selectedItem.item_id,
                    inventoryItemId: inventoryItemId,   
                    action: 'add',                    
                }),
            });
            
            if (response.ok) {
                const updatedItem = await response.json();
                setInventoryIds(updatedItem.inventory_item_ids.join(", "));
                setInventoryIds(selectedItem.inventory_names ? selectedItem.inventory_names.join(', ') : ''); 
    
                console.log("Inventory updated successfully:", updatedItem);
            } else {
                const errorData = await response.json();
                console.error("Error updating inventory:", errorData.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    /**
     * Removes an inventory item from a menu item.
     * @async
     * @function
     * @param {string} selectedInventoryItemName - The name of the inventory item to remove.
     * @returns {Promise<void>}
     */
    const handleRemoveInventoryItem = async (selectedInventoryItemName) => {
        try {
            console.log("Selected ITEM:", selectedItem);
            console.log("Selected Inventory Item Name:", selectedInventoryItemName);
            console.log("Selected Menu Item ID:", selectedItem.item_id);

            const inventoryResponse = await fetch(`/api/getInventoryId?name=${encodeURIComponent(selectedInventoryItemName)}`);
            const inventoryData = await inventoryResponse.json();

            if (!inventoryResponse.ok) {
                console.error("Error fetching inventory ID:", inventoryData.error);
                return;
            }

            const inventoryItemId = inventoryData.id;  

           
            const response = await fetch('/api/updateInventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menuItemId: selectedItem.item_id,
                    inventoryItemId: inventoryItemId,
                    action: 'remove',
                }),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setInventoryIds(updatedItem.inventory_item_ids.join(", "));
                console.log("Inventory updated successfully:", updatedItem);
            } else {
                const errorData = await response.json();
                console.error("Error updating inventory:", errorData.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const renderMenuItems = (items, category) => (
        items.length > 0 ? (
            items.map((item, index) => (
                <div key={index} className="col-md-3 mb-3">
                    <button
                        className="btn btn-outline-primary w-100 btn-lg"
                        onClick={() => handlePopup(item, category)}
                    >
                        {item.name}
                    </button>
                </div>
            ))
        ) : (
            <div className="text-center text-muted">No items available in this category</div>
        )
    );
    

    const renderPopup = () => {
        if (!selectedItem) return null;
    
        return (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Item</h5>
                            <button type="button" className="btn-close" onClick={() => setSelectedItem(null)}></button>
                        </div>
                        <div className="modal-body">
                            {/* Name Input */}
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={itemName} 
                                    onChange={(e) => setItemName(e.target.value)} 
                                />
                            </div>
        
                            {/* Conditional Size Input */}
                            <div className="mb-3">
                                <label className="form-label">Size:</label>
                                {selectedItem === 'Item Name' ? (
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={itemSize} 
                                        onChange={(e) => setItemSize(e.target.value)} 
                                    />
                                ) : (
                                    <select 
                                        className="form-select" 
                                        value={itemSize} 
                                        onChange={(e) => handleSizeChange(e.target.value)}
                                    >
                                        {selectedItem.sizes.map((size, idx) => (
                                            <option key={idx} value={size.size}>
                                                {size.size}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
        
                            {/* Category Dropdown */}
                            <div className="mb-3">
                                <label className="form-label">Category:</label>
                                <select 
                                    className="form-select" 
                                    value={itemCategory} 
                                    onChange={(e) => setItemCategory(e.target.value)}
                                >
                                    <option value="Entree">Entree</option>
                                    <option value="Side">Side</option>
                                    <option value="Appetizer">Appetizer</option>
                                    <option value="Drink">Drink</option>
                                    <option value="Seasonal">Seasonal</option>
                                </select>
                            </div>
        
                            {/* Inventory Items: Text Input + Dropdown */}
                            <div className="mb-3">
                                <label className="form-label">Inventory Items:</label>
                                
                                  {/* Current Inventory Items */}
        <input
            type="text"
            className="form-control"
            value={inventoryIds}
            onChange={(e) => setInventoryIds(e.target.value)}
            placeholder="Comma-separated inventory item names"
        />

        {/* Dropdown for adding new inventory items */}
        <div className="mt-2">
            <select
                className="form-select"
                onChange={(e) => {
                    const selectedItem = e.target.value;
                    // Call the function only if a valid item is selected (not empty string)
                    if (selectedItem) {
                        handleAddInventoryItem(selectedItem);
                    }
                }}
            >
        <option value="">Select an item to add</option>
        {availableInventoryItems.map((item, idx) => {
            
            console.log("Checking item:", item.item_name);
            console.log("inventoryIds:", inventoryIds);

           
            const isItemSelected = inventoryIds
                .split(',')
                .map((id) => id.trim().toLowerCase())
                .includes(item.item_name.toLowerCase());
            console.log("Is item selected?", isItemSelected);

           
            return !isItemSelected && (
                <option key={idx} value={item.item_name}>
                    {item.item_name}
                </option>
            );
        })}
    </select>
            </div>
                </div>
                    {/*Remove inventory items*/}
                        <div className="mt-2">
                            <select
                                className="form-select"
                                onChange={(e) => {
                                    const selectedItem = e.target.value;
                                    if (selectedItem) {
                                        handleRemoveInventoryItem(selectedItem);
                                    }
                                }}
                            >
                    <option value="">Select an item to remove</option>
                    {inventoryIds.length > 0 && inventoryIds.split(',').map((inventoryItemName, idx) => (
                        <option key={idx} value={inventoryItemName.trim()}>
                            {inventoryItemName.trim()}
                        </option>
                    ))}
                </select>
            </div>
        
                            {/* Price Input */}
                            <div className="mb-3">
                                <label className="form-label">Price:</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={itemPrice} 
                                    onChange={(e) => setItemPrice(parseFloat(e.target.value))} 
                                />
                            </div>
        
                            {/* Calories Input */}
                            <div className="mb-3">
                                <label className="form-label">Calories:</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={itemCalories} 
                                    onChange={(e) => setItemCalories(parseInt(e.target.value))} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-success btn-lg" 
                                onClick={addItem}
                            >
                                Save
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger btn-lg" 
                                onClick={removeItem}
                            >
                                Remove
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary btn-lg" 
                                onClick={() => setSelectedItem(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
        
    }
        
    
    

    return (
        <div className="container-fluid p-0">
            <EmployeeLogInHeader />

            <div className="d-flex">
                {/* Sidebar Navigation */}
                <div className="bg-light p-4" style={{ width: '250px', position: 'sticky', top: '0', height: '100vh' }}>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-3">
                            <button className="btn btn-outline-secondary btn-lg w-100" onClick={() => handleNavigation('entrees')}>Entrees</button>
                        </li>
                        <li className="nav-item mb-3">
                            <button className="btn btn-outline-secondary btn-lg w-100" onClick={() => handleNavigation('sides')}>Sides</button>
                        </li>
                        <li className="nav-item mb-3">
                            <button className="btn btn-outline-secondary btn-lg w-100" onClick={() => handleNavigation('appetizers')}>Appetizers</button>
                        </li>
                        <li className="nav-item mb-3">
                            <button className="btn btn-outline-secondary btn-lg w-100" onClick={() => handleNavigation('drinks')}>Drinks</button>
                        </li>
                        <li className="nav-item mb-3">
                            <button className="btn btn-outline-secondary btn-lg w-100" onClick={() => handleNavigation('seasonal')}>Seasonal</button>
                        </li>
                    </ul>
                </div>

                <div className="container mt-4">
                    <h1 className="text-center mb-4">Menu</h1>
                    <div className="content">
                        <section id="entrees" className="mb-5">
                            <h2 className="text-center">Entrees</h2>
                            <div className="row">
                                {renderMenuItems(entrees, "Entree")}
                            </div>
                            <button
                                className="btn btn-outline-success btn-lg w-100 mt-3"
                                onClick={() => handlePopup(null, "Entree")} // Opens the popup with category
                            >
                                Add New Item
                            </button>
                        </section>

                        <section id="sides" className="mb-5">
                            <h2 className="text-center">Sides</h2>
                            <div className="row">
                                {renderMenuItems(sides, "Side")}
                            </div>
                            <button
                                className="btn btn-outline-success btn-lg w-100 mt-3"
                                onClick={() => handlePopup(null, "Side")} // Opens the popup with category
                            >
                                Add New Item
                            </button>
                        </section>

                        <section id="appetizers" className="mb-5">
                            <h2 className="text-center">Appetizers</h2>
                            <div className="row">
                                {renderMenuItems(appetizers, "Appetizer")}
                            </div>
                            <button
                                className="btn btn-outline-success btn-lg w-100 mt-3"
                                onClick={() => handlePopup(null, "Appetizer")} // Opens the popup with category
                            >
                                Add New Item
                            </button>
                        </section>

                        <section id="drinks" className="mb-5">
                            <h2 className="text-center">Drinks</h2>
                            <div className="row">
                                {renderMenuItems(drinks, "Drink")}
                            </div>
                            <button
                                className="btn btn-outline-success btn-lg w-100 mt-3"
                                onClick={() => handlePopup(null, "Drink")} // Opens the popup with category
                            >
                                Add New Item
                            </button>
                        </section>

                        <section id="seasonal" className="mb-5">
                            <h2 className="text-center">Seasonal</h2>
                            <div className="row">
                                {renderMenuItems(seasonal, "Seasonal")}
                            </div>
                            <button
                                className="btn btn-outline-success btn-lg w-100 mt-3"
                                onClick={() => handlePopup(null, "Seasonal")} // Opens the popup with category
                            >
                                Add New Item
                            </button>
                        </section>
                    </div>
                </div>
            </div>

            
            {renderPopup()}
        </div>
    );
}

export default Menu;