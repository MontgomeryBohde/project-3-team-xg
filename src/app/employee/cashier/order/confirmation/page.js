// src/app/employee/cashier/order/confirmation/page.js
'use client';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DiscountPopUp from '@/components/ui/employee/cashier/order/confirmation/DiscountPopUp';
import PaymentPopUp from '@/components/ui/employee/cashier/order/confirmation/PaymentPopUp';
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";

const ConfirmationPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [taxExempt, setTaxExempt] = useState(false);
    const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
    const [showDiscountPopUp, setShowDiscountPopUp] = useState(false);

    useEffect(() => {
        const queryCart = new URLSearchParams(window.location.search).get('cart');
        const storedCart = queryCart 
            ? JSON.parse(queryCart) 
            : JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    
        // Retrieve discount details from localStorage
        const storedDiscount = localStorage.getItem('selectedDiscount');
        const storedTaxExempt = localStorage.getItem('isTaxExempt');
    
        if (storedDiscount) setDiscount(Number(storedDiscount));
        if (storedTaxExempt) setTaxExempt(storedTaxExempt === 'true');
    }, []);    

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateDiscountAmount = () => {
        const subtotal = calculateSubtotal();
        return (subtotal * discount) / 100;
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discountAmount = calculateDiscountAmount();
        const tax = taxExempt ? 0 : (subtotal - discountAmount) * 0.08;
        return (subtotal - discountAmount + tax).toFixed(2);
    };

    const handleReturn = () => {
        // Save the cart items to sessionStorage before returning
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = quantity || 1;
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    const renderSubItems = (subItems) => (
        <ul className="list-group list-group-flush mt-2">
            {subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="list-group-item ps-4">
                    <small className="text-muted">{subItem.item_name}</small>
                </li>
            ))}
        </ul>
    );

    const renderCartItem = (item, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <strong>{item.item_name}</strong>
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
