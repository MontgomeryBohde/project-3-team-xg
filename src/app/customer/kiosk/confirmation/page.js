"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Head from 'next/head';
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import Image from 'next/image';
import './confirmation.css';

/**
 * Creates Order Confirmation page. 
 * @returns Order Confirmation page that shows the order number and counts down to the next customer. 
 */
const CashConfirmation = () => {
	const [timeLeft, setTimeLeft] = useState(15);
	const [paymentMethod, setPaymentMethod] = useState("Cash");
	const [orderId, setOrderId] = useState(null); // State to store orderId
	const [isTrevorModeActive, setIsTrevorModeActive] = useState(false);
	const router = useRouter();

	useEffect(() => {
        const trevorModeState = sessionStorage.getItem('trevorModeActive');
        if (trevorModeState === "true") {
			setIsTrevorModeActive(true);
			import('./confirmation-trevor.css');

			// Play celebration audio
			const celebrationAudio = new Audio('/sounds/airhorn.mp3');
			celebrationAudio.volume = 0.2;
			celebrationAudio.play().catch((err) =>
				console.error('Audio play failed:', err)
			);
		}
    }, []);

	// Retrieve orderId and paymentMethod status from localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedOrderId = localStorage.getItem('orderId');
			const storedPaymentMethod = localStorage.getItem('paymentMethod');

			if (storedOrderId) setOrderId(storedOrderId);
			if (storedPaymentMethod) setPaymentMethod(storedPaymentMethod);
		}
	}, []);

	// Set up the timer countdown
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Redirect and reset Trevor Mode when timeLeft reaches 0
	useEffect(() => {
		if (timeLeft === 0) {
			// Delete old login info
			localStorage.removeItem('loggedInCustomer');
			localStorage.removeItem('loggedInCustomerName');

			// Reset Trevor Mode
			sessionStorage.setItem('trevorModeActive', "false");

			// Go to login page
			router.push('/customer/kiosk/login');
		}
	}, [timeLeft, router]);

	return (
		<div className={isTrevorModeActive ? "trevor-mode" : ""}>
			<Head>
				<title>Order Confirmed</title>
			</Head>
			<div>
				<CustomerHeader />
				<div className="confirm-content">
					<h3>Your Order Number is:</h3>
					<h1>{orderId || "Loading..."}</h1>
					{paymentMethod === 'Cash' && <h2>Please pay at counter.</h2>}
					<Image 
						src={isTrevorModeActive ? "/images/pandio.png" : "/panda-icon.png"} 
						alt={isTrevorModeActive ? "Pandio Icon" : "Panda Icon"} 
						width={100} 
						height={100} 
					/>
					<h2>Thank you!</h2>
					<h4>Exiting in {timeLeft} seconds...</h4>
				</div>
			</div>
		</div>
	);
};

export default CashConfirmation;
