'use client'

import useCart from '@/hooks/useCart'
import Link from 'next/link'
import Heading from '../components/Heading'
import Button from '../components/Button'
import ItemContent from './ItemContent'
import { useRouter } from 'next/navigation'
import { AddressType, CartType, ProductCart } from '@/types/ProductTypes'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import handleApiCall from '@/services/handleApiCall'
import { calculateDiscountedPrice, formatPrice, showToastError, showToastSuccess } from '@/utils/util'
import RenderIf from '@/utils/RenderIf'
import AddressForm from '../components/cart/AddressForm'
import BackDrop from '../components/nav/BackDrop'
import { HiShoppingBag } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineUpdate } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
interface CartClientProps {
    currentUser: any,
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {

    const {
        setCartLength,
        handleRemoveProductsFromCart,
    } = useCart()
    const router = useRouter()
    const axiosAuth = useAxiosAuth();
    const [cart, setCart] = useState<CartType | null>(null)
    const [addresses, setAddresses] = useState<AddressType[] | []>([])
    const [loading, setLoading] = useState(true);
    const [isFormSuccess, setIsFormSuccess] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    useEffect(() => {
        const updateCart = async () => {
            const response = await handleApiCall(axiosAuth.put(`/cart/update-checked-status`, {
                cartId: cart?.cartId,
                cartProductIds: selectedItems,
            }));
            if (!response) {
                console.error("Error updating cart checked");
                return;
            }
        }
        updateCart();
    }, [selectedItems]);

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
                const listProductCartIds = response.data.cartProducts
                    .filter((item: ProductCart) => item.isChecked === true)
                    .map((item: ProductCart) => item.id);
                setCartLength(response.data.cartProducts.length);
                console.log(response.data.cartProducts.length);

                setSelectedItems(listProductCartIds);
                setIsUpdateQuantity(false)
            } else {
                setCart(null);
            }
            setLoading(false);
        };
        getCart();
    }, [currentUser, axiosAuth, isUpdateQuantity]);

    useEffect(() => {
        const getAddressesByUser = async () => {
            if (!currentUser) return;
            const response = await handleApiCall(axiosAuth.get(`/user/${currentUser.email}/addresses`));
            setAddresses(response.data || []);
        };
        getAddressesByUser();
    }, [currentUser, axiosAuth])

    useEffect(() => {
        if (cart && selectedItems.length === cart.cartProducts.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedItems, cart]);

    const totalAmount = useMemo(() => {
        return formatPrice(
            cart?.cartProducts.filter(p => p.isChecked).reduce(
                (acc, item) => acc + calculateDiscountedPrice(item.price, item.discountPercent) * item.buyQuantity,
                0
            ) || 0
        );
    }, [cart]);

    if (loading) {
        return (
            <div className='flex flex-col items-center'>
                <div className='text-xl mt-10 text-slate-400 flex flex-row items-center gap-2'>
                    <MdOutlineUpdate size={20} />
                    loading...
                </div>
            </div>
        );
    }

    if (!cart || cart.cartProducts.length === 0) {
        return (
            <div className='flex flex-col items-center m-20'>
                <FaBagShopping  className='text-teal-600' size={100} />
                <div className='text-xl m-5'>Giỏ hàng của bạn còn trống</div>
                <div>
                    <Link href={"/"} className='flex text-slate-500 items-center ga-2 mt-2'>
                        <div className='w-[400px]'>
                            <Button
                                label="Mua Sắm"
                                rounded
                                icon={FaCartShopping}
                                styleIcon='text-white'
                            />
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

    const handleSelectAll = () => {
        const allProductIds = cart?.cartProducts.map(product => product.id) || [];
        setSelectedItems(selectAll ? [] : allProductIds);
        setCart(prevCart => ({
            ...prevCart!,
            cartProducts: prevCart!.cartProducts.map(product => ({
                ...product,
                isChecked: !selectAll
            }))
        }));
        setSelectAll(!selectAll);
    };


    const handleItemSelect = (id: string) => {
        let updatedSelectedItems;
        if (selectedItems.includes(id)) {
            updatedSelectedItems = selectedItems.filter((selectedId) => selectedId !== id);
        } else {
            updatedSelectedItems = [...selectedItems, id];
        }
        setSelectedItems(updatedSelectedItems);
        setCart(prevCart => ({
            ...prevCart!,
            cartProducts: prevCart!.cartProducts.map(product => ({
                ...product,
                isChecked: product.id === id ? !product.isChecked : product.isChecked
            }))
        }));
    };
    const removeProductsFromCart = async () => {
        if (selectedItems.length === 0) return showToastError("Vui lòng chọn sản phẩm muốn xóa");
        console.log("selectedItems", selectedItems);

        const resData = await handleRemoveProductsFromCart({ cartId: cart!.cartId, cartProductIds: selectedItems });
        if (resData) {
            showToastSuccess("Xóa sản phẩm thành công");
            setSelectedItems([]);
            const updatedCart = await handleApiCall(axiosAuth.get(`/cart/${currentUser.email}`));
            setCart(updatedCart?.data || null);
            setCartLength(updatedCart?.data?.cartProducts.length || 0);
        } else {
            showToastError("Xóa sản phẩm thất bại");
        }
    };

    const handlePurchase = () => {
        console.log("addresses", addresses);
        console.log("!isFormSuccess", !isFormSuccess);
        if (selectedItems.length === 0) return showToastError("Vui lòng chọn sản phẩm muốn mua");
        if (addresses.length === 0 && !isFormSuccess) {
            setIsOpen(true);
        } else {
            router.push('/checkout');
        }
    };



    console.log(addresses);
    
    return <div>
        <Heading title='Giỏ Hàng' center />
        <div className='grid grid-cols-5 text-sm font-semibold
        gap-4 pb-2 items-center mt-8'>
            <div className='col-span-2 justify-self-start'>Sản Phẩm</div>
            <div className='justify-self-center'>Đơn Giá</div>
            <div className='justify-self-center'>Số Lượng</div>
            <div className='justify-self-end'>Số Tiền</div>
        </div>

        <div>
            {cart.cartProducts && cart.cartProducts.map((productCart: ProductCart) => (
                <ItemContent
                    handleSetIsUpdateQuantity={setIsUpdateQuantity}
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
                        onClick={removeProductsFromCart}
                        small
                        outline
                        rounded
                    />
                </div>
            </div>

            <div className='text-sm flex flex-row gap-0 w-[500px] items-center '>
                <div className='w-[700px] flex flex-row gap-2 items-center'>
                    <div className='flex flex-col items-center'>
                        <p>({selectedItems.length} sản phẩm)</p>
                        <p className='text-md font-medium text-base'>Tổng Thanh Toán :</p>
                    </div>
                    <p className='text-rose-500 text-xl font-semibold'>{totalAmount}</p>
                </div>

                <Button
                    label={'Mua Hàng'}
                    rounded
                    onClick={handlePurchase}
                />

            </div>
            <RenderIf isTrue={isOpen}>
                <AddressForm setIsFormSuccess={setIsFormSuccess} onClose={toggleOpen} email={currentUser.email} />
                <BackDrop onClick={toggleOpen} />
            </RenderIf>


        </div>

    </div >
    // </div >

}

export default CartClient
