"use client";

import dynamic from 'next/dynamic'
const CustomerMealSelect = dynamic(() => import('./meal'), { ssr: false });

const CustomerMealSelectWrapper = () => {
    return (
        <CustomerMealSelect />
    );
};

export default CustomerMealSelectWrapper;