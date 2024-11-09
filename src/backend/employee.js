"use server";

import { Client } from 'pg';

export default async function getEmployees() {
    const connectionString = process.env.POSTGRES_URL;
    console.log('Creating Connection to:', connectionString);

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        console.log('Awaiting Connection');
        await client.connect();
        console.log('Connection Established');

        console.log('Fetching Employee Data');
        const result = await client.query('SELECT * FROM employees;');
        console.log('Employee data fetched:');
        console.log(result.rows);

        return result.rows;
    } catch (error) {
        console.error('Error during database operation:', error);
        throw new Error('Failed to fetch employee data');
    } finally {
        console.log('Closing Connection');
        await client.end();
        console.log('Connection Closed');
    }
}
