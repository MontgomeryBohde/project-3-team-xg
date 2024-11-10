"use client";
import React, { useEffect, useState } from 'react';
import './OrderInfo.css';
import OrderCard from './OrderCard';

const OrderInfo = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const getOrders = async () => {
        try {
            const response = await fetch('/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const nextPage = () => {
        if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

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
