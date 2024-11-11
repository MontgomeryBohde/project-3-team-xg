import 'bootstrap/dist/css/bootstrap.min.css';

const OrderCard = ({ order }) => {
    const totalAmount = typeof order.total === 'number' && !isNaN(order.total) ? order.total : 0;

    return (
        <div className="card mb-3" style={{ backgroundColor: '#ADD8E4' }}> 
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    {/*LEFT*/}
                    <div className="text-left">
                        <span className="h5">Order ID: {order.id}</span>
                    </div>

                    {/*MID*/}
                    <div className="text-center">
                        {/*Meal Type*/}
                        <div className="fs-4 fw-bold">Meal Type:</div>
                        <div className="fs-4">{order.meal_type || 'N/A'}</div>

                        {/* Sides*/}
                        {order.side && (
                            <div className="mt-3">
                                <div className="fs-4 fw-bold mt-2">Side(s):</div>
                                <div className="fs-5">{order.side}</div> {/* Display side name */}
                            </div>
                        )}

                        {/*Entrees and Food Items*/}
                        <div className="mt-3">
                            <div className="fs-4 fw-bold mt-2">Entree(s):</div>
                            
                          
                            {Array.isArray(order.entree_names) && order.entree_names.length > 0 ? (
                                order.entree_names.map((entree, index) => (
                                    <div key={index} className="fs-5">{entree}</div> 
                                ))
                            ) : (
                                <div className="fs-5">N/A</div> //If no entree name "N/A"
                            )}

                            {/*Food names*/}
                            {Array.isArray(order.food_names) && order.food_names.length > 0 ? (
                                order.food_names.map((food, index) => (
                                    <div key={index} className="fs-5">{food}</div> 
                                ))
                            ) : null} 
                        </div>
                    </div>

                    {/*RIGHT*/}
                    <div className="text-right">
                        <strong className="fs-5">Total:</strong> <span className="fs-5">${parseFloat(order.total).toFixed(2)}</span>
                        <div className="fs-5">
                            {/*Date/Time*/}
                            <span>{new Date(order.time).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
