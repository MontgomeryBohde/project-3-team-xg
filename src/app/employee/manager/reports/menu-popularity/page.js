// src/app/employee/manager/reports/menu-popularity/page.js
"use client";

import { useEffect, useState } from 'react';
import EmployeeLogInHeader from '@/components/ui/employee/header/EmployeeLogInHeader';
import Head from 'next/head';

const MenuPopularity = () => {
    const [popularItems, setPopularItems] = useState([]);
    const [n, setN] = useState(3); // Set default value to 3

    useEffect(() => {
        async function fetchPopularItems() {
            try {
                const response = await fetch(`/api/getReports?type=popularity&n=${n}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch popular items');
                }
                const data = await response.json();
                setPopularItems(data);
            } catch (error) {
                console.error('Error fetching popular items:', error);
            }
        }

        fetchPopularItems();
    }, [n]); // Fetch popular items whenever `n` changes    

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
                            <th>Type</th>
                            <th>Category</th>
                            <th>Times Ordered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popularItems.length > 0 ? (
                            popularItems.map((item, index) => (
                                <tr key={item.menu_item_id || index}>
                                    <td>{index + 1}</td>
                                    <td>{item.food_name}</td>
                                    <td>{item.item_size}</td>
                                    <td>{item.menu_category}</td>
                                    <td>{item.times_ordered}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MenuPopularity;
