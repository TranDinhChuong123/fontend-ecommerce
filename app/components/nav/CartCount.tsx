'use client'

import useCart from '@/hooks/useCart';
import { useRouter } from "next/navigation"
import { useEffect } from 'react';
import { PiShoppingCartThin } from "react-icons/pi";

const CartCount = () => {
    const router = useRouter();
    const { cartLength, setCartLength, handleCartProductsLength } = useCart();
    useEffect(() => {
        const getCartProductsLength = async () => {
            const res = await handleCartProductsLength()
            setCartLength(res.data || 0)
        }
        getCartProductsLength();
    }, [cartLength])

    return (
        <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <div className='text-3xl relative'>
                <PiShoppingCartThin className=''/>
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
