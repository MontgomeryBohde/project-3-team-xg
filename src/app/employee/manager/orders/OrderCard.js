import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


const OrderCard = ({ order }) => {
    console.log(order); // Add this to see what the order object looks like
    const [showPopup, setShowPopup] = useState(false);
    const totalAmount = typeof order.total === 'number' && !isNaN(order.total) ? order.total : 0;

    const handleOpenPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

    return (
        <>
            {/* Main Order Card */}
            <div className="card mb-3" style={{ backgroundColor: '#ADD8E4' }} onClick={handleOpenPopup}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        {/* LEFT */}
                        <div className="text-left">
                            <span className="h5">Order ID: {order.id}</span>
                        </div>

                        {/* MID */}
                        <div className="text-center">
                        <div className="fs-4 fw-bold">Meal Type:</div>
                        <div className="fs-4">
                            {order.meal_type.length > 0 ? order.meal_type.join(', ') : 'N/A'}
                        </div>

                        {order.side && order.side.length > 0 && (
                            <div className="mt-3">
                                <div className="fs-4 fw-bold mt-2">Side(s):</div>
                                <div className="fs-5">{order.side.join(', ')}</div>
                            </div>
                        )}

                        <div className="mt-3">
                            <div className="fs-4 fw-bold mt-2">Entrees, Appetizers, and Drinks:</div>
                            {Array.isArray(order.entree_names) && order.entree_names.length > 0 ? (
                                order.entree_names.map((entree, index) => (
                                    <div key={index} className="fs-5">{entree}</div>
                                ))
                            ) : (
                                <div className="fs-5">N/A</div>
                            )}

                        
                            {Array.isArray(order.food_names) && order.food_names.length > 0 ? (
                                order.food_names.map((food, index) => (
                                    <div key={index} className="fs-5">{food}</div>
                                ))
                            ) : (
                                <div className="fs-5">None</div>
                            )}
                        </div>
                        </div>

                        {/* RIGHT */}
                        <div className="text-right">
                            <strong className="fs-5">Total:</strong> 
                            <span className="fs-5">${parseFloat(order.total).toFixed(2)}</span>
                            

                        </div>
                    </div>
                </div>
            </div>

            {/*Details Popup*/}
            <Modal show={showPopup} onHide={handleClosePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    
                
                    <p><strong>Total:</strong> ${parseFloat(order.total).toFixed(2)}</p>
                    <p><strong>Discounts:</strong> {order.discounts || 0}</p>
                    <p><strong>Date/Time:</strong> {new Date(order.time).toLocaleString()}</p>

                    {/* Show Payment Method in Popup */}
                    <p><strong>Payment Method:</strong> {order.payment_method || 'N/A'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePopup}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OrderCard;
