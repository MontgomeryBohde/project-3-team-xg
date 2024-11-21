// src/app/employee/manager/orders/page.js
"use client";
import React, { useEffect, useState } from 'react';
import './OrderInfo.css';
import OrderCard from './OrderCard';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderInfo = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numPerPage = 3;

    const getOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
          //  console.log(data); 
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };
    
    
    useEffect(() => {
        getOrders();
    }, []);

    const indexOfLastOrder = currentPage * numPerPage;
    const indexOfFirstOrder = indexOfLastOrder - numPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const nextPage = () => {
        if (currentPage < Math.ceil(orders.length / numPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
          
          <EmployeeLogInHeader />
      
          <div className="order-info-container">
            <h1 className="title">Order Information</h1>
            <div className="order-cards-container">
              {currentOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
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
                disabled={currentPage === Math.ceil(orders.length/numPerPage)} 
                className="btn btn-info"
              >
                Next Page
              </button>
            </div>
            <div className="page-info mt-3 text-center">
              <p className="mb-0 fs-5 fw-bold">
                Page {currentPage} of {Math.ceil(orders.length / numPerPage)}
              </p>
            </div>
          </div>
     
        </div>
      );
      
};

export default OrderInfo;
