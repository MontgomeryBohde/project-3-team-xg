"use client";

import dynamic from 'next/dynamic'
const CartPage = dynamic(() => import('./cart'), { ssr: false });

/**
 * Wraps the CartPage component in a wrapper. Helps with using sessionStorage in the cart.
 *
 * @returns {JSX.Element} The wrapped CartPage component.
 */
const CartPageWrapper = () => {
    return (
        <CartPage />
    );
};

export default CartPageWrapper;
