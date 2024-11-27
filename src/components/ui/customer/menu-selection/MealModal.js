import React, { useState, useEffect } from "react";
import "./MealModal.css";

const MealModal = ({ mealType, onClose, onConfirm }) => {
    const [sides, setSides] = useState([]);
    const [entrees, setEntrees] = useState([]);
    const [selectedSides, setSelectedSides] = useState([]);
    const [selectedEntrees, setSelectedEntrees] = useState([]);
    const [mealDetails, setMealDetails] = useState({ sides: 0, entrees: 0, price: 0 });

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("/api/getMenu?type=menu");
                const data = await response.json();
                setSides(data.filter((item) => item.category.toLowerCase() === "side"));
                setEntrees(data.filter((item) => item.category.toLowerCase() === "entree"));
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();

        const mealTypes = {
            Bowl: { sides: 1, entrees: 1, price: 8.30 },
            Plate: { sides: 1, entrees: 2, price: 10.00 },
            "Bigger Plate": { sides: 1, entrees: 3, price: 11.75 },
            "Cub Meal": { sides: 1, entrees: 1, price: 6.00 },
            "Family Meal": { sides: 2, entrees: 3, price: 32.00 },
        };

        setMealDetails(mealTypes[mealType]);
    }, [mealType]);

    const handleSelection = (type, itemName) => {
        if (type === "side") {
            setSelectedSides((prev) =>
                prev.includes(itemName)
                    ? prev.filter((name) => name !== itemName)
                    : prev.length < mealDetails.sides
                    ? [...prev, itemName]
                    : prev
            );
        } else if (type === "entree") {
            setSelectedEntrees((prev) =>
                prev.includes(itemName)
                    ? prev.filter((name) => name !== itemName)
                    : prev.length < mealDetails.entrees
                    ? [...prev, itemName]
                    : prev
            );
        }
    };

    const handleQuantityChange = (itemName, increment) => {
        setSelectedEntrees((prev) => {
            const updated = [...prev];
            if (increment > 0 && updated.length < mealDetails.entrees) {
                updated.push(itemName);
            } else if (increment < 0) {
                const index = updated.indexOf(itemName);
                if (index !== -1) updated.splice(index, 1);
            }
            return updated;
        });
    };

    const handleConfirm = () => {
        if (
            selectedSides.length === mealDetails.sides &&
            selectedEntrees.length === mealDetails.entrees
        ) {
            // Create the meal object
            const mealCartItem = {
                mealItem: mealType,
                sides: selectedSides,
                entrees: selectedEntrees,
                price: mealDetails.price,
                quantity: 1, // Default quantity
            };

            // Pass the meal object to the parent component via onConfirm
            onConfirm(mealCartItem);
            onClose();
        } else {
            alert(
                `Please select ${mealDetails.sides} sides and ${mealDetails.entrees} entrees.`
            );
        }
    };


    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" style={{ maxWidth: "900px" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Customize Your {mealType}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <section>
                            <h4 className="text-center">Sides (Select {mealDetails.sides})</h4>
                            <div className="row row-cols-4 g-3">
                                {sides.map((side) => (
                                    <div key={side.id} className="col">
                                        <button
                                            className={`btn w-100 ${
                                                selectedSides.includes(side.item_name)
                                                    ? "btn-success"
                                                    : "btn-outline-secondary"
                                            }`}
                                            onClick={() =>
                                                handleSelection("side", side.item_name)
                                            }
                                        >
                                            {side.item_name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mt-4">
                            <h4 className="text-center">Entrees (Select {mealDetails.entrees})</h4>
                            <div className="row row-cols-4 g-3">
                                {entrees.map((entree) => (
                                    <div key={entree.id} className="col">
                                        <button
                                            className={`btn w-100 ${
                                                selectedEntrees.includes(entree.item_name)
                                                    ? "btn-success"
                                                    : "btn-outline-secondary"
                                            }`}
                                            onClick={() =>
                                                handleSelection("entree", entree.item_name)
                                            }
                                        >
                                            {entree.item_name}
                                        </button>
                                        {selectedEntrees.includes(entree.item_name) &&
                                            mealDetails.entrees > 1 && (
                                                <div className="quantity-slider mt-2">
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() =>
                                                            handleQuantityChange(entree.item_name, -1)
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-2">
                                                        {
                                                            selectedEntrees.filter(
                                                                (e) => e === entree.item_name
                                                            ).length
                                                        }
                                                    </span>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() =>
                                                            handleQuantityChange(entree.item_name, 1)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealModal;
