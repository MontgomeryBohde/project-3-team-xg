"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { FaUtensils, FaShoppingCart, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift, FaTrophy } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import RenderMenu from "@/components/ui/customer/menu-selection/RenderMenu";
import ItemModal from "@/components/ui/customer/menu-selection/ItemModal";
import MealModal from "@/components/ui/customer/menu-selection/MealModal";
import './menu-selection.css';
import './menu-selection-trevor.css';

const MealSelectionPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [itemSizes, setItemSizes] = useState({});
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // To hold the item being added to the cart
    const [selectedSize, setSelectedSize] = useState("Small");
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [cart, setCart] = useState([]);
    const [player, setPlayer] = useState(null);
    const [isTrevorModeActive, setIsTrevorModeActive] = useState(false);

    const deals = [
        { name: "50 percent off", image: "/images/50per.jpg", sizeType: "special" }
    ];

    // rewards from sessionStorage
    const [rewards, setRewards] = useState();
    useEffect(() => {
        const storedRewards = JSON.parse(sessionStorage.getItem('rewards'));
        if(storedRewards){
            setRewards(storedRewards);
            console.log("stuffs: " , storedRewards);
        }
    }, []); 

    // is customer logged in
    const [custLoggedIn, setCustLoggedIn] = useState(false);
    useEffect(() => {
        const loggedInCustomer = JSON.parse(sessionStorage.getItem('loggedInCustomer'));
        if(loggedInCustomer){
            setCustLoggedIn(true);
        }
    }, []);


    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                // Fetch menu items
                const menuResponse = await fetch("/api/getMenu?type=menu");
                const menuData = await menuResponse.json();
                setMenuItems(menuData);
    
                // Fetch item sizes
                const sizes = {};
                await Promise.all(
                    menuData.map(async (item) => {
                        const sizeResponse = await fetch(`/api/getItemSizes?item_id=${item.id}`);
                        const sizeData = await sizeResponse.json();
                        sizes[item.id] = sizeData;
                    })
                );
                setItemSizes(sizes);
    
                // Fetch inventory data
                const inventoryResponse = await fetch("/api/getInventory?type=inventory");
                const inventoryData = await inventoryResponse.json();
                setInventoryData(inventoryData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchMenuData();
        const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);    

    // YouTube API
    useEffect(() => {
        // Load YouTube Iframe API
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        // Initialize YouTube Player API
        window.onYouTubeIframeAPIReady = () => {
            const playerInstance = new window.YT.Player("trevor-video-iframe", {
                videoId: "ObhmrE6FyNs",
                playerVars: {
                    autoplay: 0, // Do not autoplay initially
                    loop: 1,
                    playlist: "ObhmrE6FyNs",
                    start: 9, // Start at 10 seconds
                },
                events: {
                    onReady: () => {
                        // Set volume to 30% when ready
                        if (playerInstance) {
                            playerInstance.setVolume(50);
                        }
                    },
                },
            });

            setPlayer(playerInstance); // Set the player instance in state
        };

        return () => {
            delete window.onYouTubeIframeAPIReady;
        };
    }, []);

    const handleAddToCart = (item, size) => {
        if (size == "special") { // free bowls & other rewards
            let updatedCart;
            updatedCart = [...cart, { name: item.name, size: size, quantity: 1 }];
            setCart(updatedCart);
            sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        else {
            const selectedSize = size || "Small";
            const existingItem = cart.find(cartItem => cartItem.name === item.item_name && cartItem.size === selectedSize);

            let updatedCart;
            if (existingItem) {
                updatedCart = cart.map(cartItem =>
                    cartItem.name === item.item_name && cartItem.size === selectedSize
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCart = [...cart, { name: item.item_name, size: selectedSize, quantity: 1 }];
            }

            setCart(updatedCart);
            sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        }  
    };

    const handleScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Trevor Mode
    const showTrevorToast = () => {
        const toast = document.createElement("div");
        toast.innerText = isTrevorModeActive ? "Trevor Mode Deactivated 🚫" : "Trevor Mode Activated 🕶️";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.backgroundColor = "#ff4500";
        toast.style.color = "#fff";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "5px";
        toast.style.zIndex = "1000";
        toast.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
        toast.style.fontFamily = "Comic Sans MS, cursive";
        toast.style.animation = "fade-out 3s forwards";
    
        document.body.appendChild(toast);
    
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    };

    const playHoverSound = () => {
        const boomSound = new Audio("/sounds/vine-boom.mp3");
        boomSound.volume = 0.2;
    
        try {
            boomSound.play();
        } catch (error) {
            console.error("Audio playback failed:", error);
        }
    };
    
    const toggleTrevorMode = () => {
        const newState = !isTrevorModeActive;
        setIsTrevorModeActive(newState);
        sessionStorage.setItem("trevorModeActive", newState ? "true" : "false");
    
        // Play sound effect on toggle (user interaction guarantees playback)
        const sound = new Audio('/sounds/OOF.mp3');
        sound.volume = 0.2;
    
        try {
            sound.play();
        } catch (error) {
            console.error("Audio playback failed:", error);
        }
    
        // Show toast notification
        showTrevorToast();

        // Update the video iframe source
        if (player) {
            if (newState) {
                player.playVideo(); // Play the video when Trevor Mode is active
            } else {
                player.stopVideo(); // Stop the video when Trevor Mode is inactive
            }
        }
    };
    
    return (
        <div>
            <CustomerHeader />
            <div className={`container-fluid ${isTrevorModeActive ? "trevor-mode" : ""}`}>
                <Head>
                    <title>Customer Menu Selection</title>
                </Head>
                
                <div className="container-fluid">
                    <div className="row">
                        {/* Sidebar */}
                        <nav className="col-md-3 d-none d-md-block bg-light sidebar">
                            <div className="position-fixed sidebar-container pt-4">
                                <ul className="nav flex-column">
                                    {[
                                        { id: "meals", label: "Meals", icon: <FaUtensils className="icon me-3" /> },
                                        { id: "entree", label: "Entrées", icon: <FaDrumstickBite className="icon me-3" /> },
                                        { id: "side", label: "Sides", icon: <FaCarrot className="icon me-3" /> },
                                        { id: "appetizer", label: "Appetizers", icon: <FaConciergeBell className="icon me-3" /> },
                                        { id: "drink", label: "Drinks", icon: <FaGlassCheers className="icon me-3" /> },
                                        { id: "deal", label: "Deals", icon: <FaGift className="icon me-3" /> },
                                        { id: "rewards", label: "Rewards", icon: <FaTrophy className="icon me-3" /> },
                                    ].map((section, index) => (
                                        <li key={index} className="nav-item mb-3">
                                                <a
                                                    className="nav-link d-flex align-items-center px-4 py-3 rounded shadow-sm fs-5"
                                                    onMouseEnter={isTrevorModeActive ? playHoverSound : undefined}
                                                    onClick={() => handleScrollToSection(section.id)}
                                                    style={{
                                                        cursor: "pointer",
                                                        transition: "background-color 0.3s ease, color 0.3s ease",
                                                    }}
                                                >
                                                    {section.icon}
                                                    <span>{section.label}</span>
                                                </a>
                                            </li>
                                        ))}
                                        {/* View Cart */}
                                        <li className="nav-item mt-4">
                                            <Link href="/customer/kiosk/cart">
                                                <span
                                                    className="nav-link text-danger d-flex align-items-center px-4 py-3 rounded shadow-sm fs-5"
                                                    style={{
                                                        backgroundColor: "#fff5f5",
                                                        transition: "background-color 0.3s ease, color 0.3s ease",
                                                    }}
                                                >
                                                    <FaShoppingCart className="icon me-3" />
                                                    View Cart {cart.length > 0 && `(${cart.length})`}
                                                </span>
                                            </Link>
                                        </li>

                                        {/* Trevor Mode Toggle */}
                                        <li className="nav-item mt-4">
                                            <button
                                                className={`btn ${isTrevorModeActive ? "btn-danger" : "btn-warning"} d-flex align-items-center px-4 py-3 rounded shadow-sm fs-5`}
                                                onClick={toggleTrevorMode}
                                                style={{
                                                    backgroundColor: isTrevorModeActive ? "#ff4d4d" : "#ffd54f",
                                                    transition: "transform 0.2s ease, background-color 0.3s ease",
                                                }}
                                            >
                                                <FiAlertTriangle className="icon me-3"/> {isTrevorModeActive ? "Deactivate" : "Trevor Mode"}
                                            </button>
                                        </li>
                                </ul>
                            </div>
                        </nav>

                        {/* Main Content */}
                        <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">

                            {/* Meals Section */}
                            <section id="meals" className="py-3">
                                <h2>Meals</h2>
                                <div className="row g-3">
                                    {["Bowl", "Plate", "Bigger Plate", "Cub Meal", "Family Meal"].map((meal, index) => (
                                        <div key={index} className="col-6 col-md-4">
                                            <button
                                                className="btn btn-outline-dark w-100 meal-button py-3"
                                                onClick={() => setSelectedMeal(meal)}
                                            >
                                                {meal}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Subway Surfer Section */}
                            <div id="trevor-video" className={`trevor-video ${isTrevorModeActive ? "active" : ""}`}>
                                <div id="trevor-video-iframe"></div>
                            </div>

                            {/* Meal Modal */}
                            {selectedMeal && (
                                <MealModal
                                    mealType={selectedMeal}
                                    onClose={() => setSelectedMeal(null)}
                                    onConfirm={(mealData) => {
                                        const updatedCart = [...cart, mealData];
                                        setCart(updatedCart); // Update the cart state
                                        sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to sessionStorage
                                        setSelectedMeal(null); // Close the modal
                                    }}
                                />
                            )}

                            {/* RenderMenu grouped by category */}
                            {Object.entries(
                                menuItems.reduce((groups, item) => {
                                    if (!groups[item.category]) {
                                        groups[item.category] = [];
                                    }
                                    groups[item.category].push(item);
                                    return groups;
                                }, {})
                            ).map(([category, items], index) => (
                                <section
                                    key={index}
                                    id={category.toLowerCase().replace(/\s+/g, "-")}
                                    className="py-3"
                                >
                                    <h2>{category}</h2>
                                    <div className="row">
                                        <RenderMenu
                                            menuItems={items} // Pass only items in this category
                                            itemSizes={itemSizes}
                                            inventoryData={inventoryData}
                                            setSelectedItem={setSelectedItem}
                                        />
                                    </div>
                                </section>
                            ))}

                            {/* Deals Section */}
                            <section id="deal" className="py-3">
                                <h2>Deals</h2>
                                <div className="row">
                                    {deals.map((deal, index) => (
                                        <div key={index} className="col-6 col-md-4 col-lg-3 mb-3">
                                            <div className="card">
                                                <img
                                                    src={deal.image}
                                                    className="card-img-top img-fluid"
                                                    alt={deal.name}
                                                />
                                                <div className="card-body text-center">
                                                    <p className="card-text">{deal.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Rewards Section */}
                            <section id="deal" className="py-3">
                                <h2>Rewards</h2>
                                {custLoggedIn ? (
                                    rewards && rewards.length > 0 ? (
                                        <div className="py-3" id="rewards">
                                            <div className="row">
                                                {rewards.map((reward, index) => (
                                                    <div key={index} className="col-6 col-md-4 col-lg-3 mb-3">
                                                        <div className="card">
                                                            <img
                                                                src={reward.image}
                                                                className="card-img-top img-fluid"
                                                                alt={reward.name}
                                                            />
                                                            <div className="card-body text-center">
                                                                <p className="card-text">{reward.name}</p>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleAddToCart(reward, "special")}
                                                                >
                                                                    Add to Cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-3" id="rewards">
                                            <p>You have not claimed any rewards yet.</p>
                                        </div>
                                    )
                                ) : (
                                    <div className="py-3" id="rewards">
                                        <p>You have not claimed any rewards yet.</p>
                                    </div>
                                )}

                            </section>

                        </main>
                    </div>
                </div>

                {/* Item Modal */}
                {selectedItem && (
                    <ItemModal
                        item={selectedItem}
                        sizes={itemSizes[selectedItem.id] || []}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        onClose={() => setSelectedItem(null)}
                        onAdd={handleAddToCart}
                    />
                )}
            </div>
        </div>
    );
};


export default MealSelectionPage;