//daily reports (X-report, Z-report) page
// src/app/employee/manager/reports/daily-reports/page.js
"use client";
import { useRouter } from "next/navigation";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import Head from "next/head";

const Page = () => {
    const router = useRouter();

    const navigateToXReport = () => {
        router.push("/employee/manager/reports/daily-reports/X-Report");
    };
    const navigateToZReport = () => {
        router.push("/employee/manager/reports/daily-reports/Z-Report");
    };

    return (
        <>
            <Head>
                <title>Daily Reports</title>
            </Head>
            <EmployeeHeader />
            <div className="text-center m-4">
                <h2 className="m-5">Daily Reports</h2>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary btn-lg m-3" onClick={navigateToXReport}>
                        X-Report
                    </button>
                    <button className="btn btn-primary btn-lg m-3" onClick={navigateToZReport}>
                        Z-Report
                    </button>
                </div>
            </div>
        </>
    );
};

export default Page;
