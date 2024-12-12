// src/app/customer/kiosk/page.js
"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image';
import pandaIcon from '/public/panda-icon.png';

/**
 * KioskPage component renders the customer kiosk page.
 * It provides options to navigate to the meal selection page or back to the main page.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const KioskPage = () => {
    const router = useRouter();

    /**
     * Navigates to the Meal Selection page.
     */
    const navigateToMeal = () => {
        router.push("/customer/kiosk/login"); // Navigate to the Meal Selection page
    };

    /**
     * Navigates back to the Main Page.
     */
    const navigateToMainPage = () => {
        router.push("/customer/"); // Navigate back to the Main Page
    };

    return (
        <div className="customer-container d-flex align-items-center justify-content-center vh-100 position-relative">
            {/* Cool Background Effect */}
            <div className="background-effect"></div>

            <div className="text-center">
                {/* Header with Icon */}
                <div className="mb-4">
                    <Image src={pandaIcon} alt="Panda Express Icon" width={150} height={150} className="panda-icon" />
                </div>
                <h1 className="display-4 text-light mb-4">Welcome to the Kiosk!</h1>
                <p className="lead text-light mb-5">Start your order now</p>
                
                {/* Start Meal Selection Button */}                
                <button className="btn btn-outline-light btn-lg px-5 py-3 customer-button mb-4" onClick={navigateToMeal}>
                    Start making your order
                </button>

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

export default KioskPage;
