"use client";

import React, { useEffect, useState } from 'react';
import getMenuItems from '@/backend/menuItems';
import '../../../menu.css';

const Page = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const data = await getMenuItems();
                console.log('Menu Items:', data);
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <div>
            <h1>Menu Items</h1>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <h2>{item.food_name}</h2>
                        <p>{item.item_size}</p>
                        <p>${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;