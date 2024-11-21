// src/app/employee/manager/page.js
"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import { FaUtensils, FaClipboardList, FaChartLine, FaBoxes, FaUserTie, FaPhone } from 'react-icons/fa';
import './manager.css'; // Import the external CSS

const ManagerHomePage = () => {
    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };

    const buttonConfig = [
        { label: 'Menu', path: '/employee/manager/menu', icon: <FaUtensils size={40} className="mb-2" /> },
        { label: 'Orders', path: '/employee/manager/orders', icon: <FaClipboardList size={40} className="mb-2" /> },
        { label: 'Reports', path: '/employee/manager/reports', icon: <FaChartLine size={40} className="mb-2" /> },
        { label: 'Inventory', path: '/employee/manager/inventory', icon: <FaBoxes size={40} className="mb-2" /> },
        { label: 'Employee Info', path: '/employee/manager/employeeinfo', icon: <FaUserTie size={40} className="mb-2" /> },
        { label: 'Contact', path: '/employee/manager/contact', icon: <FaPhone size={40} className="mb-2" /> },
    ];

    return (
        <div>
            <EmployeeLogInHeader />
            <div className="container mt-3">
                <h1 className="text-center text-primary fw-bold mb-4 manager-dashboard-title">
                    Manager Dashboard
                </h1>
                <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                    {buttonConfig.map(({ label, path, icon }) => (
                        <div key={label} className="col d-flex justify-content-center">
                            <button
                                onClick={() => navigateTo(path)}
                                className="manager-dashboard-button"
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagerHomePage;
