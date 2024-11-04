// src/components/ui/employee/cashier/order/EntreeAndSideMenu.js
import React from 'react';

const EntreeAndSideMenu = ({ items, onSelectItem, onBack }) => (
    <div className="menu-container">
        <h3>Entrees & Sides (A la Carte)</h3>
        <div className="menu-grid">
            {items.map((item) => (
                <button
                    key={item.name}
                    className="menu-button"
                    onClick={() => {
                        onSelectItem(item);
                        onBack();
                    }}
                >
                    {item.name}
                </button>
            ))}
        </div>
        <button onClick={onBack} className="back-button">Back</button>
    </div>
);

export default EntreeAndSideMenu;