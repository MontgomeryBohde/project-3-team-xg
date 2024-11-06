// contact maintenance page
"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import 'bootstrap/dist/css/bootstrap.css';

const ContactPage = () => {
	return (
		<html>
			<head>
				<title>Contact Maintenance</title>
			</head>
			<body>
				<EmployeeHeader />
				<ContactForm />
			</body>
		</html>
	);
};

const ContactForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [description, setDescription] = useState('');
	const router = useRouter();

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div id="form-wrapper">
			<form class="p-4" onSubmit={handleSubmit}>
				<div className="form-group m-3">
					<label for="name">Name</label>
					<input
						type="text"
						class="form-control"
						id="name"
						placeholder="Manager Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div class="form-group m-3">
					<label for="email">Email</label>
					<input
						type="email"
						class="form-control"
						id="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div class="form-group m-3">
					<label for="description">Description of Issue</label>
					<p><small>
						Please describe the steps done to create the error or bug and what the error looked like.
					</small></p>
					<textarea
						class="form-control"
						id="description"
						placeholder="Enter detailed description of issue"
						value={description}
						onChange={(e) => setDescription(e.target.value)}></textarea>
				</div>
				<div class="container">
					<div class="row">
						<div class="col text-center">
							<button type="submit" className="btn btn-primary bg-danger m-3">Submit</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ContactPage;
