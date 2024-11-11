// src/components/ui/employee/cashier/order/Cart.js
import React from 'react';

const Cart = ({ cartItems, showQuantityControls, handleQuantityChange, handleRemoveItem }) => (
    <div className="cart-container">
        <h3>Cart</h3>
        <ul>
            {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                    <span>{item.name} - ${item.price ? item.price.toFixed(2) : '0.00'}</span>
                    {showQuantityControls && (
                        <div className="quantity-controls">
                            <button onClick={() => handleQuantityChange(index, Math.max(item.quantity - 1, 1))}>-</button>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, Math.max(parseInt(e.target.value) || 1, 1))}
                            />
                            <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                        </div>
                    )}
                    {showQuantityControls && handleRemoveItem && (
                        <button className="remove-button" onClick={() => handleRemoveItem(index)}>Delete</button>
                    )}
                    {item.items && item.items.length > 0 && (
                        <ul>
                            {item.items.map((subItem, subIndex) => (
                                <li key={subIndex} style={{ marginLeft: '20px' }}>
                                    {subItem.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
        <p>Total: ${cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity + (item.items ? item.items.reduce((subTotal, subItem) => subTotal + (subItem.price || 0), 0) : 0), 0).toFixed(2)}</p>
    </div>
);

export default Cart;