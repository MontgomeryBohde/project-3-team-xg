"use client";
import React, { useState, useEffect } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUtensils, FaShoppingCart, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift, FaTruck } from "react-icons/fa";
import Link from "next/link";
import './mealselection.css';

const MealSelectionPage = () => {
    
    
    //the available items from menu to purchase
    const entrees = [
        { name: "Beyond The Original Orange Chicken", image: "/images/beyond-orange-chicken.jpg" },
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
        { name: "White Steamed Rice", image: "/images/white-steamed-rice.jpg" },
        { name: "Fried Rice", image: "/images/fried-rice.jpg" },
        { name: "Chow Mein", image: "/images/chowmein.png" },
        { name: "Super Greens", image: "/images/super-greens.jpg" }
    ];
    

    const appetizers = [
        { name: "Chicken Egg Roll", image: "https://via.placeholder.com/150" },
        { name: "Apple Pie Roll", image: "https://via.placeholder.com/150" },
        { name: "Veggie Spring Roll", image: "https://via.placeholder.com/150" },
        { name: "Cream Cheese Rangoon", image: "https://via.placeholder.com/150" }
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
        { name: "Aquafina", image: "https://via.placeholder.com/150" },
        { name: "Gatorade Lemon Lime", image: "https://via.placeholder.com/150" },
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

    //initialize cart, load items that were saved
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItemsInCart = savedCart.reduce((total, item) => total + item.quantity, 0);
        setCart(savedCart);
    }, []);

    const handleAddToCart = (mealName) => {
        const existingItem = cart.find(item => item.name === mealName);
    
    let updatedCart;
    if (existingItem) {
        //item already in cart so just increase quantity
        updatedCart = cart.map(item => 
            item.name === mealName
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        //item doesn't exist so quantity is 1
        updatedCart = [...cart, { name: mealName, quantity: 1 }];
    }

    //update and save cart
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
            <button 
                className="btn btn-primary"
                onClick={() => handleAddToCart(item.name)}
            > Add to Cart
            </button>
            </div>
        </div>
        </div>
    ))
);

    //scrolling 
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
                    <h2 id="A La Carte">A La Carte</h2>
                    <div className="row">
                        {renderItems(entrees)}
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

                    <div className="position-fixed bottom-0 end-0 m-3">
                        <Link href="/customer/cart" className="btn btn-primary">
                            <FaShoppingCart className="me-2" />
                            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MealSelectionPage;
