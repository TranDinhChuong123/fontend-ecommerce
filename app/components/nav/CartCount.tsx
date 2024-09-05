'use client'

import useCart from '@/hooks/useCart';
import { useRouter } from "next/navigation"
import { CiShoppingCart } from 'react-icons/ci';

const CartCount = () => {
    const router = useRouter();
    const { cartTotalQty } = useCart();

    return (
        <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <div className='text-3xl relative'>
                <CiShoppingCart />
                {cartTotalQty > 0 && (
                    <span className='absolute top-[-5px] right-[-10px]
                     flex items-center rounded-full bg-slate-700 text-white
                     h-5 w-5 text-xs justify-center
                     '>{cartTotalQty}</span>
                )}
            </div>
        </div>
    );
};

export default CartCount;
