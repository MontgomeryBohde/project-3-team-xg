import React, { useState } from 'react';

const Cart = ({ cartItems, inProgressMeal, setInProgressMeal, setEntreeCount, setSideCount, setCart, showQuantityControls, handleQuantityChange, handleRemoveItem, currentMenu }) => {
    const [warningMessage, setWarningMessage] = useState('');

    const renderSubItems = (subItems) => (
        <ul className="list-group list-group-flush">
            {subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="list-group-item">
                    <small>{subItem.item_name}</small> {/* Changed name to item_name */}
                </li>
            ))}
        </ul>
    );

    const renderCartItem = (item, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <div>
                    <strong>{item.item_name}</strong> {/* Changed name to item_name */}
                    {/* Display size only if it is not a meal and size is defined */}
                    {item.size && currentMenu !== 'mealSelect' && (
                        <span className="text-muted"> - {item.size}</span>
                    )}
                    <span className="text-success"> - ${item.price ? (item.price * item.quantity).toFixed(2) : '0.00'}</span>
                </div>
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
                            onChange={(e) => handleQuantityChange(index, Math.max(parseInt(e.target.value) || 1, 1))}
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
                                // Prevent removing the last item in confirmation page
                                setWarningMessage("You cannot remove the last item from the cart on the confirmation page.");
                                return;
                            }
                            setWarningMessage(''); // Clear the warning if item can be removed
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
        <li key="inProgressMeal" className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <div>
                    <strong>{meal.item_name} (In Progress)</strong> {/* Changed name to item_name */}
                    <span className="text-success"> - ${meal.price ? meal.price.toFixed(2) : '0.00'}</span>
                </div>
                {meal.items && meal.items.length > 0 && (
                    <ul className="list-group list-group-flush">
                        {meal.items.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <small>{item.item_name}</small> {/* Changed name to item_name */}
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
    
        if (updatedMeal.items.length === 0) {
            // If no items are left in the meal, keep the meal but set items to an empty array
            updatedMeal.items = [];
        }
        setInProgressMeal(updatedMeal);
    
        // Reset the counts when an item is removed
        const newEntreeCount = updatedMeal.items.filter(item => item.category === 'entree').length;
        const newSideCount = updatedMeal.items.filter(item => item.category === 'side').length;
        setEntreeCount(newEntreeCount);
        setSideCount(newSideCount);
    };
  
    return (
        <div className="cart-container card p-4 mb-4">
            <h3 className="card-title text-center">Cart</h3>         
            <ul className="list-group list-group-flush">
                {inProgressMeal && renderInProgressMeal(inProgressMeal)}
                {cartItems.map((item, index) => renderCartItem(item, index))}
            </ul>
            <div className="card-footer text-center mt-3">
                <h5>Total: ${cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity + (item.items ? item.items.reduce((subTotal, subItem) => subTotal + (subItem.price || 0), 0) : 0), 0).toFixed(2)}</h5>
            </div>
            {warningMessage && (
                <div className="alert alert-warning text-center mt-3">
                    {warningMessage}
                </div>
            )}
        </div>
    );
};

export default Cart;
