"use server";

import { Client } from 'pg';

export async function getCustomerByPhoneNumber(phoneNumber) {
    // remove parenthese and dashes from number
    const sanitizedPhoneNumber = phoneNumber.replace(/[()-]/g, '');

    const connectionString = process.env.POSTGRES_URL;

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        const result = await client.query('SELECT * FROM customers WHERE phone_number = $1', [sanitizedPhoneNumber]);
        await client.end();

        return result.rows[0];
    } catch (error) {
        console.error('Error during database operation:', error);
        await client.end();
        throw new Error('Failed to fetch employee data');
    }
}

export async function insertCustomer(customer) {
    const connectionString = process.env.POSTGRES_URL;

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        const result = await client.query('INSERT INTO customers (first_name, last_name, phone_number, email, rewards_points, is_guest) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [customer.first_name, customer.last_name, customer.phone_number, customer.email, customer.rewards_points, customer.is_guest]);
        await client.end();

        return;
    } catch (error) {
        console.error('Error during database operation:', error);
        await client.end();
        throw new Error('Failed to insert customer data');
    }
}