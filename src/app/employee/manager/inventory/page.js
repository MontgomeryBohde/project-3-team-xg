'use client'

import { useState } from 'react';
import './inventory.css';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';

export default function Menu() {
    // Placeholders for now
    const [appetizers, setAppetizers] = useState(["Appetizer1", "Appetizer2", "Appetizer3"]);
    const [meats, setMeats] = useState(["Meat1", "Meat2", "Meat3"]);
    const [vegetables, setVegetables] = useState(["Veg1", "Veg2", "Veg3"]);
    const [assorted, setAssorted] = useState(["Assorted1", "Assorted2", "Assorted3"]);
    const [drinks, setDrinks] = useState(["Drink1", "Drink2", "Drink3"]);

    const [selectedCategory, setSelectedCategory] = useState("Appetizer");
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemSize, setItemSize] = useState('Medium');
    const [itemCategory, setItemCategory] = useState('Entree');
    const [inventoryIds, setInventoryIds] = useState('{}');
    const [itemPrice, setItemPrice] = useState(3.00);

    const handlePopup = (name, category) => {
        setItemName(name);
        setItemCategory(category);
        setSelectedItem(category);
    };

    const addItem = () => {
        // Add the new item to the correct array based on the selected category
        switch (itemCategory) {
            case 'Appetizer':
                setAppetizers((prev) => [...prev, itemName]);
                break;
            case 'Meat':
                setMeats((prev) => [...prev, itemName]);
                break;
            case 'Vegetable':
                setVegetables((prev) => [...prev, itemName]);
                break;
            case 'Assorted':
                setAssorted((prev) => [...prev, itemName]);
                break;
            case 'Drink':
                setDrinks((prev) => [...prev, itemName]);
                break;
            default:
                break;
        }
        
        // Close the popup and reset the input fields
        setSelectedItem(null);
        setItemName('');
        setItemSize('Medium');
        setItemCategory('Entree');
        setInventoryIds('{}');
        setItemPrice(3.00);
    };


    const removeItem = () => {
        switch (itemCategory) {
            case 'Appetizer':
                setAppetizers((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Meat':
                setMeats((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Vegetable':
                setVegetables((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Assorted':
                setAssorted((prev) => prev.filter(item => item !== itemName));
                break;
            case 'Drink':
                setDrinks((prev) => prev.filter(item => item !== itemName));
                break;
            default:
                break;
        }

        setSelectedItem(null);
        resetFields();
    };

    const resetFields = () => {
        setItemName('');
        setItemSize('Medium');
        setItemCategory('Entree');
        setInventoryIds('{}');
        setItemPrice(3.00);
    };

    const renderItems = () => {
        switch (selectedCategory) {
            case 'Appetizer': return appetizers;
            case 'Meat': return meats;
            case 'Vegetable': return vegetables;
            case 'Assorted': return assorted;
            case 'Drink': return drinks;
            default: return [];
        }
    };

    return (
        <div>
            <div className="header-container">
                <EmployeeLogInHeader />
            </div>
            <div className="inventory-container">
                <h1>Inventory</h1>
                <div className="inventory-layout">
                    <nav className="category-menu">
                        {["Appetizer", "Meat", "Vegetable", "Assorted", "Drink"].map((category) => (
                            <button 
                                key={category} 
                                className={`category-button ${selectedCategory === category ? 'active' : ''}`} 
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </nav>

                    <div className="items-display">
                        <h2>{selectedCategory}</h2>
                        <div className="button-grid">
                            {renderItems().map((item, index) => (
                                <button key={index} className="item-button" onClick={() => handlePopup(item, selectedCategory)}>
                                    {item}
                                </button>
                            ))}
                        </div>
                        <button className="item-button" onClick={() => handlePopup("", selectedCategory)}>Add New Item</button>
                    </div>
                </div>

                {selectedItem && (
                    <div className="popup">
                        <h3>Add New Item</h3>
                        <label>
                            Name: 
                            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        </label>
                        <label>
                            Size: 
                            <input type="text" value={itemSize} onChange={(e) => setItemSize(e.target.value)} />
                        </label>
                        <label>
                            Category:
                            <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
                                <option value="Appetizer">Appetizer</option>
                                <option value="Meat">Meat</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Assorted">Assorted</option>
                                <option value="Drink">Drink</option>
                            </select>
                        </label>
                        <label>
                            Inventory Item IDs:
                            <input type="text" value={inventoryIds} onChange={(e) => setInventoryIds(e.target.value)} />
                        </label>
                        <label>
                            Price:
                            <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                        </label>
                        <button onClick={addItem}>Add</button>
                        <button onClick={removeItem}>Remove</button>
                        <button onClick={() => setSelectedItem(null)}>Cancel</button>
                    </div>
                )}


                <style jsx>{`
                    .popup {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: white;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        z-index: 1000;
                    }

                    .popup label {
                        display: block;
                        margin: 10px 0;
                    }

                    .popup button {
                        margin-top: 10px;
                        margin-right: 5px;
                    }

                    .popup input, .popup select {
                        margin-left: 10px;
                    }

                    /* Overlay to darken the background when popup is active */
                    .overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 999;
                    }
                `}</style>
                
                {selectedItem && <div className="overlay" onClick={() => setSelectedItem(null)} />}
            </div>
        </div>
        
    );
}