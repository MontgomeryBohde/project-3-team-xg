'use client'

import { useState } from 'react';
import './menu.css';

import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';


export default function Menu() {
    // Hardcoded for now
    const [entrees, setEntrees] = useState([
        "Orange Chicken", "Black Pepper Sirloin Steak", "Honey Walnut Shrimp",
        "Grilled Teriyaki Chicken", "Kung Pao Chicken", "Honey Sesame Chicken Breast",
        "Beijing Beef", "Mushroom Chicken", "SweetFire Chicken Breast",
        "String Bean Chicken Breast", "Broccoli Beef", "Black Pepper Chicken", "Super Greens"
    ]);
    const [sides, setSides] = useState(["White Steamed Rice", "Fried Rice", "Chow Mein", "Super Greens"]);
    const [appetizers, setAppetizers] = useState(["Chicken Egg Roll", "Apple Pie Roll", "Veggie Spring Roll", "Cream Cheese Rangoon"]);
    const [drinks, setDrinks] = useState(["Fountain", "Sweet Tea", "Gatorade", "Lemonade", "Bottled Water"]);
    const [seasonal, setSeasonal] = useState([]); // empty for now

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

    return (
        <div className="app-container">
            <header className="header-container">
                <EmployeeLogInHeader />
            </header>
    
            <main className="menu-container">
                <h1>Menu</h1>
    
                <section className="section">
                    <h2>Entrees</h2>
                    <div className="button-grid">
                        {entrees.map((item, index) => (
                            <button key={index} className="item-button" onClick={() => handlePopup(item, "Entree")}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <button className="item-button" onClick={() => handlePopup("", "Entree")}>Add New Item</button>
                </section>
    
                <section className="section">
                    <h2>Sides</h2>
                    <div className="button-grid">
                        {sides.map((item, index) => (
                            <button key={index} className="item-button" onClick={() => handlePopup(item, "Side")}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <button className="item-button" onClick={() => handlePopup("", "Side")}>Add New Item</button>
                </section>
    
                <section className="section">
                    <h2>Appetizers</h2>
                    <div className="button-grid">
                        {appetizers.map((item, index) => (
                            <button key={index} className="item-button" onClick={() => handlePopup(item, "Appetizer")}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <button className="item-button" onClick={() => handlePopup("", "Appetizer")}>Add New Item</button>
                </section>
    
                <section className="section">
                    <h2>Drinks</h2>
                    <div className="button-grid">
                        {drinks.map((item, index) => (
                            <button key={index} className="item-button" onClick={() => handlePopup(item, "Drink")}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <button className="item-button" onClick={() => handlePopup("", "Drink")}>Add New Item</button>
                </section>
    
                <section className="section">
                    <h2>Seasonal</h2>
                    <div className="button-grid">
                        {seasonal.map((item, index) => (
                            <button key={index} className="item-button" onClick={() => handlePopup(item, "Seasonal")}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <button className="item-button" onClick={() => handlePopup("", "Seasonal")}>Add New Item</button>
                </section>
    
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
                                <option value="Entree">Entree</option>
                                <option value="Side">Side</option>
                                <option value="Appetizer">Appetizer</option>
                                <option value="Drink">Drink</option>
                                <option value="Seasonal">Seasonal</option>
                            </select>
                        </label>
                        <button onClick={addItem}>Add</button>
                        <button onClick={removeItem}>Remove</button>
                        <button onClick={() => setSelectedItem(null)}>Cancel</button>
                    </div>
                )}
    
                {selectedItem && <div className="overlay" onClick={() => setSelectedItem(null)} />}
            </main>
        </div>
    );    
}
