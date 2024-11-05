// contact maintenance page
"use client";
import React from 'react';
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import 'bootstrap/dist/css/bootstrap.css';
import './ManagerHomePage.css';

const ManagerHomePage = () => {
    return (
        <html>
            <head>
                <title>Manager Home</title>
            </head>
            <body>
                <EmployeeHeader />
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-4 mb-2">
                            <div className="btn btn-danger btn-square">
                                <a href="/route1">Route 1</a>
                            </div>
                        </div>
                        <div className="col-4 mb-2">
                            <div className="btn btn-danger btn-square">
                                <a href="/route2">Route 2</a>
                            </div>
                        </div>
                        <div className="col-4 mb-2">
                            <div className="btn btn-danger btn-square">
                                <a href="/route3">Route 3</a>
                            </div>
                        </div>
                        <div className="col-4 mb-2">
                            <div className="btn btn-danger btn-square">
                                <a href="/route4">Route 4</a>
                            </div>
                        </div>
                        <div className="col-4 mb-2">
                            <div className="btn btn-danger btn-square">
                                <a href="/route5">Route 5</a>
                            </div>
                        </div>
                        <div className="col-4 mb-2">
                            <div className="btn btn-danger btn-square">
                                <a href="/route6">Route 6</a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default ManagerHomePage;