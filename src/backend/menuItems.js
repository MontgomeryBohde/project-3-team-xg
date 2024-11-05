"use server";

import { Client } from 'pg';

export default async function getMenuItems() {
    const connectionString = process.env.POSTGRES_URL;
    console.log('Creating Connection to:', connectionString);

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        console.log('Awaiting Connection');
        await client.connect();
        console.log('Connection Established');

        console.log('Fetching Menu Items');
        const result = await client.query('SELECT * FROM menu_items;');
        console.log('Menu items fetched:');
        console.log(result.rows);

        return result.rows;
    } catch (error) {
        console.error('Error during database operation:', error);
        throw new Error('Failed to fetch menu items');
    } finally {
        console.log('Closing Connection');
        await client.end();
        console.log('Connection Closed');
    }
}