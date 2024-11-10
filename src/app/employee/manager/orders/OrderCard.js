import 'bootstrap/dist/css/bootstrap.min.css';

const OrderCard = ({ order }) => {
    const totalAmount = typeof order.total === 'number' && !isNaN(order.total) ? order.total : 0;

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Left section (Order ID) */}
                    <div className="text-left">
                        <span className="h5">Order ID: {order.id}</span>
                    </div>

                    {/* Center section (Meal Type, Side, Entrees) */}
                    <div className="text-center">
                        {/* Meal Type Section */}
                        <div className="fs-4 fw-bold">Meal Type:</div>
                        <div className="fs-4">{order.meal_type || 'None'}</div>

                        {/* Sides Section - Placed above Entrees */}
                        {order.side && (
                            <div className="mt-3">
                                <div className="fs-4 fw-bold mt-2">Side(s):</div>
                                <div className="fs-5">{order.side}</div> {/* Display side name */}
                            </div>
                        )}

                        {/* Entrees Section */}
                        <div className="mt-3">
                            <div className="fs-4 fw-bold mt-2">Entrees/Food Items:</div>
                            
                            {/* Display entree names if they exist */}
                            {Array.isArray(order.entree_names) && order.entree_names.length > 0 ? (
                                order.entree_names.map((entree, index) => (
                                    <div key={index} className="fs-5">{entree}</div> // Displaying each entree name
                                ))
                            ) : (
                                <div className="fs-5"></div> // If no entree names, display "N/A"
                            )}

                            {/* Display side food names (food_names) if they exist */}
                            {Array.isArray(order.food_names) && order.food_names.length > 0 ? (
                                order.food_names.map((food, index) => (
                                    <div key={index} className="fs-5">{food}</div> // Displaying each side food name
                                ))
                            ) : null} {/* If no food names, nothing is displayed */}
                        </div>
                    </div>

                    {/* Right section (Price and Date/Time) */}
                    <div className="text-right">
                        <strong className="fs-5">Total:</strong> <span className="fs-5">${parseFloat(order.total).toFixed(2)}</span>
                        <div className="fs-5">
                            {/* Order Date/Time */}
                            <span>{new Date(order.time).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
