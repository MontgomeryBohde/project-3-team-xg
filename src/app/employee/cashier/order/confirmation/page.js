/**
 * @file page.js
 * @description Confirmation page for reviewing and finalizing orders in the cashier interface. 
 * Handles cart display, discount application, tax calculations, and order confirmation.
 * @module employee/cashier/order/confirmation/page
 * @requires React
 * @requires Link
 * @requires DiscountPopUp
 * @requires PaymentPopUp
 * @requires EmployeeLogInHeader
 */

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DiscountPopUp from '@/components/ui/employee/cashier/order/confirmation/DiscountPopUp';
import PaymentPopUp from '@/components/ui/employee/cashier/order/confirmation/PaymentPopUp';
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

/**
 * The main component for the order confirmation page.
 * Manages cart items, discounts, and tax settings for the cashier interface.
 * 
 * @component
 */
const ConfirmationPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [taxExempt, setTaxExempt] = useState(false);
    const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
    const [showDiscountPopUp, setShowDiscountPopUp] = useState(false);

    useEffect(() => {
        /**
         * Initializes cart items and discount details from query parameters or local storage.
         */
        const queryCart = new URLSearchParams(window.location.search).get('cart');
        const storedCart = queryCart ? JSON.parse(queryCart) : JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);

        const storedDiscount = localStorage.getItem('selectedDiscount');
        const storedTaxExempt = localStorage.getItem('isTaxExempt');

        if (storedDiscount) setDiscount(Number(storedDiscount));
        if (storedTaxExempt) setTaxExempt(storedTaxExempt === 'true');
    }, []);

    /**
     * Calculates the subtotal of the cart items.
     * @returns {number} The subtotal of all items in the cart.
     */
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    /**
     * Calculates the discount amount based on the applied discount percentage.
     * @returns {number} The discount amount.
     */
    const calculateDiscountAmount = () => {
        const subtotal = calculateSubtotal();
        return (subtotal * discount) / 100;
    };

    /**
     * Calculates the total amount, including tax and discounts.
     * @returns {number} The total amount after applying tax and discounts.
     */
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discountAmount = calculateDiscountAmount();
        const tax = taxExempt ? 0 : (subtotal - discountAmount) * 0.08;
        return (subtotal - discountAmount + tax).toFixed(2);
    };

    /**
     * Saves the cart items to local storage before returning to the previous page.
     */
    const handleReturn = () => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    /**
     * Updates the quantity of a specific item in the cart.
     * @param {number} index - The index of the item in the cart.
     * @param {number} quantity - The new quantity for the item.
     */
    const handleQuantityChange = (index, quantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = quantity || 1;
        setCartItems(updatedCartItems);
    };

    /**
     * Removes a specific item from the cart.
     * @param {number} index - The index of the item to remove.
     */
    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    /**
     * Renders sub-items for a composite item in the cart.
     * @param {Array<object>} subItems - List of sub-items to render.
     * @returns {JSX.Element} The rendered sub-item list.
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
     * Renders an individual cart item with controls for updating quantity and removing the item.
     * @param {object} item - The cart item to render.
     * @param {number} index - The index of the item in the cart.
     * @returns {JSX.Element} The rendered cart item.
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
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-center text-primary mb-4">Order Confirmation</h2>
    
                                {/* Order Summary */}
                                <div className="order-summary">
                                    {cartItems.length > 0 ? (
                                        <ul className="list-group">
                                            {cartItems.map((item, index) => renderCartItem(item, index))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-muted mt-4">
                                            Your cart is empty. Please return to add items to your order.
                                        </p>
                                    )}
                                </div>
    
                                {/* Summary Details */}
                                {cartItems.length > 0 && (
                                    <div className="mt-4 p-3 border rounded bg-light">
                                        <h5 className="mb-3">
                                            <span className="text-secondary">Subtotal:</span> ${calculateSubtotal().toFixed(2)}
                                        </h5>
                                        {discount > 0 && (
                                            <h5 className="mb-3">
                                                <span className="text-success">Discount:</span> 
                                                - ${calculateDiscountAmount().toFixed(2)} ({discount}%)
                                            </h5>
                                        )}
                                        {taxExempt && (
                                            <h5 className="mb-3 text-warning">
                                                <span>Tax Exempt:</span> Yes
                                            </h5>
                                        )}
                                        <h5 className="mb-3">
                                            <span className="text-secondary">Tax:</span> 
                                            ${taxExempt ? '0.00' : ((calculateSubtotal() - calculateDiscountAmount()) * 0.08).toFixed(2)}
                                        </h5>
                                        <h5 className="text-primary">
                                            <strong>Total:</strong> ${calculateTotal()}
                                        </h5>
                                    </div>
                                )}
    
                                {/* Buttons */}
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <Link href="/employee/cashier/order" legacyBehavior>
                                        <a className="btn btn-outline-secondary btn-lg" onClick={handleReturn}>
                                            <i className="bi bi-arrow-left me-2"></i> Return
                                        </a>
                                    </Link>
                                    {cartItems.length > 0 && (
                                        <button
                                            className="btn btn-outline-info btn-lg me-3"
                                            onClick={() => setShowDiscountPopUp(true)}
                                        >
                                            <i className="bi bi-tag me-2"></i> Apply Discount
                                        </button>
                                    )}
                                    {cartItems.length > 0 && (
                                        <button
                                            className="btn btn-primary btn-lg"
                                            onClick={() => setShowPaymentPopUp(true)}
                                        >
                                            <i className="bi bi-credit-card me-2"></i> Confirm
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Popups */}
                {showPaymentPopUp && <PaymentPopUp onClose={() => setShowPaymentPopUp(false)} />}
                {showDiscountPopUp && (
                    <DiscountPopUp
                        onApplyDiscount={(discountValue, taxExemptStatus) => {
                            setDiscount(discountValue);
                            setTaxExempt(taxExemptStatus);
                            setShowDiscountPopUp(false);
                        }}
                        onClose={() => setShowDiscountPopUp(false)}
                    />
                )}
            </div>
        </div>
    );    
};

export default ConfirmationPage;
