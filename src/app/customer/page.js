// src/app/employee/page.js
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import CustomerLoginForm from "@/components/ui/customer/login/CustomerLoginForm";

const CustomerLoginPage = () => {
    const router = useRouter();

    const navigateToOrder = () => {
        router.push("/employee/cashier/order"); 
    };

    return (
        <div>
            <CustomerHeader />
            <CustomerLoginForm />
        </div>
    );
};

export default CustomerLoginPage;
