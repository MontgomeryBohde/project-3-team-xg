import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CreditCardPopUp from './CreditCardPopUp'; // Adjust the import path as necessary

const PaymentPopUp = ({ onClose }) => {
    const [showCreditCardPopUp, setShowCreditCardPopUp] = useState(false);

    const handleCardClick = () => {
        setShowCreditCardPopUp(true);
    };

    if (showCreditCardPopUp) {
        return <CreditCardPopUp onClose={onClose} />;
    }

    return (
        <div className="payment-popup position-fixed top-50 start-50 translate-middle bg-white p-4 rounded border" style={{ zIndex: 1050 }}>
            <h5 className="text-center mb-4">Pay with</h5>
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-danger mb-3 w-100">Cash</button>
                <button className="btn btn-danger mb-3 w-100" onClick={handleCardClick}>Card</button>
                <button className="btn btn-danger mb-3 w-100">Mobile</button>
                <button className="btn btn-secondary mt-3" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default PaymentPopUp;