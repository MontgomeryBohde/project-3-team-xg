"use client";

import dynamic from 'next/dynamic'
const CartPage = dynamic(() => import('./cart'), { ssr: false });

const CartPageWrapper = () => {
    return (
        <CartPage />
    );
};

export default CartPageWrapper;
