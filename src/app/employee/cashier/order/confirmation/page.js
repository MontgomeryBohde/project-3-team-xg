// Confirmation page.js
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
        // Retrieve cart items from query params or local storage
        const queryCart = new URLSearchParams(window.location.search).get('cart');
        const storedCart = queryCart ? JSON.parse(queryCart) : JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discountAmount = (subtotal * discount) / 100;
        const tax = taxExempt ? 0 : (subtotal - discountAmount) * 0.08;
        return (subtotal - discountAmount + tax).toFixed(2);
    };

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">Order Confirmation</h4>
                            <ul className="list-group mb-3">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {item.name} (x{item.quantity})
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-3">
                                <button className="btn btn-outline-info" onClick={() => setShowDiscountPopUp(true)}>Apply Discount</button>
                            </div>
                            <h5>Subtotal: ${calculateSubtotal().toFixed(2)}</h5>
                            <h5>Tax: ${taxExempt ? '0.00' : ((calculateSubtotal() - (calculateSubtotal() * discount / 100)) * 0.08).toFixed(2)}</h5>
                            <h5>Total: ${calculateTotal()}</h5>
                            <div className="d-flex justify-content-between mt-4">
                                <Link href="/employee/cashier/order" legacyBehavior>
                                    <a className="btn btn-secondary">Return</a>
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
                subtotal={calculateSubtotal()}
            />}
        </div>
        </div>
    );
};

export default ConfirmationPage;
