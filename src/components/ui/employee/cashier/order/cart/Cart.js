// src/components/ui/employee/cashier/order/cart/Cart.js
import React from "react";

const Cart = ({ order }) => (
    <div className="cart">
        <h3>Order</h3>
        {order.map((item, index) => (
            <div key={index} className="order-item">
                <span>{item.name}</span> <span>${item.price}</span>
            </div>
        ))}
        <div className="cart-footer">
            <div className="summary-line">Subtotal <span>$0</span></div>
            <div className="summary-line">Discount <span>$0</span></div>
            <div className="summary-line">Tax <span>$0</span></div>
            <div className="summary-line total">Total <span>$0.00</span></div>
            <button className="confirm-button">Confirm Order</button>
        </div>
    </div>
);

export default Cart;
