// src/app/customer/page.js
"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image';
import pandaIcon from '/public/panda-icon.png';

const CustomerPage = () => {
    const router = useRouter();

    const navigateToMenuBoard = () => {
        router.push("/customer/menu-board"); // Navigate to the Menu Board page
    };

    const navigateToKioskOrder = () => {
        router.push("/customer/kiosk"); // Navigate to the Kiosk Order page
    };

    const navigateToMobileOrder = () => {
        router.push("/customer/mobile"); // Navigate to the Mobile Order page
    };

    const navigateToMainPage = () => {
        router.push("/"); // Navigate back to the Main Page
    };

    return (
        <div className="customer-container d-flex align-items-center justify-content-center vh-100 position-relative">
            {/* Cool Background Effect */}
            <div className="background-effect"></div>

            <div className="text-center">
                {/* Header with Icon */}
                <div className="mb-4">
                    <Image src={pandaIcon} alt="Panda Express Icon" width={100} height={100} className="panda-icon" />
                </div>
                <h1 className="display-4 text-light mb-4">Welcome to Panda Express!</h1>
                <p className="lead text-light mb-5">Choose how you'd like to proceed</p>
                
                {/* Navigation Buttons */}
                <div className="d-flex flex-column gap-4">
                    <button className="btn btn-outline-light btn-lg px-5 py-3 customer-button" onClick={navigateToMenuBoard}>
                        Menu Board
                    </button>
                    <button className="btn btn-outline-light btn-lg px-5 py-3 customer-button" onClick={navigateToKioskOrder}>
                        Kiosk Order
                    </button>
                    <button className="btn btn-outline-light btn-lg px-5 py-3 customer-button" onClick={navigateToMobileOrder}>
                        Mobile Order
                    </button>
                </div>

                {/* Back Button */}
                <div className="mt-5">
                    <button className="btn btn-secondary btn-sm mb-2" onClick={navigateToMainPage}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;