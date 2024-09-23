'use client'

import useCart from '@/hooks/useCart'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import Heading from '../components/Heading'
import Button from '../components/Button'
import ItemContent from './ItemContent'

import { useRouter } from 'next/navigation'

import { CartRemoveRequest, CartType, ProductCart } from '@/types/ProductTypes'
import { useEffect, useState } from 'react'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import handleApiCall from '@/services/handleApiCall'
import { showToastError } from '@/utils/util'


interface CartClientProps {
    currentUser: any,
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {


    const {
        handleRemoveProductsFromCart,
    } = useCart()
    const router = useRouter()
    const axiosAuth = useAxiosAuth();
    const [cart, setCart] = useState<CartType | null>(null)
    const [loading, setLoading] = useState(true);

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);




    useEffect(() => {
        const getCart = async () => {


            if (!currentUser) {
                setCart(null);
                setLoading(false)
                return;
            }
            const response = await handleApiCall(axiosAuth.get(`/cart/${currentUser.email}`));
            if (response && response.data) {
                setCart(response.data);
            } else {
                setCart(null);
            }
            setLoading(false);

        };
        getCart();
    }, [axiosAuth]);

    useEffect(() => {
        if (cart && selectedItems.length === cart.cartProducts.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedItems, cart]);
    if (loading) {
        return (
            <div className='flex flex-col items-center'>
                <div className='text-2xl mt-10 text-slate-400'>Loading...</div>
            </div>
        );
    }


    if (!cart) {
        return (
            <div className='flex flex-col items-center'>
                <div className='text-2xl mt-10'>Your cart is empty</div>


                <div>
                    <Link href={"/"}
                        className='flex text-slate-500 items-center ga-2 mt-2'
                    >
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>

                </div>
            </div>
        )
    }




    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allProductIds = cart?.cartProducts.map(product => product.id) || [];
            setSelectedItems(allProductIds);
        }
        setSelectAll(!selectAll);
    };

    const handleItemSelect = (id: string) => {
        let updatedSelectedItems;
        if (selectedItems.includes(id)) {
            console.log("id", id);
            console.log("selectedItems", selectedItems);
            updatedSelectedItems = selectedItems.filter((selectedId) => selectedId !== id);
;
            console.log("Updated ", updatedSelectedItems);

        } else {
            updatedSelectedItems = [...selectedItems, id];
        }
        console.log("Updated Selected", updatedSelectedItems);

        setSelectedItems(updatedSelectedItems);
    };



    const removeProductsFromCart = () => {
        if (selectedItems.length === 0) {
            showToastError("Vui lòng chọn sản phẩm muốn xóa");
        } else {
            handleRemoveProductsFromCart({
                userId: currentUser.email,
                productCartIds: selectedItems
            })
            setSelectedItems([]);
        }
    };


    return <div>
        <Heading title='Shopping Cart' center />
        <div className='grid grid-cols-5 text-sm font-semibold
        gap-4 pb-2 items-center mt-8'>
            <div className='col-span-2 justify-self-start'>Sản Phẩm</div>
            <div className='justify-self-center'>Giá</div>
            <div className='justify-self-center'>Số Lượng</div>
            <div className='justify-self-end'>Đơn giá</div>
        </div>

        <div>
            {cart.cartProducts && cart.cartProducts.map((productCart: ProductCart) => (
                <ItemContent
                    currentUserId={currentUser.email}
                    item={productCart}
                    key={productCart.id}
                    selectedItems={selectedItems}
                    handleItemSelect={handleItemSelect}  // Hàm xử lý khi checkbox thay đổi
                />
            ))}
        </div>
        <div className='sticky bottom-0 flex border-t-[1.5px] text-sm
         border-slate-200 py-1 justify-between gap-4 bg-white items-center'>

            <div className='flex flex-row gap-2 py-4 items-center'>
                <div className='flex gap-4'>
                    <input
                        type="checkbox"
                        className="w-[16px] h-[16px]"
                        checked={selectAll}
                        onChange={handleSelectAll} />
                    Chọn Tất Cả ({cart.cartProducts.length})
                </div>

                <div className='w-[90px] mx-4'>
                    <Button
                        label='Xóa'
                        onClick={() => removeProductsFromCart()}
                        small
                        outline
                        rounded
                    />
                </div>
            </div>




            <div className='text-sm flex flex-col gap-1 items-start w-[250px]'>
                <Button

                    label={'Mua Hàng'}

                    rounded

                    onClick={() => {
                        currentUser ? router.push('/checkout') : router.push('/login')
                    }} />

            </div>

        </div>

    </div>
    // </div >

}

export default CartClient
