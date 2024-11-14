"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Head from 'next/head';
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import './confirmation.css';

const CashConfirmation = () => {
	const [timeLeft, setTimeLeft] = useState(15);
	const [paymentMethod, setPaymentMethod] = useState("Cash");
	const router = useRouter();

	// Set up the timer countdown
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedPaymentMethod = localStorage.getItem('paymentMethod');
			if (storedPaymentMethod) {
				setPaymentMethod(storedPaymentMethod);
			}
		}

		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Redirect when timeLeft reaches 0
	useEffect(() => {
		if (timeLeft === 0) {
			router.push('/');
		}
	}, [timeLeft, router]);

	return (
		<>
			<Head>
				<title>Order Confirmed</title>
			</Head>
			<div>
				<CustomerHeader />
				<div className="confirm-content">
					<h3>Your Order Number is:</h3>
					<h1>123456</h1>
					{paymentMethod === 'Cash' && <h2>Please pay at counter.</h2>}
					<Image src="/panda-icon.png" alt="Panda Icon" width={100} height={100} />
					<h2>Thank you!</h2>
					<h4>Exiting in {timeLeft} seconds...</h4>
				</div>
			</div>
		</>
	);
};

export default CashConfirmation;
