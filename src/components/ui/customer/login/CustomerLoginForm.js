// src/components/ui/customer/login/CustomerLoginForm.js
"use client";

import { getCustomerByPhoneNumber } from '@/backend/customer';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';

const CustomerLoginForm = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [code, setCode] = useState('');
	const [error, setError] = useState(null);
	const router = useRouter();

	// Handle form submission
	const handleLogin = async (event) => {
		event.preventDefault();

		// Reset error state
		setError(null);

		const customer = await getCustomerByPhoneNumber(phoneNumber);

		if (!customer) {
			setError("Customer not Found");
			return;
		} else {
			// store this employee in local storage
			window.sessionStorage.setItem('loggedInCustomer', JSON.stringify(customer));
		}

		// Validate password
		if (code !== "1234") {
			setError("No login found for code. Please enter a valid code.");
			return;
		}
		router.push("/customer/kiosk/menuselection/");
	};

	const navigateToKioskPage = () => {
		router.push("/customer/kiosk"); // Navigate back to the Kiosk Page
	};

	return (
		<div id="form-wrapper" className="bg-light p-4 rounded shadow-sm">
			<h1 className="text-center mb-4">Login</h1>
			<form onSubmit={handleLogin}>
				<div className="form-group mb-3">
					<label htmlFor="user-id">Phone Number</label>
					<input
						type="tel"
						className="form-control"
						id="user-phone"
						placeholder="(123)-456-7890"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="user-password">Enter 4 Digit Code from App</label>
					<input
						type="text"
						className="form-control"
						id="user-code"
						placeholder="1234"
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
				</div>

				{error && (
					<div className="alert alert-danger mb-3">
						{error}
					</div>
				)}

				<button type="submit" className="btn btn-danger w-100">
					Submit
				</button>
			</form>
			<button type="button" className="btn btn-secondary w-100 mt-3" onClick={() => router.push('/customer/kiosk/guest/')}>
				Guest Login
			</button>
			<button type="button" className="btn btn-secondary w-100 mt-3" onClick={navigateToKioskPage}>
				Back to Customer Page
			</button>
		</div>
	);
};

export default CustomerLoginForm;
