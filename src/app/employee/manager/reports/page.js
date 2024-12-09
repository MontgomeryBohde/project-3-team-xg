// src/app/employee/manager/reports/page.js
"use client";
import { useRouter } from "next/navigation";
import EmployeeLogInHeader from "@/components/ui/employee/header/EmployeeLogInHeader";
import Head from "next/head";

const Page = () => {
    const router = useRouter();

    const navigateToSales = () => {
        router.push("/employee/manager/reports/sales");
    };
    const navigateToMenuPopularity = () => {
        router.push("/employee/manager/reports/menu-popularity");
    };
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