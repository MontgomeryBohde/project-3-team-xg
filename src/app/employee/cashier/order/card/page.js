// src/app/employee/cashier/order/confirmation/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DiscountPopUp from '@/components/ui/employee/cashier/order/confirmation/DiscountPopUp';
import PaymentPopUp from '@/components/ui/employee/cashier/order/confirmation/PaymentPopUp';
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

/**
 * @file Confirmation page component for the cashier order system
 * @module ConfirmationPage
 */

/**
 * @typedef {Object} CartItem
 * @property {number} price - The price of the item
 * @property {number} quantity - The quantity of the item
 */

/**
 * Confirmation page component that handles order details, discounts, and payment processing
 * @component
 * @returns {JSX.Element} The rendered confirmation page component
 */
const ConfirmationPage = () => {
    /** @type {[CartItem[], function]} State for storing cart items */
    const [cartItems, setCartItems] = useState([]);
    /** @type {[number, function]} State for storing discount percentage */
    const [discount, setDiscount] = useState(0);
    /** @type {[boolean, function]} State for tax exemption status */
    const [taxExempt, setTaxExempt] = useState(false);
    /** @type {[boolean, function]} State for controlling payment popup visibility */
    const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
    /** @type {[boolean, function]} State for controlling discount popup visibility */
    const [showDiscountPopUp, setShowDiscountPopUp] = useState(false);

    useEffect(() => {
        // Retrieve cart items from query params or local storage
        const queryCart = new URLSearchParams(window.location.search).get('cart');
        const storedCart = queryCart ? JSON.parse(queryCart) : JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);

        // Retrieve discount details from localStorage
        const storedDiscount = localStorage.getItem('selectedDiscount');
        const storedTaxExempt = localStorage.getItem('isTaxExempt');

        if (storedDiscount) setDiscount(Number(storedDiscount));
        if (storedTaxExempt) setTaxExempt(storedTaxExempt === 'true');
    }, []);

    /**
     * Calculates the subtotal of all items in the cart
     * @returns {number} The total price before tax and discounts
     */
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    /**
     * Calculates the discount amount based on the current discount percentage
     * @returns {number} The calculated discount amount
     */
    const calculateDiscountAmount = () => {
        const subtotal = calculateSubtotal();
        return (subtotal * discount) / 100;
    };

    /**
     * Calculates the final total including tax and discounts
     * @returns {string} The formatted total price with 2 decimal places
     */
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discountAmount = calculateDiscountAmount();
        const tax = taxExempt ? 0 : (subtotal - discountAmount) * 0.08;
        return (subtotal - discountAmount + tax).toFixed(2);
    };

    /**
     * Handles returning to the previous page by saving cart state
     */
    const handleReturn = () => {
        // Save the cart items to local storage before returning
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    /**
     * Updates the quantity of an item in the cart
     * @param {number} index - The index of the item in the cart array
     * @param {number} quantity - The new quantity to set
     */
    const handleQuantityChange = (index, quantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = quantity || 1;
        setCartItems(updatedCartItems);
    };

    /**
     * Removes an item from the cart
     * @param {number} index - The index of the item in the cart array
     * @returns {void}
     */
    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    /**
     * Renders the sub-items of a cart item
     * @param {CartItem[]} subItems - The sub-items to render
     * @returns {JSX.Element} The rendered sub-items list
     */
    const renderSubItems = (subItems) => (
        <ul className="list-group list-group-flush mt-2">
            {subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="list-group-item ps-4">
                    <small className="text-muted">{subItem.name}</small>
                </li>
            ))}
        </ul>
    );

    /**
     * Renders a single cart item with quantity controls
     * @param {CartItem} item - The cart item to render
     * @param {number} index - The index of the item in the cart array
     * @returns {JSX.Element} The rendered cart item
     */
    const renderCartItem = (item, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <strong>{item.name}</strong>
                {item.size && (
                    <span className="text-muted">Size: {item.size}</span>
                )}
                <span>Quantity: {item.quantity}</span>
                {item.items && item.items.length > 0 && renderSubItems(item.items)}
            </div>
            <div className="text-end">
                <span className="text-success">${(item.price * item.quantity).toFixed(2)}</span>
                <div className="quantity-controls mt-2">
                    <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => handleQuantityChange(index, Math.max(item.quantity - 1, 1))}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="form-control form-control-sm d-inline-block text-center"
                        style={{ width: '50px' }}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, Math.max(parseInt(e.target.value) || 1, 1))}
                    />
                    <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                    >
                        +
                    </button>
                    <button 
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => handleRemoveItem(index)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </li>
    );

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title text-center">Order Confirmation</h4>
                                
                                {/* Custom Cart Layout for Order Confirmation */}
                                <div className="order-summary mt-4">
                                    {cartItems.length > 0 ? (
                                        <ul className="list-group">
                                            {cartItems.map((item, index) => renderCartItem(item, index))}
                                        </ul>
                                    ) : (
                                        <p className="text-center mt-4">Your cart is empty. Please return to add items to your order.</p>
                                    )}
                                </div>

                                <div className="mb-3 mt-4">
                                    <button className="btn btn-outline-info" onClick={() => setShowDiscountPopUp(true)}>Apply Discount</button>
                                </div>
                                <h5>Subtotal: ${calculateSubtotal().toFixed(2)}</h5>
                                {discount > 0 && (
                                    <h5>Discount: - ${calculateDiscountAmount().toFixed(2)} ({discount}%)</h5>
                                )}
                                {taxExempt && (
                                    <h5>Tax Exempt: Yes</h5>
                                )}
                                <h5>Tax: ${taxExempt ? '0.00' : ((calculateSubtotal() - calculateDiscountAmount()) * 0.08).toFixed(2)}</h5>
                                <h5>Total: ${calculateTotal()}</h5>
                                <div className="d-flex justify-content-between mt-4">
                                    <Link href="/employee/cashier/order" legacyBehavior>
                                        <a className="btn btn-secondary" onClick={handleReturn}>Return</a>
                                    </Link>
                                    <button className="btn btn-primary" onClick={() => setShowPaymentPopUp(true)}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showPaymentPopUp && <PaymentPopUp onClose={() => setShowPaymentPopUp(false)} />}
                {showDiscountPopUp && <DiscountPopUp 
                    onApplyDiscount={(discountValue, taxExemptStatus) => {
                        setDiscount(discountValue);
                        setTaxExempt(taxExemptStatus);
                        setShowDiscountPopUp(false);
                    }} 
                    onClose={() => setShowDiscountPopUp(false)} 
                />}
            </div>
        </div>
    );
};

export default ConfirmationPage;
