"use client";
// pages/cart.js
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Get cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    return (
        <div className="container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="list-group">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
            <Link href="/" className="btn btn-primary mt-3">Continue Shopping</Link>
            <button className="btn btn-success mt-3" onClick={() => alert("Proceeding to Checkout")}>Proceed to Checkout</button>
        </div>
    );
};

export default CartPage;
