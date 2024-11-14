// src/app/employee/manager/page.js
"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import Head from 'next/head';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import './manager.css';

const ManagerHomePage = () => {
    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <div>
            <Head>
                <title>Manager Home</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-4 mb-2">
                        <button className="btn btn-danger btn-square" onClick={() => navigateTo('/employee/manager/menu')}>
                            Menu
                        </button>
                    </div>
                    <div className="col-4 mb-2">
                        <button className="btn btn-danger btn-square" onClick={() => navigateTo('/employee/manager/orders')}>
                            Orders
                        </button>
                    </div>
                    <div className="col-4 mb-2">
                        <button className="btn btn-danger btn-square" onClick={() => navigateTo('/employee/manager/reports')}>
                            Reports
                        </button>
                    </div>
                    <div className="col-4 mb-2">
                        <button className="btn btn-danger btn-square" onClick={() => navigateTo('/employee/manager/inventory')}>
                            Inventory
                        </button>
                    </div>
                    <div className="col-4 mb-2">
                        <button className="btn btn-danger btn-square" onClick={() => navigateTo('/employee/manager/employeeinfo')}>
                            Employee Info
                        </button>
                    </div>
                    <div className="col-4 mb-2">
                        <button className="btn btn-danger btn-square" onClick={() => navigateTo('/employee/manager/contact')}>
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerHomePage;
