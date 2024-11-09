// PaymentPopup.js
// src/components/ui/employee/cashier/order/confirmation/PaymentPopUp.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const PaymentPopUp = ({ onClose }) => {
    return (
        <div className="payment-popup position-fixed top-50 start-50 translate-middle bg-white p-4 rounded border" style={{ zIndex: 1050 }}>
            <h5 className="text-center mb-4">Pay with</h5>
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-danger mb-3 w-100">Cash</button>
                <button className="btn btn-danger mb-3 w-100">Card</button>
                <button className="btn btn-danger mb-3 w-100">Mobile</button>
                <button className="btn btn-secondary mt-3" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default PaymentPopUp;
