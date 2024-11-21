'use client';

import React, { useEffect, useState } from "react";
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';

const Menu = () => {
    const [entrees, setEntrees] = useState([]);
	const [sides, setSides] = useState([]);
    const [appetizers, setAppetizers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [seasonal, setSeasonal] = useState([]);

    // Fetch menu items from the database using the API endpoint
    const fetchMenuItems = async () => {
        try {
            const response = await fetch("/api/getProducts?type=menu-with-sizes");
            if (!response.ok) throw new Error("Failed to fetch menu items");

            const data = await response.json();
            // console.log("API Response:", data);

            if (!Array.isArray(data)) {
                throw new Error("Invalid data format from API");
            }

            // filter items by category
            setEntrees(data.filter(item => item.category?.toLowerCase() === "entree"));
            setSides(data.filter(item => item.category?.toLowerCase() === "side"));
            setAppetizers(data.filter(item => item.category?.toLowerCase() === "appetizer"));
            setDrinks(data.filter(item => item.category?.toLowerCase() === "drink"));
            setSeasonal(data.filter(item => item.is_seasonal === "t"));  // Adjust as necessary if seasonal is included
            
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
    const [inventoryIds, setInventoryIds] = useState("");
    const [itemPrice, setItemPrice] = useState(0.00);

    const handlePopup = (item, category) => {
        if (!item) {
            setItemName('');
            setItemSize('Medium');
            setItemCategory(category); // Set the category of the item to be added
            setInventoryIds('');
            setItemPrice(0.00);
            setSelectedItem(category); // Set selectedItem to the category to trigger the modal
        } else {
            setItemName(item.name);
            setItemSize(item.size);
            setItemCategory(category);
            setSelectedItem(item);
            setInventoryIds(item.inventory_ids ? item.inventory_ids.join(', ') : '');
            setItemPrice(item.price);
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
    };

    // FIXME - update db
    const addItem = async () => {
        const itemData = {
            item_name: itemName,
            category: itemCategory,
            inventory_item_ids: inventoryIds.split(',').map(id => parseInt(id.trim())),
            descr: "",  // You can set a description if needed
            available: true,
            is_seasonal: false,  // Set this based on your logic
            image_url: "",  // Provide image URL if needed
            sizes: [{ item_size: itemSize, price: itemPrice, calories: 0 }]  // You can add more sizes if needed
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
                // ("Item added successfully");
                // Refresh the menu items after adding
                fetchMenuItems();
                resetFields();
            } else {
                console.error("Failed to add item");
            }
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };
  
    const removeItem = async () => {
        console.log(selectedItem);
        const itemData = { id: selectedItem.item_id }; // Ensure you're sending the correct ID of the selected item
        console.log("Sending remove request with data:", itemData);
    
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
                fetchMenuItems();  // Refresh the menu
                resetFields();
            } else {
                console.error("Failed to remove item:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error removing menu item:", error);
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
                        {item.name} ({item.size})
                    </button>
                </div>
            ))
        ) : (
            <div className="text-center text-muted">No items available in this category</div>
        )
    );
    

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
                        </section>

                        <section id="appetizers" className="mb-5">
                            <h2 className="text-center">Appetizers</h2>
                            <div className="row">
                                {renderMenuItems(appetizers, "Appetizer")}
                            </div>
                        </section>

                        <section id="drinks" className="mb-5">
                            <h2 className="text-center">Drinks</h2>
                            <div className="row">
                                {renderMenuItems(drinks, "Drink")}
                            </div>
                        </section>

                        <section id="seasonal" className="mb-5">
                            <h2 className="text-center">Seasonal</h2>
                            <div className="row">
                                {renderMenuItems(seasonal, "Seasonal")}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {selectedItem && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Item</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedItem(null)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input type="text" className="form-control" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Size:</label>
                                    <input type="text" className="form-control" value={itemSize} onChange={(e) => setItemSize(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category:</label>
                                    <select className="form-select" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
                                        <option value="Entree">Entree</option>
                                        <option value="Side">Side</option>
                                        <option value="Appetizer">Appetizer</option>
                                        <option value="Drink">Drink</option>
                                        <option value="Seasonal">Seasonal</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Inventory Item IDs:</label>
                                    
                                    <input type="text" className="form-control" value={inventoryIds} onChange={(e) => setInventoryIds(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price:</label>
                                    <input type="number" className="form-control" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success btn-lg" onClick={addItem}>Add</button>
                                <button type="button" className="btn btn-danger btn-lg" onClick={removeItem}>Remove</button>
                                <button type="button" className="btn btn-secondary btn-lg" onClick={() => setSelectedItem(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;
