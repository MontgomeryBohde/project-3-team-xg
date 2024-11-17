'use client';

import { useState } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';

const Menu = () => {
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
    const [inventoryIds, setInventoryIds] = useState([]);
    const [itemPrice, setItemPrice] = useState(3.00);

    const inventoryItems = [
        { id: 45, name: 'Chopsticks' },
        { id: 46, name: 'Bowl Lids' },
        { id: 47, name: 'Drink Lids' },
        { id: 48, name: 'Cups' },
        { id: 49, name: 'Plates' },
        { id: 50, name: 'Napkins' },
        { id: 51, name: 'Bowls' },
        { id: 52, name: 'Spoons' },
        { id: 53, name: 'Forks' },
        { id: 54, name: 'Straws' },
        { id: 2, name: 'Veggie Spring Roll' },
        { id: 3, name: 'Cream Cheese Rangoon' },
        { id: 4, name: 'Apple Pie Roll' },
        { id: 6, name: 'Chicken' },
        { id: 7, name: 'Beyond Meat Chicken' },
        { id: 8, name: 'Beef' },
        { id: 9, name: 'Shrimp' },
        { id: 10, name: 'Broccoli' },
        { id: 11, name: 'Cucumber' },
        { id: 12, name: 'Peas' },
        { id: 13, name: 'Tomato' },
        { id: 14, name: 'Onion' },
        { id: 15, name: 'Chili Pepper' },
        { id: 16, name: 'Red Peppers' },
        { id: 17, name: 'Green Peppers' },
        { id: 18, name: 'Mushrooms' },
        { id: 19, name: 'String Beans' },
        { id: 20, name: 'Scallion' },
        { id: 21, name: 'Kale' },
        { id: 22, name: 'Celery' },
        { id: 23, name: 'Pineapple' },
        { id: 24, name: 'Oil' },
        { id: 25, name: 'Noodles' },
        { id: 26, name: 'Rice' },
        { id: 27, name: 'Egg' },
        { id: 28, name: 'Honey' },
        { id: 29, name: 'Walnuts' },
        { id: 30, name: 'Sesame Seeds' },
        { id: 31, name: 'Tofu' },
        { id: 32, name: 'Seasoning Sauce' },
        { id: 33, name: 'Black Pepper' },
        { id: 34, name: 'Peanuts' },
        { id: 35, name: 'Diet Pepsi' },
        { id: 36, name: 'Mountain Dew' },
        { id: 37, name: 'Lipton Brisk Raspberry Iced' },
        { id: 38, name: 'Sierra Mist' },
        { id: 39, name: 'Tropicana Lemonade' },
        { id: 40, name: 'Aquafina' },
        { id: 41, name: 'Gatorade Lemon Lime' },
        { id: 42, name: 'Dr Pepper' },
        { id: 43, name: 'Sweet Tea' },
        { id: 44, name: 'Pepsi' },
        { id: 5, name: 'Breaded Chicken' },
        { id: 1, name: 'Chicken Egg Roll' }
      ];

      const handleInventoryChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setInventoryIds(selectedOptions); // Set selected item names in inventoryIds
      };
      
    const handlePopup = (name, category, index = null) => {
        setItemName(name);
        setItemCategory(category);
        setSelectedItem({ name, category, index });
    };

    const handleNavigation = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const addItem = () => {
        // Log selectedItem and itemCategory for debugging
        console.log("selectedItem:", selectedItem);
        console.log("itemCategory:", itemCategory);
    
        // Check if an item is selected for editing
        if (selectedItem && selectedItem.index !== null) {
            // If selectedItem exists and has a valid index
            const { name, category, index } = selectedItem;
            switch (category) {
                case 'Entree':
                    setEntrees((prev) => {
                        const updated = prev.map((item, i) => (i === index ? itemName : item));
                        console.log("Updated Entrees after editing:", updated);  // Log the updated state
                        return updated;
                    });
                    break;
                case 'Side':
                    setSides((prev) => prev.map((item, i) => (i === index ? itemName : item)));
                    break;
                case 'Appetizer':
                    setAppetizers((prev) => prev.map((item, i) => (i === index ? itemName : item)));
                    break;
                case 'Drink':
                    setDrinks((prev) => prev.map((item, i) => (i === index ? itemName : item)));
                    break;
                case 'Seasonal':
                    setSeasonal((prev) => prev.map((item, i) => (i === index ? itemName : item)));
                    break;
                default:
                    break;
            }
        } else {
            // If no item is selected, add a new item
            switch (itemCategory) {
                case 'Entree':
                    setEntrees((prev) => {
                        const updated = [...prev, itemName];
                        console.log("Updated Entrees after adding new item:", updated);  // Log the updated state
                        return updated;
                    });
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
            // Reset selectedItem to ensure it's ready for the next addition
            resetFields(); // Reset fields to clear form inputs and selectedItem state
        }
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
        resetFields();
    };

    const resetFields = () => {
        setSelectedItem(null);
        setItemName('');
        setItemSize('Medium');
        setItemCategory('Entree');
        setInventoryIds([]);
        setItemPrice(3.00);
    };

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
                            {entrees.map((item, index) => (
                                <div key={index} className="col-md-3 mb-3">
                                    <button
                                        className="btn btn-outline-primary w-100 btn-lg"
                                        onClick={() => handlePopup(item, "Entree", index)}
                                    >
                                        {item}
                                    </button>
                                </div>
                            ))}

                                <div className="col-md-3 mb-3">
                                    <button className="btn btn-outline-success w-100 btn-lg" onClick={() => handlePopup("", "Entree")}>Add New Item</button>
                                </div>
                            </div>
                        </section>

                        <section id="sides" className="mb-5">
                            <h2 className="text-center">Sides</h2>
                            <div className="row">
                                {sides.map((item, index) => (
                                    <div key={index} className="col-md-3 mb-3">
                                        <button className="btn btn-outline-primary w-100 btn-lg" onClick={() => handlePopup(item, "Side")}>{item}</button>
                                    </div>
                                ))}
                                <div className="col-md-3 mb-3">
                                    <button className="btn btn-outline-success w-100 btn-lg" onClick={() => handlePopup("", "Side")}>Add New Item</button>
                                </div>
                            </div>
                        </section>

                        <section id="appetizers" className="mb-5">
                            <h2 className="text-center">Appetizers</h2>
                            <div className="row">
                                {appetizers.map((item, index) => (
                                    <div key={index} className="col-md-3 mb-3">
                                        <button className="btn btn-outline-primary w-100 btn-lg" onClick={() => handlePopup(item, "Appetizer")}>{item}</button>
                                    </div>
                                ))}
                                <div className="col-md-3 mb-3">
                                    <button className="btn btn-outline-success w-100 btn-lg" onClick={() => handlePopup("", "Appetizer")}>Add New Item</button>
                                </div>
                            </div>
                        </section>

                        <section id="drinks" className="mb-5">
                            <h2 className="text-center">Drinks</h2>
                            <div className="row">
                                {drinks.map((item, index) => (
                                    <div key={index} className="col-md-3 mb-3">
                                        <button className="btn btn-outline-primary w-100 btn-lg" onClick={() => handlePopup(item, "Drink")}>{item}</button>
                                    </div>
                                ))}
                                <div className="col-md-3 mb-3">
                                    <button className="btn btn-outline-success w-100 btn-lg" onClick={() => handlePopup("", "Drink")}>Add New Item</button>
                                </div>
                            </div>
                        </section>

                        <section id="seasonal" className="mb-5">
                            <h2 className="text-center">Seasonal</h2>
                            <div className="row">
                                {seasonal.map((item, index) => (
                                    <div key={index} className="col-md-3 mb-3">
                                        <button className="btn btn-outline-primary w-100 btn-lg" onClick={() => handlePopup(item, "Seasonal")}>{item}</button>
                                    </div>
                                ))}
                                <div className="col-md-3 mb-3">
                                    <button className="btn btn-outline-success w-100 btn-lg" onClick={() => handlePopup("", "Seasonal")}>Add New Item</button>
                                </div>
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Size:</label>
                                    <select
                                        className="form-select"
                                        value={itemSize}
                                        onChange={(e) => setItemSize(e.target.value)}
                                    >
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                    </select>
                                </div>
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
                                <div className="mb-3">
                                    <label className="form-label">Inventory Item IDs:</label>
                                    <select
                                        className="form-select"
                                        value={inventoryIds} // Ensure value is an array
                                        onChange={handleInventoryChange}
                                        multiple // Enable multiple selection
                                    >
                                        {inventoryItems.map(item => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={itemPrice}
                                        onChange={(e) => setItemPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success btn-lg" onClick={addItem}>
                                    Add
                                </button>
                                <button type="button" className="btn btn-danger btn-lg" onClick={removeItem}>
                                    Remove
                                </button>
                                <button type="button" className="btn btn-secondary btn-lg" onClick={() => setSelectedItem(null)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Menu;