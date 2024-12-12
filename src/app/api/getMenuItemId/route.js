// app/api/getMenuItemId/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

/**
 * Handles GET requests to fetch the ID of a menu item by its name.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - The response object containing the menu item ID or an error message.
 */
export async function GET(request) {
    const connectionString = process.env.POSTGRES_URL;
    const client = new Client({ connectionString });

    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
        return NextResponse.json({ error: 'Missing name parameter' }, { status: 400 });
    }

    try {
        await client.connect();

        const menuItemResult = await client.query(
            'SELECT id FROM menu_items WHERE item_name = $1 LIMIT 1;',
            [name]
        );

        const menuItem = menuItemResult.rows[0];

        await client.end();

        if (menuItem) {
            return NextResponse.json({ id: menuItem.id });
        } else {
            return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json({ error: 'Failed to fetch menu item ID' }, { status: 500 });
    }
}
