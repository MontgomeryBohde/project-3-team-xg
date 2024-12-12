// src/app/employee/manager/reports/menu-popularity/page.js
"use client";

/**
 * @fileoverview This file contains the MenuPopularity component which fetches and displays the most popular menu items.
 * @requires react
 * @requires @/components/ui/employee/header/EmployeeLogInHeader
 * @requires next/head
 */

import { useEffect, useState } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head';


/**
 * MenuPopularity component fetches and displays the most popular menu items.
 * @component
 * @returns {JSX.Element} The MenuPopularity component.
 */
const MenuPopularity = () => {
    const [popularItems, setPopularItems] = useState([]);
    const [n, setN] = useState(3); // Set default value to 3

    /**
     * Fetches the most popular menu items from the API.
     * @async
     * @function fetchPopularItems
     * @returns {Promise<void>}
     */
    useEffect(() => {
        async function fetchPopularItems() {
            try {
                const response = await fetch(`/api/getReports?type=popularity&n=${n}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch popular items');
                }
                const { success, data } = await response.json();
                if (!success || !Array.isArray(data)) {
                    throw new Error('Invalid API response format');
                }
                setPopularItems(data);
            } catch (error) {
                console.error('Error fetching popular items:', error);
                setPopularItems([]); // Fallback to an empty array
            }
        }
    
        fetchPopularItems();
    }, [n]); // Refetch when `n` changes    

    /**
     * Handles the change in the number of items to display.
     * @function handleNChange
     * @param {Object} event - The event object.
     */
    const handleNChange = (event) => {
        const newN = parseInt(event.target.value, 10);
        if (newN > 0) {
            setN(newN);
        }
    };

    return (
        <>
            <Head>
                <title>Menu Popularity</title>
            </Head>
            <EmployeeLogInHeader />
            <div className="container mt-4">
                <h2 className="text-center">Most Popular Menu Items</h2>

                {/* Input for selecting the number of items to display */}
                <div className="mb-3">
                    <label htmlFor="itemCount" className="form-label">
                        Number of items to display:
                    </label>
                    <input
                        type="number"
                        id="itemCount"
                        className="form-control"
                        value={n}
                        onChange={handleNChange}
                        min="1"
                    />
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Menu Item</th>
                            <th>Category</th>
                            <th>Times Ordered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popularItems.length > 0 ? (
                            popularItems.map((item, index) => (
                                <tr key={item.food_name || index}>
                                    <td>{index + 1}</td>
                                    <td>{item.food_name}</td>
                                    <td>{item.menu_category}</td>
                                    <td>{item.times_ordered}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MenuPopularity;
