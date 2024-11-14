"use client";

import dynamic from 'next/dynamic'
const CartPage = dynamic(() => import('./CartPage'), { ssr: false });

const CartPageWrapper = () => {
    return (
        <CartPage />
    );
};

export default CartPageWrapper;
