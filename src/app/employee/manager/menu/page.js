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
	useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("/api/getProducts?type=menu-with-sizes");
                if (!response.ok) throw new Error("Failed to fetch menu items");

                const data = await response.json();
                console.log("API Response:", data);

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format from API");
                }

                // filter entrees
                setEntrees(data.filter(item => {
                    return item.category && item.category.trim().toLowerCase() === "entree";
                }));

                // filter sides
                setSides(data.filter(item => {
                    return item.category && item.category.trim().toLowerCase() === "side";
                }));

                // filter appetizers
                setAppetizers(data.filter(item => {
                    return item.category && item.category.trim().toLowerCase() === "appetizer";
                }));

                // filter drinks
                setDrinks(data.filter(item => {
                    return item.category && item.category.trim().toLowerCase() === "drink";
                }));

                // filter seasonal
                setSeasonal(data.filter((item) => item.is_seasonal === "t")); // Adjust as necessary if seasonal is included
                
            } catch (err) {
                console.error("Error fetching menu items:", err);
            }
        };
	
		fetchMenuItems();
	}, []);	

    const [selectedItem, setSelectedItem] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemSize, setItemSize] = useState('Medium');
    const [itemCategory, setItemCategory] = useState('Entree');
    const [inventoryIds, setInventoryIds] = useState("{}");
    const [itemPrice, setItemPrice] = useState(0.00);

    const handlePopup = (item, category) => {
        console.log("Selected Item's inventory ids:", item.inventory_ids); // Debug the selected item
        setItemName(item.name);
        setItemSize(item.size);
        setItemCategory(category);
        setSelectedItem(category);
        setInventoryIds(item.inventory_ids ? item.inventory_ids.join(', ') : '{}'); // Convert array to string
        setItemPrice(item.price);
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
        setInventoryIds('{}');
        setItemPrice(0.00);
    };

    // FIXME - update db
    const addItem = () => {
        switch (itemCategory) {
            case 'Entree':
                setEntrees((prev) => [...prev, itemName]);
                break;
            case 'Side':
                setSides((prev) => [...prev, itemName]);
                break;
            case 'Appetizer':
                setAppetizers((prev) => [...prev, itemName]);
                break;
            case 'Drink':
                setDrinks((prev) => [...prev, itemName]);
                break;
            case 'Seasonal':
                setSeasonal((prev) => [...prev, itemName]);
                break;
            default:
                break;
        }
        resetFields();
    };

    // FIXME - update db
    const removeItem = () => {
        switch (itemCategory) {
            case 'Entree':
                setEntrees((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Side':
                setSides((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Appetizer':
                setAppetizers((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Drink':
                setDrinks((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Seasonal':
                setSeasonal((prev) => prev.filter(item => item !== itemName));
                break;
            default:
                break;
        }
        resetFields();
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
