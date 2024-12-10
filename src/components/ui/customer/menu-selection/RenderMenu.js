// src/components/ui/customer/menu-selection/RenderMenu.js
import React from "react";
import { FaLeaf } from "react-icons/fa";
import { MdWarning } from "react-icons/md";

const RenderMenu = ({ menuItems, itemSizes, inventoryData, setSelectedItem }) => {
    return menuItems.map((item) => {
        const sizes = itemSizes[item.id] || [];
        const smallSize = sizes.find((size) => size.item_size === "Small");
        const inventory = inventoryData.find((inv) => inv.item_name === item.item_name) || {};

        return (
            <div key={item.id} className="col-6 col-md-4 col-lg-3 mb-3">
                <div className="card position-relative">
                    {/* Top-right corner icons */}
                    <div className="position-absolute icon-container">
                        {inventory.is_allergen && (
                            <MdWarning size={20} className="text-danger" title="Contains Allergens" />
                        )}
                        {inventory.is_vegan && (
                            <FaLeaf size={20} className="text-success" title="Vegan Item" />
                        )}
                    </div>

                    {/* Image */}
                    <img
                        src={item.image_url || "/images/placeholder.png"}
                        className="card-img-top img-fluid"
                        alt={item.item_name || "Menu item"}
                    />

                    {/* Card Body */}
                    <div className="card-body text-center">
                        <p className="card-text font-weight-bold">{item.item_name}</p>
                        <p className="card-text text-muted">
                            {smallSize
                                ? `${smallSize.item_size} - ${smallSize.calories} cal`
                                : "Size info unavailable"}
                        </p>
                        <button
                            className="btn btn-danger w-100"
                            onClick={() => setSelectedItem(item)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    });
};

export default RenderMenu;
