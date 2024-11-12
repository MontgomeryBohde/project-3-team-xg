// src/components/ui/employee/cashier/order/Cart.js
import React from 'react';

const Cart = ({ cartItems, showQuantityControls, handleQuantityChange, handleRemoveItem }) => {
    const renderSubItems = (subItems) => (
        <ul className="list-group list-group-flush">
            {subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="list-group-item">
                    <small>{subItem.name}</small>
                </li>
            ))}
        </ul>
    );

    const renderCartItem = (item, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <div>
                    <strong>{item.name}</strong> {item.items && item.items.length > 0 ? '' : <span className="text-muted">- {item.size}</span>} <span className="text-success">- ${item.price ? (item.price * item.quantity).toFixed(2) : '0.00'}</span>
                </div>
                {item.items && item.items.length > 0 && renderSubItems(item.items)}
            </div>
            <div className="d-flex align-items-center ms-auto">
                {showQuantityControls && (
                    <div className="quantity-controls d-flex align-items-center me-3">
                        <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleQuantityChange(index, Math.max(item.quantity - 1, 1))}>-</button>
                        <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            style={{ width: '50px' }}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, Math.max(parseInt(e.target.value) || 1, 1))}
                        />
                        <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                    </div>
                )}
                {showQuantityControls && handleRemoveItem && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(index)}>Delete</button>
                )}
            </div>
        </li>
    );

    return (
        <div className="cart-container card p-4 mb-4">
            <h3 className="card-title text-center">Cart</h3>
            <ul className="list-group list-group-flush">
                {cartItems.map((item, index) => renderCartItem(item, index))}
            </ul>
            <div className="card-footer text-center mt-3">
                <h5>Total: ${cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity + (item.items ? item.items.reduce((subTotal, subItem) => subTotal + (subItem.price || 0), 0) : 0), 0).toFixed(2)}</h5>
            </div>
        </div>
    );
};

export default Cart;
