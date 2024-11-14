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
    const [taxRate] = useState(0.08); 

    //Catering prices (hardcoded)
    const specialDealPrices = {
        "Party Size Side": 16.00,
        "12-16 Person Party Bundle": 108.00,
        "18-22 Person Party Bundle": 154.00,
        "26-30 Person Party Bundle": 194.00
    };

   //50% off deal
    const isFiftyPercentOff = cart.some(item => item.name.toLowerCase().includes("50 percent off"));

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
            setPrices(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching prices:', error);
            setLoading(false);
        });
    }, []);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => {
            
            const itemPrice = prices[item.name]?.[item.size] || specialDealPrices[item.name] || 0;
            return total + (itemPrice * item.quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();

    const handleApplyPromoCode = () => {
        if (promoCode === "SAVE10") {
            setDiscount(subtotal * 0.1); 
        } else {
            alert("Invalid promo code");
            setDiscount(0);
        }
    };

    const automaticDiscount = isFiftyPercentOff ? subtotal * 0.5 : 0;

    //taxes and total calculation
    const tax = subtotal * taxRate;
    const total = subtotal - discount - automaticDiscount + tax;

    //can update the quanitity in the cart 
    const updateQuantity = (index, change) => {
        const updatedCart = cart.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    quantity: Math.max(1, item.quantity + change), // ensure quantity is at least 1
                };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    //remove item from cart button
    const removeItemFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index); // Remove item by index
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    //clear cart button
    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Your Cart</h1>

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
                                    <span>Price: ${specialDealPrices[item.name] 
                                        ? (specialDealPrices[item.name] * item.quantity).toFixed(2) 
                                        : (Number(prices[item.name]?.[item.size] || 0) * item.quantity).toFixed(2)}
                                    </span>
                                )}
                                <br />
                                <span>Size: {item.size || "N/A"}</span>
                            </div>
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(index, 1)} className="btn btn-sm btn-outline-primary">+</button>
                                <button onClick={() => updateQuantity(index, -1)} className="btn btn-sm btn-outline-secondary">-</button>
                                <button onClick={() => removeItemFromCart(index)} className="btn btn-sm btn-danger ml-2">Remove</button>
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
                {isFiftyPercentOff && (
                    <div className="d-flex justify-content-between">
                        <p>Automatic 50% Off:</p>
                        <p>-${automaticDiscount.toFixed(2)}</p>
                    </div>
                )}
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
            <Link href="/customer/menuselection" className="btn btn-primary mt-3">Back to Menu</Link>
            <Link href="/customer/confirm" className="btn btn-success mt-3">Confirm</Link>
        </div>
    );
};

export default CartPage;
