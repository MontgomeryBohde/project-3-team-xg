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

        console.log('Fetching Menu Items Data');
        const menuItemsResult = await client.query('SELECT * FROM menu_items;');
        const itemSizesResult = await client.query('SELECT * FROM item_sizes;');
        
        const menuItems = menuItemsResult.rows;
        const itemSizes = itemSizesResult.rows;

        console.log('Menu items data fetched:', menuItems);
        console.log('Item sizes data fetched:', itemSizes);

        return { menuItems, itemSizes };
    } catch (error) {
        console.error('Error during database operation:', error);
        throw new Error('Failed to fetch menu items or item sizes');
    } finally {
        console.log('Closing Connection');
        await client.end();
        console.log('Connection Closed');
    }
}
