"use client";
import React, { useState, useEffect } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUtensils, FaShoppingCart, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift, FaTruck } from "react-icons/fa";
import Link from "next/link";
import './mealselection.css';

const MealSelectionPage = () => {
    
    const entrees = [
        { name: "Beyond The Original Orange Chicken", image: "/images/beyond-orange-chicken.jpg"},
        { name: "The Original Orange Chicken", image: "/images/orange-chicken.jpg" },
        { name: "Black Pepper Sirloin Steak", image: "/images/black-pepper-sirloin.jpg" },
        { name: "Honey Walnut Shrimp", image: "/images/honey-walnut-shrimp.jpg" },
        { name: "Grilled Teriyaki Chicken", image: "/images/grilled-teriyaki-chicken.jpg" },
        { name: "Kung Pao Chicken", image: "/images/kung-pao-chicken.jpg" },
        { name: "Honey Sesame Chicken Breast", image: "/images/honey-sesame-chicken-breast.jpg" },
        { name: "Broccoli Beef", image: "/images/beijing-beef.jpg" },
        { name: "Mushroom Chicken", image: "/images/mushroom-chicken.jpg" },
        { name: "SweetFire Chicken Breast", image: "/images/sweetfire-chicken-breast.jpg" },
        { name: "String Bean Chicken Breast", image: "/images/string-bean-chicken-breast.jpg" },
        { name: "Broccoli Beef", image: "/images/broccoli-beef.jpg" },
        { name: "Super Greens", image: "/images/super-greens.jpg" }
    ];

    const sides = [
        { name: "White Steamed Rice", image: "/images/white-steamed-rice.jpg", sizeType: "side"  },
        { name: "Fried Rice", image: "/images/fried-rice.jpg", sizeType: "side"   },
        { name: "Chow Mein", image: "/images/chowmein.png", sizeType: "side"   },
        { name: "Super Greens", image: "/images/super-greens.jpg" , sizeType: "side"  }
    ];

    const appetizers = [
        { name: "Chicken Egg Roll", image: "https://via.placeholder.com/150" , sizeType: "side"  },
        { name: "Apple Pie Roll", image: "https://via.placeholder.com/150" , sizeType: "side"  },
        { name: "Veggie Spring Roll", image: "https://via.placeholder.com/150", sizeType: "side"   },
        { name: "Cream Cheese Rangoon", image: "https://via.placeholder.com/150", sizeType: "side"   }
    ];

    const drinks = [
        { name: "Dr Pepper", image: "https://via.placeholder.com/150" },
        { name: "Sweet Tea", image: "https://via.placeholder.com/150" },
        { name: "Diet Pepsi", image: "https://via.placeholder.com/150" },
        { name: "Pepsi", image: "https://via.placeholder.com/150" },
        { name: "Mountain Dew", image: "https://via.placeholder.com/150" },
        { name: "Lipton Brisk Raspberry Iced Tea", image: "https://via.placeholder.com/150" },
        { name: "Sierra Mist", image: "https://via.placeholder.com/150" },
        { name: "Tropicana Lemonade", image: "https://via.placeholder.com/150" },
        { name: "Aquafina", image: "https://via.placeholder.com/150", sizeType: "mediumOnly" },
        { name: "Gatorade Lemon Lime", image: "https://via.placeholder.com/150", sizeType: "mediumOnly" }
    ];

    const deals = [
        { name: "Buy One Get One Free", image: "https://via.placeholder.com/150" },
        { name: "20% Off", image: "https://via.placeholder.com/150" },
        { name: "Free Drink with Meal", image: "https://via.placeholder.com/150" }
    ];

    const catering = [
        { name: "Party Platter", image: "https://via.placeholder.com/150" },
        { name: "Catering Package A", image: "https://via.placeholder.com/150" },
        { name: "Buffet Setup", image: "https://via.placeholder.com/150" }
    ];

    const [cart, setCart] = useState([]);
    const [selectedSize, setSelectedSize] = useState({});

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const handleSizeChange = (mealName, size, isSide) => {
        if (isSide) {
            // Only allow Medium and Large for sides
            setSelectedSize(prevSize => ({ ...prevSize, [mealName]: size }));
        } else {
            // For entrees, allow Small, Medium, and Large
            setSelectedSize(prevSize => ({ ...prevSize, [mealName]: size }));
        }
    };

    const handleAddToCart = (mealName, items) => {
        // Get the item details (assuming mealName is unique or you can fetch details based on it)
        const item = items.find((item) => item.name === mealName);
        
        // Determine the default size based on item type
        const defaultSize = item?.sizeType === "mediumOnly"
            ? "Medium"
            : item?.sizeType === "side"
            ? "Medium"
            : "Small"; // Default to "Small" for regular items
    
        // Get the selected size, default to the determined default size
        const size = selectedSize[mealName] || defaultSize; // Ensure selectedSize is available
        const existingItem = cart.find(item => item.name === mealName && item.size === size);
    
        let updatedCart;
        if (existingItem) {
            // If the item already exists in the cart, increase the quantity
            updatedCart = cart.map(item => 
                item.name === mealName && item.size === size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // Otherwise, add a new item to the cart
            updatedCart = [...cart, { name: mealName, size: size, quantity: 1 }];
        }
    
        // Update the cart state and save to localStorage
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    

    const renderItems = (items) => (
        items.map((item, index) => (
            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                <div className="card">
                    <img 
                        src={item.image} 
                        className="card-img-top" 
                        alt={item.name} 
                        style={{ width: '365px', height: '200px', objectFit: 'cover' }} 
                    />
                    <div className="card-body text-center">
                        <p className="card-text">{item.name}</p>
                        <select 
                            className="form-select mb-2"
                            onChange={(e) => handleSizeChange(item.name, e.target.value)}
                        >
                            {item.sizeType === "mediumOnly" ? (
                                // Show only Medium for medium-only items
                                <option value="Medium">Medium</option>
                            ) : item.sizeType === "side" ? (
                                // Show only Medium and Large for sides
                                <>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </>
                            ) : (
                                // Show Small, Medium, and Large for regular items
                                <>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </>
                            )}
                        </select>
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleAddToCart(item.name,items)}
                        > 
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        ))
    );
    

    const handleScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{ height: '100vh', fontSize: '1.5rem' }}>
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" onClick={() => handleScrollToSection('meals')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaUtensils className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Meals</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('A La Carte')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaDrumstickBite className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>A La Carte</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('sides')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaCarrot className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Sides</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('appetizers')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaConciergeBell className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Appetizers</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('drinks')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaGlassCheers className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Drinks</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('deals')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaGift className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Deals</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('catering')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaTruck className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Catering</span>
                                </a>
                            </li>
                            <li className="nav-item">
                            <Link href="/customer/cart">
                                <span style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaShoppingCart className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>View Cart</span>
                                </span>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
                    <div className="py-3" id="meals">
                        <h2>Entrees</h2>
                        <div className="row">
                            {renderItems(entrees)}
                        </div>
                    </div>
                    <div className="py-3" id="sides">
                        <h2>Sides</h2>
                        <div className="row">
                            {renderItems(sides,"side")} {/*Send true that this is a side so it only shows med and large */}
                        </div>
                    </div>
                    <div className="py-3" id="appetizers">
                        <h2>Appetizers</h2>
                        <div className="row">
                            {renderItems(appetizers,"side")} {/*Send true that this is a app so it only shows med and large */}
                        </div>
                    </div>
                    <div className="py-3" id="drinks">
                        <h2>Drinks</h2>
                        <div className="row">
                            {renderItems(drinks)}
                        </div>
                    </div>
                    <div className="py-3" id="deals">
                        <h2>Deals</h2>
                        <div className="row">
                            {renderItems(deals)}
                        </div>
                    </div>
                    <div className="py-3" id="catering">
                        <h2>Catering</h2>
                        <div className="row">
                            {renderItems(catering)}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MealSelectionPage;
