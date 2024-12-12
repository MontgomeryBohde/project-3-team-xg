// src/components/ui/customer/menu-selection/RenderMenu.js

/**
 * @fileoverview This file contains the RenderMenu component which displays a list of menu items.
 * It uses icons from react-icons library to indicate allergens and vegan items.
 * @requires react
 * @requires react-icons/fa
 * @requires react-icons/md
 */

import React from "react";
import { FaLeaf } from "react-icons/fa";
import { MdWarning } from "react-icons/md";


/**
 * RenderMenu component to display a list of menu items.
 *
 * @param {Object[]} menuItems - Array of menu items to be displayed.
 * @param {Object} menuItems[].id - Unique identifier for the menu item.
 * @param {string} menuItems[].item_name - Name of the menu item.
 * @param {string} [menuItems[].image_url] - URL of the menu item's image.
 * 
 * @param {Object} itemSizes - Object containing sizes for each menu item.
 * @param {Object[]} itemSizes[].item_size - Size of the menu item.
 * @param {string} itemSizes[].item_size.item_size - Size label (e.g., "Small").
 * @param {number} itemSizes[].item_size.calories - Calorie count for the size.
 * 
 * @param {Object[]} inventoryData - Array of inventory data for menu items.
 * @param {string} inventoryData[].item_name - Name of the menu item.
 * @param {boolean} [inventoryData[].is_allergen] - Indicates if the item contains allergens.
 * @param {boolean} [inventoryData[].is_vegan] - Indicates if the item is vegan.
 * 
 * @param {Function} setSelectedItem - Function to set the selected item.
 *
 * @returns {JSX.Element[]} Array of JSX elements representing the menu items.
 */
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
