"use client";
import React, { useState, useEffect } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUtensils, FaShoppingCart, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift, FaTruck } from "react-icons/fa";
import Link from "next/link";
import './menuselection.css';

const MealSelectionPage = () => {
    
    const entrees = [
        { name: "Beyond The Original Orange Chicken", image: "/images/beyond-orange-chicken.jpg"},
        { name: "The Original Orange Chicken", image: "/images/orange-chicken.jpg" },
        { name: "Black Pepper Sirloin Steak", image: "/images/black-pepper-sirloin.jpg" },
        { name: "Honey Walnut Shrimp", image: "/images/honey-walnut-shrimp.jpg" },
        { name: "Grilled Teriyaki Chicken", image: "/images/grilled-teriyaki-chicken.jpg" },
        { name: "Kung Pao Chicken", image: "/images/kung-pao-chicken.jpg" },
        { name: "Honey Sesame Chicken Breast", image: "/images/honey-sesame-chicken-breast.jpg" },
        { name: "Mushroom Chicken", image: "/images/mushroom-chicken.jpg" },
        { name: "SweetFire Chicken Breast", image: "/images/sweetfire-chicken-breast.jpg" },
        { name: "String Bean Chicken Breast", image: "/images/string-bean-chicken-breast.jpg" },
        { name: "Broccoli Beef", image: "/images/broccoli-beef.jpg" },
    ];

    const sides = [
        { name: "White Steamed Rice", image: "/images/white-steamed-rice.jpg", sizeType: "side"  },
        { name: "Fried Rice", image: "/images/fried-rice.jpg", sizeType: "side"   },
        { name: "Chow Mein", image: "/images/chowmein.jpg", sizeType: "side"   },
        { name: "Super Greens", image: "/images/super-greens.jpg" , sizeType: "side"  }
    ];

    const appetizers = [
        { name: "Chicken Egg Roll", image: "/images/chicken-egg-roll.jpg" , sizeType: "app"  },
        { name: "Apple Pie Roll", image: "/images/apple-pie.jpg"  },
        { name: "Veggie Spring Roll", image: "/images/veggie-spring.jpg", sizeType: "app"   },
        { name: "Cream Cheese Rangoon", image: "/images/cream-cheese.jpg", sizeType: "app"   }
    ];

    const drinks = [
        { name: "Dr Pepper", image: "/images/dr_pepper.jpg" },
        { name: "Sweet Tea", image: "/images/sweet_tea.jpg" },
        { name: "Diet Pepsi", image: "/images/diet_pepsi.jpg" },
        { name: "Pepsi", image: "/images/pepsi.jpg" },
        { name: "Mountain Dew", image: "/images/mountain_dew.jpg" },
        { name: "Lipton Brisk Raspberry Iced Tea", image: "/images/lipton_brisk_raspberry_iced_tea.jpg" },
        { name: "Sierra Mist", image: "/images/sierra_mist.jpg" },
        { name: "Tropicana Lemonade", image: "/images/tropicana_lemonade.jpg" },
        { name: "Aquafina", image: "/images/aquafina.jpg", sizeType: "mediumOnly" },
        { name: "Gatorade Lemon Lime", image: "/images/gatorade_lemon_lime.jpg", sizeType: "mediumOnly" }
    ];

    const deals = [
        { name: "50 percent off", image: "/images/50per.jpg", sizeType: "special" }
    ];

    const catering = [
        { name: "Party Size Side", image: "/images/party_size_side.jpg", sizeType: "special" },
        { name: "12-16 Person Party Bundle", image: "/images/12_16_person_party_bundle.jpg", sizeType: "special" },
        { name: "18-22 Person Party Bundle", image: "/images/12_16_person_party_bundle.jpg", sizeType: "special" },
        { name: "26-30 Person Party Bundle", image: "/images/12_16_person_party_bundle.jpg", sizeType: "special" }
    ];

    const [cart, setCart] = useState([]);
    const [selectedSize, setSelectedSize] = useState({});

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const handleSizeChange = (mealName, size, isSide) => {
        if (isSide) {
            //meidium and large only
            setSelectedSize(prevSize => ({ ...prevSize, [mealName]: size }));
        } else {
            //all sizes (regular)
            setSelectedSize(prevSize => ({ ...prevSize, [mealName]: size }));
        }
    };

    const handleAddToCart = (mealName, items) => {
   
    const item = items.find((item) => item.name === mealName);
    const defaultSize = item?.sizeType === "special" ? null : item?.sizeType === "mediumOnly"
        ? "Medium"
        : item?.sizeType === "side"
        ? "Medium"
        : "Small"; //for regular items the default is small

    
    const size = selectedSize[mealName] || defaultSize;
    const existingItem = cart.find(item => item.name === mealName && item.size === size);

    let updatedCart;
    if (existingItem) {
        //if item already exists in the cart, increase the quantity
        updatedCart = cart.map(item => 
            item.name === mealName && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        //else just add new item
        updatedCart = [...cart, { name: mealName, size: size, quantity: 1 }];
    }

    //update cart and save to localStorage
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

                    {item.sizeType !== "special" && (
                        <select 
                            className="form-select mb-2"
                            onChange={(e) => handleSizeChange(item.name, e.target.value)}
                        >
                            {item.sizeType === "mediumOnly" ? (
    
                                <option value="Medium">Medium</option>
                            ) : item.sizeType === "side" ? (
                               
                                <>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </>
                            ) 
                            : item.sizeType === "app" ? (     
                                <>
                                    <option value="Small">Small</option>
                                    <option value="Large">Large</option>
                                </>
                                ): (
                                <>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </>
                            )}
                        </select>
                    )}

                    <button 
                        className="btn btn-danger"
                        onClick={() => handleAddToCart(item.name, items)}
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
                                <FaShoppingCart className="me-2" style={{ fontSize: '2rem', color: 'red' }} />
                                <span style={{ color: 'red' }}>View Cart</span>
                            </span>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
                <div className="py-3" id="Meals">
                    <h2>Meals</h2>
                    <h3>Choose Your Meal</h3>
                    <div className="row mb-4">
                        <div className="col-4">
                            <Link href="PLACEHOLD">
                                <button className="btn btn-outline-dark  w-100" style={{ height: '100px', borderRadius: '5px' }}>
                                    Bowl
                                </button>
                            </Link>
                        </div>
                        <div className="col-4">
                            <Link href="PLACEHOLD">
                                <button className="btn btn-outline-dark  w-100" style={{ height: '100px', borderRadius: '5px' }}>
                                    Plate
                                </button>
                            </Link>
                        </div>
                        <div className="col-4">
                            <Link href="PLACEHOLD">
                                <button className="btn btn-outline-dark  w-100" style={{ height: '100px', borderRadius: '5px' }}>
                                    Bigger Plate
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                    <div className="py-3" id="A La Carte">
                        <h2>A La Carte</h2>
                        <div className="row">
                            {renderItems(entrees)}
                        </div>
                    </div>
                    <div className="py-3" id="sides">
                        <h2>Sides</h2>
                        <div className="row">
                            {renderItems(sides, "side")} {/*Send true that this is a side so it only shows med and large */}
                        </div>
                    </div>
                    <div className="py-3" id="appetizers">
                        <h2>Appetizers</h2>
                        <div className="row">
                            {renderItems(appetizers, "side")} {/*Send true that this is an app so it only shows small and large */}
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
