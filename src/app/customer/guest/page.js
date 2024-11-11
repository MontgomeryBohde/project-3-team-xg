// src/app/employee/page.js
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import GuestLoginForm from "@/components/ui/customer/guest/GuestLoginForm";

const CustomerLoginPage = () => {
    return (
        <div>
            <EmployeeHeader />
            <GuestLoginForm />
        </div>
    );
};

export default CustomerLoginPage;
