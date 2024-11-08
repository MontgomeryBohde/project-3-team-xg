"use client";
import React, { useState, useEffect } from "react"; // Add this import statement
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUtensils, FaShoppingCart, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift, FaTruck } from "react-icons/fa";
import Link from "next/link";
import './mealselection.css';

const MealSelectionPage = () => {
    // Define items for each category
    const entrees = [
        { name: "Beyond The Original Orange Chicken", image: "https://via.placeholder.com/150" },
        { name: "Orange Chicken", image: "https://via.placeholder.com/150" },
        { name: "Black Pepper Sirloin Steak", image: "https://via.placeholder.com/150" },
        { name: "Honey Walnut Shrimp", image: "https://via.placeholder.com/150" },
        { name: "Grilled Teriyaki Chicken", image: "https://via.placeholder.com/150" },
        { name: "Kung Pao Chicken", image: "https://via.placeholder.com/150" },
        { name: "Honey Seasame Chicken Breast", image: "https://via.placeholder.com/150" },
        { name: "Beijing Beef", image: "https://via.placeholder.com/150" },
        { name: "Mushroom Chicken", image: "https://via.placeholder.com/150" },
        { name: "SweetFire Chicken Breast", image: "https://via.placeholder.com/150" },
        { name: "String Bean Chicken Breast", image: "https://via.placeholder.com/150" },
        { name: "Broccoli Beef", image: "https://via.placeholder.com/150" },
        { name: "Black Pepper Chicken", image: "https://via.placeholder.com/150" },
        { name: "Super Greens", image: "https://via.placeholder.com/150" }
    ];

    const sides = [
        { name: "White Steamed Rice", image: "https://via.placeholder.com/150" },
        { name: "Fried Rice", image: "https://via.placeholder.com/150" },
        { name: "Chow Mein", image: "https://via.placeholder.com/150" },
        { name: "Super Greens", image: "https://via.placeholder.com/150" }
    ];

    const appetizers = [
        { name: "Bruschetta", image: "https://via.placeholder.com/150" },
        { name: "Stuffed Mushrooms", image: "https://via.placeholder.com/150" },
        { name: "Mozzarella Sticks", image: "https://via.placeholder.com/150" }
    ];

    const drinks = [
        { name: "Coke", image: "https://via.placeholder.com/150" },
        { name: "Lemonade", image: "https://via.placeholder.com/150" },
        { name: "Iced Tea", image: "https://via.placeholder.com/150" }
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

    // Initialize the cart state and load any previously saved items from localStorage
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const handleAddToCart = (mealName) => {
        // Add item to cart
        const updatedCart = [...cart, mealName];
        setCart(updatedCart);

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const renderItems = (items) => (
        items.map((item, index) => (
            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                <div className="card">
                    <img src={item.image} className="card-img-top" alt={item.name} />
                    <div className="card-body text-center">
                        <p className="card-text">{item.name}</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleAddToCart(item.name)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        ))
    );

    // Smooth scroll to section function
    const handleScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
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
                                <a className="nav-link" onClick={() => handleScrollToSection('aLaCarte')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
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
                                    <span>Deals/Rewards</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('catering')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaTruck className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Catering</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 overflow-auto" style={{ maxHeight: '100vh' }}>
                    <h2 id="meals">Meals</h2>
                    <div className="row">
                        {renderItems(entrees)}
                    </div>

                    <h2 id="aLaCarte">A La Carte</h2>
                    <div className="row">
                        {renderItems(appetizers)}
                    </div>

                    <h2 id="sides">Sides</h2>
                    <div className="row">
                        {renderItems(sides)}
                    </div>

                    <h2 id="appetizers">Appetizers</h2>
                    <div className="row">
                        {renderItems(appetizers)}
                    </div>

                    <h2 id="drinks">Drinks</h2>
                    <div className="row">
                        {renderItems(drinks)}
                    </div>

                    <h2 id="deals">Deals & Rewards</h2>
                    <div className="row">
                        {renderItems(deals)}
                    </div>

                    <h2 id="catering">Catering</h2>
                    <div className="row">
                        {renderItems(catering)}
                    </div>

                    {/* Cart Button */}
                    <div className="position-fixed bottom-0 end-0 m-3">
                        <Link href="/customer/cart" className="btn btn-primary">
                            <FaShoppingCart className="me-2" />
                            Cart ({cart.length})
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MealSelectionPage;
