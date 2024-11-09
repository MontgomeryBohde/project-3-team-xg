"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [taxRate] = useState(0.08); //using a .8% tax rate

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);

        const foodNames = savedCart.map(item => item.name);

        fetch('/api/getPrice', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foodNames }),
        })
        .then(response => response.json())
        .then(data => {
            setPrices(data);  // The data is now an object with food_name -> item_size -> price
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching prices:', error);
            setLoading(false);
        });
    }, []);

    const subtotal = cart.reduce((total, item) => {
        const itemPrice = prices[item.name]?.[item.size]; // Access price by both name and size
        return total + (itemPrice || 0) * item.quantity;
    }, 0);

    const handleApplyPromoCode = () => {
        if (promoCode === "SAVE10") {
            setDiscount(subtotal * 0.1); // Apply 10% discount
        } else {
            alert("Invalid promo code");
            setDiscount(0);
        }
    };

    const tax = subtotal * taxRate;
    const total = subtotal - discount + tax;

    // Handle cart item quantity update
    const updateQuantity = (index, change) => {
        const updatedCart = cart.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    quantity: Math.max(1, item.quantity + change),
                };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Clear the cart
    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <div className="container">
            {/* Cart Page Content */}
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="list-group">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{item.name}</strong><br />
                                Quantity: {item.quantity}<br />
                                {loading ? (
                                    <span>Price: Loading...</span>
                                ) : (
                                    <span>Price: ${Number(prices[item.name]?.[item.size] || 0).toFixed(2)}</span>
                                )}
                                <br />
                                <span>Size: {item.size || "Not selected"}</span>
                            </div>
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(index, 1)} className="btn btn-sm btn-outline-primary">+</button>
                                <button onClick={() => updateQuantity(index, -1)} className="btn btn-sm btn-outline-secondary">-</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="summary mt-4">
                <div className="d-flex justify-content-between">
                    <p>Subtotal:</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Promo Code:</p>
                    <input 
                        type="text" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                        placeholder="Enter code" 
                        className="promo-input"
                    />
                    <button onClick={handleApplyPromoCode} className="btn btn-secondary ml-2">Apply</button>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Discount:</p>
                    <p>-${discount.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Tax:</p>
                    <p>${tax.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <h4>Total:</h4>
                    <h4>${total.toFixed(2)}</h4>
                </div>
            </div>

            <button onClick={handleClearCart} className="btn btn-danger mt-3">Clear Order</button>
            <Link href="/customer/mealselection" className="btn btn-primary mt-3">Back to Menu</Link>
            <Link href="/customer/confirm" className="btn btn-success mt-3">Confirm</Link>
        </div>
    );
};

export default CartPage;
