// src/app/customer/kiosk/page.js
"use client";

import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import './mobile.css';

const KioskPage = () => {
    const router = useRouter();

    const navigateToMeal = () => {
        router.push("/customer/mobile/meal"); // Navigate to the Meal Selection page
    };

    return (
        <div className="mobile-container d-flex align-items-center justify-content-center vh-100 position-relative">
            {/* Cool Background Effect */}
            <div className="background-effect"></div>

            <div className="text-center">
                <h1 className="display-4 text-light mb-4">Mobile Ordering</h1>
                <p className="lead text-light mb-5">Start your order now</p>
                
                {/* Start Meal Selection Button */}
                <button className="btn btn-outline-light btn-lg px-5 py-3 kiosk-button" onClick={navigateToMeal}>
                    Start Meal Selection
                </button>
            </div>
        </div>
    );
};

export default KioskPage;