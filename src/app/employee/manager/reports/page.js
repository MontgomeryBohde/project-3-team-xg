// reports menu page
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import Head from "next/head";

const Page = () => {
    const router = useRouter();

    const navigateToSales = () => {
        router.push("/employee/manager/reports/sales"); // Navigate to the reports menu page
    };
    const navigateToDailyReports = () => {
        router.push("/employee/manager/reports/sales"); // Navigate to the reports menu page
    };
    const navigateToMenuPopularity = () => {
        router.push("/employee/manager/reports/sales"); // Navigate to the reports menu page
    };
    const navigateToProductUsage = () => {
        router.push("/employee/manager/reports/sales"); // Navigate to the reports menu page
    };

    return (
        <>
            <Head>
                <title>Reports</title>
            </Head>
            <EmployeeHeader />
            <div className="reportsContainer text-center">
                {/* Navigation Button */}
                <button className="btn btn-primary btn-lg m-3" onClick={navigateToSales}>
                    Sales Report
                </button>
                <button className="btn btn-primary btn-lg m-3" onClick={navigateToDailyReports}>
                    Daily Reports
                </button>
                <button className="btn btn-primary btn-lg m-3" onClick={navigateToMenuPopularity}>
                    Menu Items Popularity
                </button>
                <button className="btn btn-primary btn-lg m-3" onClick={navigateToProductUsage}>
                    Product Usage Chart
                </button>
            </div>
        </>
    );
};

export default Page;
