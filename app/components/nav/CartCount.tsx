'use client'

import useCurrentUser from '@/actions/useCurrentUser ';
import useCart from '@/hooks/useCart';
import { useRouter } from "next/navigation"
import { useEffect } from 'react';
import { PiShoppingCartThin } from "react-icons/pi";

const CartCount = () => {
    const router = useRouter();
    const { cartLength, setCartLength, handleCartProductsLength } = useCart();
    const currentUser = useCurrentUser();
    useEffect(() => {
        const getCartProductsLength = async () => {
            if (!currentUser) return;
            const res = await handleCartProductsLength()
            setCartLength(res.data || 0)
        }
        getCartProductsLength();
    }, [currentUser, cartLength])

    const handleClick = () => {
        if (!currentUser) return router.push('/auth/login');
        router.push('/cart');
    }

    return (
        <div className="relative cursor-pointer" onClick={() => handleClick()}>
            <div className='text-3xl relative'>
                <PiShoppingCartThin className='' />
                {cartLength > 0 && (
                    <span className='absolute top-[-5px] right-[-10px]
                     flex items-center rounded-full bg-slate-700 text-white
                     h-5 w-5 text-xs justify-center
                     '>{cartLength}</span>
                )}
            </div>
        </div>
    );
};

export default CartCount;
