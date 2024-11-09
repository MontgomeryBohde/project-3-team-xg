"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    
        const foodNames = savedCart.map(item => item.name);
    
        // Log the food names to debug
        console.log("Sending food names:", foodNames);  // Add this line
    
        // Fetch prices for food items
        fetch('/api/getPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foodNames }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Fetched prices:", data);  // Log the fetched prices
            setPrices(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching prices:', error);
            setLoading(false);  // Stop loading even if there's an error
        });
    }, []);

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Calculate the total price of items in the cart
    const totalPrice = cart.reduce((total, item) => total + (prices[item.name] || 0) * item.quantity, 0);

    return (
        <div className="container">
            <h2>Your Cart</h2>
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
                                    <span>Price: ${prices[item.name] || 'Not available'}</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="d-flex justify-content-between mt-3">
                <h4>Total Quantity: {totalQuantity}</h4>
                <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            </div>
            <Link href="/" className="btn btn-primary mt-3">Continue Shopping</Link>
            <button className="btn btn-success mt-3" onClick={() => alert("Proceeding to Checkout")}>Proceed to Checkout</button>
        </div>
    );
};

export default CartPage;
