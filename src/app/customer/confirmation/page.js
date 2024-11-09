"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import './confirmation.css';

const CashConfirmation = () => {
  const [timeLeft, setTimeLeft] = useState(15); // Starting with 5 seconds
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // TODO: define this in cart page
  const router = useRouter();

  useEffect(() => {
	// Check if 'paymentMethod' exists in localStorage
    const storedPaymentMethod = localStorage.getItem('paymentMethod');
	if(storedPaymentMethod)
	{
		setPaymentMethod(storedPaymentMethod); // Set the payment method state
	}

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          router.push('/'); // TODO: Redirect to correct page
          clearInterval(timer);  // Clear the interval once redirection happens
          return prevTime;
        }
        return prevTime - 1; // Decrease the time by 1 second
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <head>
        <title>Order Confirmed</title>
      </head>
      <body>
        <EmployeeHeader />
		<div className="confirm-content"> 
			<h3>Your Order Number is: </h3>
			<h1>123456</h1>

			{/* Conditionally render the "Please pay at counter." message */}
				{paymentMethod === 'Cash' && (
				<h2>Please pay at counter.</h2>
			)}

			<Image src="/panda-icon.png" alt="Panda Icon" width={100} height={100} />
			<h2>Thank you!</h2>

			{/* Display the time left before redirection */}
			<h4>Exiting in {timeLeft} seconds...</h4>
		</div>
      </body>
    </>
  );
};

export default CashConfirmation;
