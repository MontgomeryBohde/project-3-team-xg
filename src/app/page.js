// src/app/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import './menu.css';

const Page = () => {
    const router = useRouter();

    const navigateToLogin = () => {
        router.push("/employee/login"); // Navigate to the login page
    };

    return (
        <div className="menuBoardContainer">
            <Image src="/meals.svg" title="Meals" alt="Meals" width={1260} height={896} />
            <Image src="/entrees.svg" title="Entrees" alt="Entrees" width={1260} height={896} />
            <Image src="/sides.svg" title="Sides" alt="Sides" width={1260} height={896} />
            <Image src="/more.svg" title="More" alt="More" width={1260} height={896} />
            
            {/* Navigation Button */}
            <button className="btn btn-primary mt-3" onClick={navigateToLogin}>
                Go to Employee Login
            </button>
        </div>
    );
};

export default Page;
