// contact maintenance page
"use client";

import { useState } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';

const ContactPage = () => {
	return (
		<>
			<Head>
				<title>Contact Maintenance</title>
			</Head>
			<EmployeeLogInHeader />
			<ContactForm />
		</>
	);
};

const ContactForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div id="form-wrapper">
			<form className="p-4" onSubmit={handleSubmit}>
				<div className="form-group m-3">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						placeholder="Manager Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-group m-3">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group m-3">
					<label htmlFor="description">Description of Issue</label>
					<p><small>
						Please describe the steps done to create the error or bug and what the error looked like.
					</small></p>
					<textarea
						className="form-control"
						id="description"
						placeholder="Enter detailed description of issue"
						value={description}
						onChange={(e) => setDescription(e.target.value)}></textarea>
				</div>
				<div className="container">
					<div className="row">
						<div className="col text-center">
							<button type="submit" className="btn btn-primary bg-danger m-3">Submit</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ContactPage;
