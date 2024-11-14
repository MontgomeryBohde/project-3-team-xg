// DiscountPopUp.js
// src/components/ui/employee/cashier/order/confirmation/DiscountPopUp.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const DiscountPopUp = ({ onClose, onApplyDiscount }) => {
    const [selectedDiscount, setSelectedDiscount] = useState(0);
    const [isTaxExempt, setIsTaxExempt] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoMessage, setPromoMessage] = useState('');

    // Define valid promo codes and their respective discounts
    const validPromoCodes = {
        'SAVE10': 10,
        'FREEMEAL': 20,
        'HAPPYHOUR': 15,
    };

    // Load discount details from localStorage when the component mounts
    useEffect(() => {
        const storedDiscount = localStorage.getItem('selectedDiscount');
        const storedTaxExempt = localStorage.getItem('isTaxExempt');
        const storedPromoCode = localStorage.getItem('promoCode');

        if (storedDiscount) setSelectedDiscount(Number(storedDiscount));
        if (storedTaxExempt) setIsTaxExempt(storedTaxExempt === 'true');
        if (storedPromoCode) setPromoCode(storedPromoCode);
    }, []);

    // Function to save discount details to localStorage
    const saveDiscountDetails = (discountValue, taxExemptValue, promoCodeValue) => {
        localStorage.setItem('selectedDiscount', discountValue);
        localStorage.setItem('isTaxExempt', taxExemptValue);
        localStorage.setItem('promoCode', promoCodeValue);
    };

    const applyPromoCode = () => {
        if (promoCode in validPromoCodes) {
            const discountValue = validPromoCodes[promoCode];
            setSelectedDiscount(discountValue);
            setPromoMessage(`Promo code applied! Discount: ${discountValue}%`);
            saveDiscountDetails(discountValue, isTaxExempt, promoCode);
        } else {
            setPromoMessage('Invalid promo code. Please try again.');
        }
    };

    const applyDiscount = () => {
        saveDiscountDetails(selectedDiscount, isTaxExempt, promoCode);
        onApplyDiscount(selectedDiscount, isTaxExempt);
    };

    return (
        <div className="discount-popup position-fixed top-50 start-50 translate-middle bg-white p-4 rounded border" style={{ zIndex: 1050 }}>
            <h5 className="text-center mb-4">Apply Discount</h5>

            {/* Promo Code Input Section */}
            <div className="mb-3">
                <label htmlFor="promoCode" className="form-label">Enter Promo Code:</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                    />
                    <button className="btn btn-primary" onClick={applyPromoCode}>Enter</button>
                </div>
                {promoMessage && (
                    <div className={`mt-2 ${promoMessage.includes('Invalid') ? 'text-danger' : 'text-success'}`}>
                        {promoMessage}
                    </div>
                )}
            </div>

            {/* Predefined Discount Options */}
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    id="militaryDiscount"
                    value="15"
                    checked={selectedDiscount === 15}
                    onChange={() => setSelectedDiscount(15)}
                />
                <label className="form-check-label" htmlFor="militaryDiscount">
                    Military Discount (15%)
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    id="employeeDiscount"
                    value="20"
                    checked={selectedDiscount === 20}
                    onChange={() => setSelectedDiscount(20)}
                />
                <label className="form-check-label" htmlFor="employeeDiscount">
                    Employee Discount (20%)
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    id="hospitalDiscount"
                    value="10"
                    checked={selectedDiscount === 10}
                    onChange={() => setSelectedDiscount(10)}
                />
                <label className="form-check-label" htmlFor="hospitalDiscount">
                    Hospital Workers Discount (10%)
                </label>
            </div>

            {/* Tax Exempt Option */}
            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="taxExempt"
                    checked={isTaxExempt}
                    onChange={() => setIsTaxExempt(!isTaxExempt)}
                />
                <label className="form-check-label" htmlFor="taxExempt">
                    Tax Exempt
                </label>
            </div>

            {/* Apply and Cancel Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary" onClick={applyDiscount}>Apply</button>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DiscountPopUp;
