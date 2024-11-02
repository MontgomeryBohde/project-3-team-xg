// src/components/ui/employee/cashier/order/cart/Cart.js
import React, { useState } from "react";

const Cart = ({ initialOrder = [] }) => { // Default to empty array if initialOrder is undefined
    const DISCOUNT_RATE = 0.1; // 10% discount for demonstration
    const TAX_RATE = 0.08; // 8% tax rate for demonstration

    // Use state to manage the order and quantities
    const [order, setOrder] = useState(initialOrder);

    // Update quantity of a specific item
    const updateQuantity = (index, quantity) => {
        const newOrder = [...order];
        newOrder[index].quantity = Math.max(1, quantity); // Ensure at least 1
        setOrder(newOrder);
    };

    // Remove an item from the order
    const deleteItem = (index) => {
        const newOrder = order.filter((_, i) => i !== index);
        setOrder(newOrder);
    };

    // Calculate subtotal, discount, tax, and total
    const subtotal = order?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const discount = subtotal * DISCOUNT_RATE;
    const tax = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + tax;

    return (
        <div className="cart">
            <h3>Order</h3>
            {order.map((item, index) => (
                <div key={index} className="order-item">
                    <div className="item-details">
                        <span>{item.name}</span>
                        {item.side && <span> (Side: {item.side})</span>}
                        {item.entree && <span> (Entree: {item.entree})</span>}
                    </div>
                    <div className="item-controls">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                        <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)} 
                            min="1" 
                        />
                        <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </div>
                </div>
            ))}
            <div className="cart-footer">
                <div className="summary-line">
                    Subtotal <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                    Discount <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                    Tax <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-line total">
                    Total <span>${total.toFixed(2)}</span>
                </div>
                <button className="confirm-button">Confirm Order</button>
            </div>
        </div>
    );
};

export default Cart;
