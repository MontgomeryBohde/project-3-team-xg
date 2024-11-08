"use client";
import React, { useEffect, useState } from 'react';
import './OrderInfo.css';
import OrderCard from './OrderCard';

const OrderInfo = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; 

    //will get info form the database in the future when in works 
    const getOrders = async () => {
        const sampleData = [
            { id: 1, time: '2024-10-31 14:30', type: 'Plate', contents: ['Steamed Rice', 'Broccoli Beef', 'Orange Chicken'], total: 12.99 },
            { id: 2, time: '2024-10-31 15:00', type: 'Bigger Plate', contents: ['Steamed Rice', 'Terriyaki Chicken', 'Spring Rolls'], total: 15.99 },
            { id: 3, time: '2024-10-31 15:15', type: 'Bowl', contents: ['Super Greens', 'Orange Chicken', 'Apple Pie Roll'], total: 10.49 },
            { id: 4, time: '2024-10-31 17:15', type: 'Bowl', contents: ['Chow Mein', 'Honey Walnut Shrimp'], total: 10.49 },
            { id: 5, time: '2024-10-31 17:15', type: 'Plate', contents: ['Chow Mein', 'Broccoli Beef', 'Beijing Beef', 'Dr. Pepper'], total: 10.49 },
            { id: 6, time: '2024-10-31 17:30', type: 'Plate', contents: ['Fried Rice', 'Kung Pao Chicken', 'Spring Rolls'], total: 11.99 },
            { id: 7, time: '2024-10-31 18:00', type: 'Bowl', contents: ['Brown Rice', 'Honey Walnut Shrimp'], total: 10.49 },
            { id: 8, time: '2024-10-31 18:15', type: 'Bigger Plate', contents: ['White Rice', 'Orange Chicken', 'Kung Pao Chicken', 'Chow Mein'], total: 16.49 },
            { id: 9, time: '2024-10-31 18:30', type: 'Plate', contents: ['Super Greens', 'Beijing Beef', 'Spring Rolls'], total: 13.49 },
            { id: 10, time: '2024-10-31 18:45', type: 'Plate', contents: ['Fried Rice', 'Broccoli Beef', 'Honey Walnut Shrimp'], total: 12.99 }
        ];
        setOrders(sampleData);
    };

    useEffect(() => {
        getOrders();
    }, []);

    //index range of the current orders on the page 
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    //go to next page
    const nextPage = () => {
        if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    //go to prev page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="order-info-container">
            <h1 className="title">Order Information</h1>
            <div className="order-cards-container">
                {currentOrders.map(order => (
                    <OrderCard key={order.id} order={order}/>
                ))}
            </div>
            <div className="page-buttons">
                <button onClick={prevPage} disabled={currentPage === 1}> 
                    Previous Page
                </button>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}>
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default OrderInfo;