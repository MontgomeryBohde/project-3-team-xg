
"use client";
import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order }) => {
    return (
        <div className="order-card">
            <div className="order-card-header">
                <span className="order-id">Order ID: {order.id}</span>
                <span className="order-time">{order.time}</span>
            </div>
            <div className="order-content-middle">
                <div className="order-type">{order.type}</div>
                <div className="order-contents">
                    {order.contents.map((entree, index) => (
                        <div key={index} className="entree-item">{entree}</div> //make new div for each of the entrees in the order
                    ))}
                </div>
            </div>
            <div className="order-total">Total: ${order.total}</div> {}
        </div>
    );
};

export default OrderCard;