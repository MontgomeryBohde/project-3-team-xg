'use client';

import React, { useState } from 'react';

const InventoryPopup = ({
    itemId, // Add item ID for edit and remove actions
    itemName,
    itemCategory,
    itemPrice,
    currentStock,
    restockDate,
    isAllergen,
    isVegan,
    setItemId, // Add setter for item ID
    setItemName,
    setItemCategory,
    setItemPrice,
    setCurrentStock,
    setRestockDate,
    setIsAllergen,
    setIsVegan,
    addItem,
    removeItem,
    resetFields,
    editItem, // Add function for editing items
}) => {
    const [errorMessage, setErrorMessage] = useState('');

    // Helper function to validate inputs
    const validateInputs = () => {
        if (!itemName.trim()) {
            setErrorMessage('Item name cannot be empty.');
            return false;
        }
        if (!itemCategory) {
            setErrorMessage('Item category must be selected.');
            return false;
        }
        if (isNaN(itemPrice) || itemPrice <= 0) {
            setErrorMessage('Item price must be a positive number.');
            return false;
        }
        if (isNaN(currentStock) || currentStock < 0) {
            setErrorMessage('Current stock must be a non-negative number.');
            return false;
        }
        if (restockDate && isNaN(Date.parse(restockDate))) {
            setErrorMessage('Invalid restock date.');
            return false;
        }

        // Basic sanitization against SQL injections or malicious input
        const forbiddenChars = /[<>;'"`\\]/;
        if (forbiddenChars.test(itemName)) {
            setErrorMessage('Item name contains invalid characters.');
            return false;
        }

        return true;
    };

    const handleAddItem = () => {
        if (validateInputs()) {
            setErrorMessage('');
            addItem();
        }
    };

    const handleEditItem = () => {
        if (validateInputs()) {
            setErrorMessage('');
            editItem(); // Call edit function
        }
    };

    const handleRemoveItem = () => {
        if (itemId) {
            setErrorMessage('');
            removeItem(); // Ensure removal by ID
        } else {
            setErrorMessage('Cannot remove an item without a valid ID.');
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{itemId ? 'Edit Item' : 'Add New Item'}</h5>
                        <button type="button" className="btn-close" onClick={resetFields}></button>
                    </div>
                    <div className="modal-body">
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={itemCategory}
                                onChange={(e) => setItemCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                <option value="Appetizer">Appetizer</option>
                                <option value="Meats">Meats</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Assorted">Assorted</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Utensils">Utensils</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={itemPrice}
                                onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Current Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                value={currentStock}
                                onChange={(e) => setCurrentStock(parseInt(e.target.value, 10))}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Restock Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={restockDate}
                                onChange={(e) => setRestockDate(e.target.value)}
                            />
                        </div>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isAllergen}
                                onChange={(e) => setIsAllergen(e.target.checked)}
                            />
                            <label className="form-check-label">Is Allergen</label>
                        </div>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isVegan}
                                onChange={(e) => setIsVegan(e.target.checked)}
                            />
                            <label className="form-check-label">Is Vegan</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {itemId ? (
                            <button className="btn btn-primary" onClick={handleEditItem}>
                                Save Changes
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleAddItem}>
                                Add Item
                            </button>
                        )}
                        {itemId && (
                            <button className="btn btn-danger" onClick={handleRemoveItem}>
                                Remove
                            </button>
                        )}
                        <button className="btn btn-secondary" onClick={resetFields}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryPopup;
