// src/app/employee/manager/reports/page.js
"use client";

/**
 * @fileoverview This file contains the Page component for the employee manager reports.
 * It includes navigation functions to different report pages.
 * @module Page
 * @requires next/navigation
 * @requires @/components/ui/employee/header/EmployeeLogInHeader
 * @requires next/head
 */

import { useRouter } from "next/navigation";
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";
import Head from "next/head";

/**
 * Page component for the employee manager reports.
 * @returns {JSX.Element} The rendered component.
 */
const Page = () => {
    const router = useRouter();

    /**
     * Navigates to the Sales Report page.
     */
    const navigateToSales = () => {
        router.push("/employee/manager/reports/sales");
    };
    /**
     * Navigates to the Daily Reports page.
     */
    const navigateToDailyReports = () => {
        router.push("/employee/manager/reports/daily-reports");
    };
    /**
     * Navigates to the Menu Popularity page.
     */
    const navigateToMenuPopularity = () => {
        router.push("/employee/manager/reports/menu-popularity");
    };
    /**
     * Navigates to the Product Usage page.
     */
    const navigateToProductUsage = () => {
        router.push("/employee/manager/reports/product-usage");
    };

    return (
        <>
            <Head>
                <title>Reports</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="text-center m-4">
                <h2 className="m-5">Reports</h2>
                <div className="d-grid gap-2 col-6 mx-auto">
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
            </div>
        </>
    );
};

export default Page;