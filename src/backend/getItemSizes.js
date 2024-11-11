// getItemSizes.js
"use server";

import { Client } from 'pg';

export default async function getItemSizes() {
    const connectionString = process.env.POSTGRES_URL;
    console.log('Creating Connection to:', connectionString);

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        console.log('Awaiting Connection');
        await client.connect();
        console.log('Connection Established');

        console.log('Fetching Item Sizes Data');
        const itemSizesResult = await client.query('SELECT * FROM item_sizes;');
        const itemSizes = itemSizesResult.rows;

        console.log('Item sizes data fetched:', itemSizes);

        return itemSizes;
    } catch (error) {
        console.error('Error during database operation:', error);
        throw new Error('Failed to fetch item sizes');
    } finally {
        console.log('Closing Connection');
        await client.end();
        console.log('Connection Closed');
    }
}
