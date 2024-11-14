// src/app/page.js
"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image';
import pandaIcon from '/public/panda-icon.png';

const Page = () => {
    const router = useRouter();

    const navigateToCustomer = () => {
        router.push("/customer"); // Navigate to the customer page (you can modify this path)
    };

    const navigateToEmployee = () => {
        router.push("/employee"); // Navigate to the employee login page
    };

    return (
        <div className="home-container d-flex align-items-center justify-content-center vh-100 position-relative">
            {/* Cool Background Effect */}
            <div className="background-effect"></div>

            <div className="text-center">
                {/* Header with Icon */}
                <div className="mb-4">
                    <Image src={pandaIcon} alt="Panda Express Icon" width={150} height={150} className="panda-icon" />
                </div>
                <h1 className="display-4 text-light mb-4">Welcome to Panda Express POS System</h1>
                <p className="lead text-light mb-5">Please choose your role to continue</p>
                
                {/* Navigation Buttons */}
                <div className="d-flex gap-5 justify-content-center">
                    <button className="btn btn-outline-light btn-lg px-5 py-3 home-button" onClick={navigateToCustomer}>
                        Customer
                    </button>
                    <button className="btn btn-outline-light btn-lg px-5 py-3 home-button" onClick={navigateToEmployee}>
                        Employee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
