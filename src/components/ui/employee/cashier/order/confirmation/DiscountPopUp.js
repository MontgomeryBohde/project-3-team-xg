// DiscountPopUp.js
// src/components/ui/employee/cashier/order/confirmation/DiscountPopUp.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const DiscountPopUp = ({ onClose, onApplyDiscount, subtotal }) => {
    const [selectedDiscount, setSelectedDiscount] = useState(0);
    const [isTaxExempt, setIsTaxExempt] = useState(false);

    const applyDiscount = () => {
        onApplyDiscount(selectedDiscount, isTaxExempt);
    };

    return (
        <div className="discount-popup position-fixed top-50 start-50 translate-middle bg-white p-4 rounded border" style={{ zIndex: 1050 }}>
            <h5 className="text-center mb-4">Apply Discount</h5>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    id="militaryDiscount"
                    value="15"
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
                    onChange={() => setSelectedDiscount(10)}
                />
                <label className="form-check-label" htmlFor="hospitalDiscount">
                    Hospital Workers Discount (10%)
                </label>
            </div>
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
            <div className="mt-4">
                <h6>Subtotal: ${subtotal.toFixed(2)}</h6>
                <h6>Tax: ${isTaxExempt ? '0.00' : (subtotal * 0.08).toFixed(2)}</h6>
                <h6>Total: ${(subtotal - (subtotal * selectedDiscount / 100) + (isTaxExempt ? 0 : (subtotal * 0.08))).toFixed(2)}</h6>
            </div>
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary" onClick={applyDiscount}>Apply</button>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DiscountPopUp;