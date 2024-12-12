// src/components/ui/employee/cashier/order/Cart.js

/**
 * @fileoverview This file contains the Cart component which displays the items in the cart,
 * allows quantity adjustments, and handles item removal.
 * @requires React
 */

import React, { useState } from 'react';

/**
 * Cart component to display and manage cart items.
 *
 * @param {Object[]} cartItems - Array of cart items.
 * @param {Object} inProgressMeal - The meal currently being prepared.
 * @param {Function} setInProgressMeal - Function to set the in-progress meal.
 * @param {Function} setEntreeCount - Function to set the count of entrees.
 * @param {Function} setSideCount - Function to set the count of sides.
 * @param {Function} setCart - Function to set the cart items.
 * @param {boolean} showQuantityControls - Flag to show or hide quantity controls.
 * @param {Function} handleQuantityChange - Function to handle quantity changes.
 * @param {Function} handleRemoveItem - Function to handle item removal.
 * @param {string} currentMenu - The current menu being displayed.
 * @returns {JSX.Element} The rendered Cart component.
 */
const Cart = ({
    cartItems,
    inProgressMeal,
    setInProgressMeal,
    setEntreeCount,
    setSideCount,
    setCart,
    showQuantityControls,
    handleQuantityChange,
    handleRemoveItem,
    currentMenu,
}) => {
    const [warningMessage, setWarningMessage] = useState('');

    /**
     * Renders the sub-items of a cart item.
     *
     * @param {Object[]} subItems - Array of sub-items.
     * @returns {JSX.Element} The rendered sub-items.
     */
    const renderSubItems = (subItems) => (
        <ul className="list-group list-group-flush">
            {subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="list-group-item">
                    <small>{subItem.item_name}</small>
                </li>
            ))}
        </ul>
    );

    /**
     * Renders a single cart item.
     *
     * @param {Object} item - The cart item.
     * @param {number} index - The index of the cart item.
     * @returns {JSX.Element} The rendered cart item.
     */
    const renderCartItem = (item, index) => (
        <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <div className="d-flex flex-column">
                <strong>{item.item_name}</strong>
                {item.size && currentMenu !== 'mealSelect' && (
                    <span className="text-muted"> - {item.size}</span>
                )}
                <span className="text-success">
                    - ${(item.price * item.quantity).toFixed(2)}
                </span>
                {item.items && renderSubItems(item.items)}
            </div>
            <div className="d-flex align-items-center ms-auto">
                {showQuantityControls && (
                    <div className="quantity-controls d-flex align-items-center me-3">
                        <button
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={() => handleQuantityChange(index, Math.max(item.quantity - 1, 1))}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            style={{ width: '50px' }}
                            value={item.quantity}
                            onChange={(e) =>
                                handleQuantityChange(index, Math.max(parseInt(e.target.value) || 1, 1))
                            }
                        />
                        <button
                            className="btn btn-outline-secondary btn-sm ms-2"
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                )}
                {showQuantityControls && handleRemoveItem && (
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            if (currentMenu === 'confirmation' && cartItems.length <= 1) {
                                setWarningMessage(
                                    'You cannot remove the last item from the cart on the confirmation page.'
                                );
                                return;
                            }
                            setWarningMessage('');
                            handleRemoveItem(index);
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </li>
    );

    const renderInProgressMeal = (meal) => (
        <li
            key="inProgressMeal"
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <div className="d-flex flex-column">
                <strong>{meal.item_name} (In Progress)</strong>
                <span className="text-success">
                    - ${meal.price ? meal.price.toFixed(2) : '0.00'}
                </span>
                {meal.items && meal.items.length > 0 && (
                    <ul className="list-group list-group-flush">
                        {meal.items.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <small>{item.item_name}</small>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveFromInProgressMeal(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );

    const handleRemoveFromInProgressMeal = (itemIndex) => {
        if (!inProgressMeal) return;

        const updatedMeal = { ...inProgressMeal };
        updatedMeal.items = updatedMeal.items.filter((_, index) => index !== itemIndex);

        setInProgressMeal(updatedMeal);

        const newEntreeCount = updatedMeal.items.filter((item) => item.category === 'entree').length;
        const newSideCount = updatedMeal.items.filter((item) => item.category === 'side').length;

        setEntreeCount(newEntreeCount);
        setSideCount(newSideCount);
    };

    return (
        <div className="cart-container card p-4 mb-4 shadow-sm">
            <h3 className="card-title text-center text-primary">Cart</h3>
            <ul className="list-group list-group-flush">
                {inProgressMeal && renderInProgressMeal(inProgressMeal)}
                {cartItems.map((item, index) => renderCartItem(item, index))}
            </ul>
            <div className="card-footer text-center mt-3">
                <h5 className="text-primary">
                    Total: $
                    {cartItems
                        .reduce(
                            (total, item) =>
                                total +
                                (item.price || 0) * item.quantity +
                                (item.items
                                    ? item.items.reduce((subTotal, subItem) => subTotal + (subItem.price || 0), 0)
                                    : 0),
                            0
                        )
                        .toFixed(2)}
                </h5>
            </div>
            {warningMessage && (
                <div className="alert alert-warning text-center mt-3">{warningMessage}</div>
            )}
        </div>
    );
};

export default Cart;
