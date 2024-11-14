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