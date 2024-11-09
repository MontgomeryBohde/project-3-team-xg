"use client";
import React from 'react';
import Head from 'next/head';
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import Link from 'next/link';

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
                            <Link href="/employee/manager/menu">Menu</Link>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <Link href="/employee/manager/orders">Orders</Link>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <Link href="/employee/manager/reports">Reports</Link>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <Link href="/employee/manager/inventory">Inventory</Link>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <Link href="/employee/manager/employeeinfo">Employee Info</Link>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        <div className="btn btn-danger btn-square">
                            <Link href="/employee/manager/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerHomePage;