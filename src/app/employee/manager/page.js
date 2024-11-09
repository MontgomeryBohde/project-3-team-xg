"use client";
import React from 'react';
import Head from 'next/head';
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import 'bootstrap/dist/css/bootstrap.css';
import './managerHomePage.css';

const ManagerHomePage = () => {
    return (
        <div>
            <Head>
                <title>Manager Home</title>
            </Head>
            <EmployeeHeader />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <a href="/employee/manager/menu">Menu</a>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <a href="/employee/manager/orders">Orders</a>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <a href="/employee/manager/reports">Reports</a>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <a href="/employee/manager/inventory">Inventory</a>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <a href="/employee/manager/employeeinfo">Employee Info</a>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <a href="/employee/manager/contact">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerHomePage;