// src/components/ui/employee/cashier/meal_types/detailed_menu/DetailedMenu.js
import React from "react";

const entrees = [
    "Orange Chicken", "Grilled Teriyaki Chicken", "Broccoli Beef",
    "Kung Pao Chicken", "Honey Sesame Chicken Breast", "Beijing Beef",
    "Mushroom Chicken", "Sweetfire Chicken Breast", "String Bean Chicken Breast",
    "Black Pepper Chicken", "Black Pepper Sirloin Steak", "Honey Walnut Shrimp"
];
const sides = ["Chow Mein", "Fried Rice", "White Steamed Rice", "Super Greens"];

const DetailedMenu = ({ mealType, selectedSides, selectedEntrees, setSelectedSides, setSelectedEntrees, onAddToOrder, onBackClick }) => {
    const handleEntreeClick = (entree) => {
        if (selectedEntrees.length < mealType.entrees) {
            setSelectedEntrees((prev) => [...prev, entree]);
            onAddToOrder(entree, "entree");
        }
    };

    const handleSideClick = (side) => {
        if (selectedSides.length < mealType.sides) {
            setSelectedSides((prev) => [...prev, side]);
            onAddToOrder(side, "side");
        }
    };

    return (
        <div className="detailed-menu">
            <button className="back-button" onClick={onBackClick}>Back</button>
            <h2>{mealType.name}</h2>
            <p>Choose your entree</p>
            
            <div className="menu-container">
                <div className="menu-category">
                    <h3>Entree</h3>
                    <p>Choose up to {mealType.entrees} entree(s)</p>
                    <div className="menu-grid">
                        {entrees.map((entree) => (
                            <button 
                                key={entree} 
                                className="menu-button" 
                                onClick={() => handleEntreeClick(entree)}
                                disabled={selectedEntrees.includes(entree) || selectedEntrees.length >= mealType.entrees}
                            >
                                {entree}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="menu-category">
                    <h3>Side</h3>
                    <p>Choose up to {mealType.sides} side(s)</p>
                    <div className="menu-grid">
                        {sides.map((side) => (
                            <button 
                                key={side} 
                                className="menu-button" 
                                onClick={() => handleSideClick(side)}
                                disabled={selectedSides.includes(side) || selectedSides.length >= mealType.sides}
                            >
                                {side}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default DetailedMenu;
