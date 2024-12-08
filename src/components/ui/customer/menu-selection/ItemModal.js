// src/components/ui/customer/menu-selection/ItemModal.js
import React from "react";

const ItemModal = ({ item, sizes, selectedSize, setSelectedSize, onClose, onAdd }) => {
    if (!item) return null;

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value); // Update the selected size
    };

    const selectedSizeDetails = sizes.find(size => size.item_size === selectedSize);

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div
                className="modal-dialog"
                role="document"
                style={{ maxWidth: "500px", margin: "1.75rem auto" }} // Adjust width and margin
            >
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h5 className="modal-title">{item.item_name}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <div className="text-center">
                            {item.image_url && (
                                <img
                                    src={item.image_url}
                                    alt={item.item_name}
                                    className="img-fluid rounded mb-3"
                                    style={{ maxHeight: "200px", objectFit: "cover" }} // Reduced image height
                                />
                            )}
                        </div>
                        <p className="text-muted mb-3 text-center">{item.descr}</p>

                        {/* Size Details */}
                        {selectedSizeDetails && (
                            <div className="mb-2 text-center">
                                <p className="mb-1">
                                    <strong>Calories:</strong> {selectedSizeDetails.calories} cal
                                </p>
                                <p className="mb-1">
                                    <strong>Price:</strong> ${selectedSizeDetails.price}
                                </p>
                            </div>
                        )}

                        {/* Size Dropdown */}
                        <div className="text-center">
                            <label htmlFor="sizeSelect" className="form-label">
                                <strong>Select Size:</strong>
                            </label>
                            <select
                                id="sizeSelect"
                                className="form-select"
                                value={selectedSize}
                                onChange={handleSizeChange}
                                style={{ maxWidth: "300px", margin: "0 auto" }}
                            >
                                {sizes.map(size => (
                                    <option key={size.item_size} value={size.item_size}>
                                        {size.item_size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer justify-content-center">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                onAdd(item, selectedSize);
                                onClose();
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;
