"use client";
import React, { useEffect, useState } from 'react';
import './OrderInfo.css';
import OrderCard from './OrderCard';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';

const OrderInfo = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');  
    const numPerPage = 3;

    const getOrders = async () => {
        try {
            const response = await fetch('/api/getOrders');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    //sahow the order based on the entered ID
    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(searchQuery)
    );

    const indexOfLastOrder = currentPage * numPerPage;
    const indexOfFirstOrder = indexOfLastOrder - numPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredOrders.length / numPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <EmployeeLogInHeader />
            <div className="order-info-container">
                <h1 className="title">Order Information</h1>
                
                
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Order ID"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="order-cards-container">
                    {currentOrders.length > 0 ? (
                        currentOrders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onDelete={(id) => deleteOrder(id)}  //delete
                            />
                        ))
                    ) : (
                        <p>No orders found matching the search criteria.</p>
                    )}
                </div>

                {/*paage buttons*/}
                <div className="page-buttons d-flex justify-content-between">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="btn btn-info"
                    >
                        Previous Page
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(filteredOrders.length / numPerPage)}
                        className="btn btn-info"
                    >
                        Next Page
                    </button>
                </div>

                <div className="page-info mt-3 text-center">
                    <p className="mb-0 fs-5 fw-bold">
                        Page {currentPage} of {Math.ceil(filteredOrders.length / numPerPage)}
                    </p>
                </div>
            </div>
        </>
    );
};

export default OrderInfo;
