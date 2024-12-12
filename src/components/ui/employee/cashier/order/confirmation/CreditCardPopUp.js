// CreditCardPopUp.js
// src/components/ui/employee/cashier/order/confirmation/CreditCardPopUp.js

/**
 * @file CreditCardPopUp.js
 * @description This file contains the CreditCardPopUp component which renders a popup for entering credit card information.
 * @module CreditCardPopUp
 * @requires React
 * @requires next/navigation
 */

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

/**
 * CreditCardPopUp component renders a popup for entering credit card information.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to call when the popup is closed
 * @returns {JSX.Element} The rendered component
 */
const CreditCardPopUp = ({ onClose }) => {
    const router = useRouter();
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    /**
     * Handles the form submission.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ cardNumber, cvv, expiryDate });
        sessionStorage.removeItem('cart');
        router.push("/employee/cashier/order");
    };

    return (
        <div className="credit-card-popup position-fixed top-50 start-50 translate-middle bg-white p-4 rounded border" style={{ zIndex: 1050 }}>
            <h5 className="text-center mb-4">Enter Credit Card Information</h5>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-100">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger mb-3 w-100">Submit</button>
                <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CreditCardPopUp;