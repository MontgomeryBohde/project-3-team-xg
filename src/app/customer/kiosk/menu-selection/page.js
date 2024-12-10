"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { FaUtensils, FaShoppingCart, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift } from "react-icons/fa";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import RenderMenu from "@/components/ui/customer/menu-selection/RenderMenu";
import ItemModal from "@/components/ui/customer/menu-selection/ItemModal";
import MealModal from "@/components/ui/customer/menu-selection/MealModal";
import './menu-selection.css';

const MealSelectionPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [itemSizes, setItemSizes] = useState({});
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // To hold the item being added to the cart
    const [selectedSize, setSelectedSize] = useState("Small");
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [cart, setCart] = useState([]);

    const deals = [
        { name: "50 percent off", image: "/images/50per.jpg", sizeType: "special" }
    ];

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

    const handleAddToCart = (item, size) => {
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
    };

    const handleScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Head>
                <title>Customer Menu Selection</title>
            </Head>
            <CustomerHeader />
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <nav className="col-md-3 d-none d-md-block bg-light sidebar">
                        <div className="position-fixed sidebar-container p-4">
                            <ul className="nav flex-column">
                                {[
                                    { id: "meals", label: "Meals", icon: <FaUtensils className="icon me-3" /> },
                                    { id: "entree", label: "Entrées", icon: <FaDrumstickBite className="icon me-3" /> },
                                    { id: "side", label: "Sides", icon: <FaCarrot className="icon me-3" /> },
                                    { id: "appetizer", label: "Appetizers", icon: <FaConciergeBell className="icon me-3" /> },
                                    { id: "drink", label: "Drinks", icon: <FaGlassCheers className="icon me-3" /> },
                                    { id: "deal", label: "Deals", icon: <FaGift className="icon me-3" /> },
                                ].map((section, index) => (
                                    <li key={index} className="nav-item mb-3">
                                        <a
                                            className="nav-link d-flex align-items-center px-4 py-3 rounded shadow-sm fs-5"
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

                        {/* Meal Modal */}
                        {selectedMeal && (
                            <MealModal
                                mealType={selectedMeal}
                                onClose={() => setSelectedMeal(null)}
                                onConfirm={(mealData) => {
                                    console.log("Meal Data Received:", mealData); // Debugging
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
        </>
    );
};


export default MealSelectionPage;