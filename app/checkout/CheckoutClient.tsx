'use client'

import useAxiosAuth from '@/hooks/useAxiosAuth'
import handleApiCall from '@/services/handleApiCall'
import { AddressType, ProductCart } from '@/types/ProductTypes'
import RenderIf from '@/utils/RenderIf'
import { calculateDiscountedPrice, formatPrice, showToastError } from '@/utils/util'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaHandHoldingUsd } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { HiCreditCard, HiShoppingBag } from "react-icons/hi2"
import { IoBagCheckOutline } from "react-icons/io5"
import { MdOutlineUpdate } from "react-icons/md"
import { RiMapPin2Line } from "react-icons/ri"
import Button from '../components/Button'
import ListAddress from '../components/checkout/ListAddress'
import Heading from '../components/Heading'
import BackDrop from '../components/nav/BackDrop'
import ItemProduct from './ItemProduct'
import { IoMdCheckmark } from "react-icons/io";

interface CartClientProps {
    currentUser: any,
}

const CheckoutClient: React.FC<CartClientProps> = ({ currentUser }) => {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const router = useRouter()
    const axiosAuth = useAxiosAuth();
    const [cartProducts, setCartProducts] = useState<ProductCart[] | []>([])
    const [address, setAddress] = useState<AddressType | null>(null)
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState(0);
    const [updateDefaultAddress, setUpdateDefaultAddress] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CASH_ON_DELIVERY');
    const [isCreateOrder, setIsCreateOrder] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    useEffect(() => {
        const getCart = async () => {
            if (!currentUser) {
                setCartProducts([]);
                setLoading(false)
                return;
            }
            const response = await handleApiCall(axiosAuth.get(`/cart/${currentUser.email}`));
            if (response && response.data) {
                const listProductCarts = response.data.cartProducts
                    .filter((item: ProductCart) => item.isChecked === true)
                setCartProducts(listProductCarts);


            } else {
                setCartProducts([]);
            }
            setLoading(false);

        };
        getCart();

        const getWalletUser = async () => {
            const response = await handleApiCall(axiosAuth.get(`/user/wallet`));
            if (response && response.data) {
                setWallet(response.data);
            } else {
                console.log("error wallet");
            }

        }
        getWalletUser();

    }, [currentUser, axiosAuth]);
    localStorage.setItem('listProductCarts', JSON.stringify(cartProducts));

    useEffect(() => {
        const getAddressesByUser = async () => {
            if (!currentUser) {
                return;
            }
            const response = await handleApiCall(axiosAuth.get(`/user/${currentUser.email}/addresses`));
            if (response && response.data) {
                const address = response.data.find((item: AddressType) => item.state === true)
                setAddress(address);
                setUpdateDefaultAddress(false);
            } else {
                setAddress(null);
            }
        };
        getAddressesByUser();
    }, [currentUser, axiosAuth, updateDefaultAddress]);

    const totalAmount = useMemo(() => {
        return cartProducts.filter(p => p.isChecked).reduce(
            (acc, item) => acc + calculateDiscountedPrice(item.price, item.discountPercent) * item.buyQuantity,
            0
        ) || 0
            ;
    }, [cartProducts]);

    const handleCheckout = async () => {
        if (selectedPaymentMethod === 'CREDIT_CARD') {
            localStorage.setItem('totalPrice', (totalAmount + 30000).toString());
            router.push('/checkout/payment');
        } else if (selectedPaymentMethod === 'CASH_ON_DELIVERY') {

            const resData = await handleApiCall(axiosAuth.post('/order/create', {
                feeShip: 30000,
                totalPrice: totalAmount + 30000,
                orderProducts: cartProducts,
                payment: {
                    paymentMethod: 'CASH_ON_DELIVERY',
                    paymentStatus: 'PENDING',
                }
            }));

            if (resData) {
                setIsCreateOrder(true);
            } else {
                console.log("Lỗi tạo đơn hàng", resData);
            }
            console.log("resData", resData);
        } else if (selectedPaymentMethod === "WALLET") {
            const resData = await handleApiCall(axiosAuth.post('/order/create', {
                feeShip: 30000,
                totalPrice: totalAmount + 30000,
                orderProducts: cartProducts,
                payment: {
                    paymentMethod: 'WALLET',
                    paymentStatus: 'COMPLETED',
                }
            }));

            if (resData) {
                setIsCreateOrder(true);
            } else {
                console.log("Lỗi tạo đơn hàng", resData);
            }
        };
    }
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
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className='flex flex-col items-center m-20'>
                <HiShoppingBag className='text-teal-600' size={100} />
                <div className='text-2xl m-5'>Giỏ hàng của bạn còn trống</div>


                <div>
                    <Link href={"/"}
                        className='flex text-slate-500 items-center ga-2 mt-2'
                    >
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
    if (isCreateOrder) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div>
                    <div className="text-teal-700 text-center py-2">
                        Thanh toán thành công
                    </div>
                    <div className="text-teal-800 text-center">
                        <Button
                            label="Xem đơn hàng"
                            onClick={() => router.push('/user/purchase')}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return <div className='text-slate-700'>
        <div className='bg-white rounded-md px-8 py-4 shadow-md'>
            <div className='flex flex-row gap-2 text-xl  items-center'>
                <RiMapPin2Line />
                <p> Địa chỉ nhận hàng</p>
            </div >
            <div className='flex flex-row gap-5 items-center'>
                <RenderIf isTrue={address !== null}>
                    <>
                        <p>{address?.name}</p>
                        <p>{address?.phoneNumber}</p>
                        <p>{address?.street}</p>
                    </>
                </RenderIf>
                <div>
                    <button className='flex flex-row h-10 items-center gap-2 justify-center text-blue-500'
                        onClick={() => setIsOpen(true)}
                    >
                        <p>Thay đổi</p>
                    </button>
                </div>
            </div>
        </div>
        <hr className='my-3' />
        <div className='grid grid-cols-5 text-sm text-slate-500
        gap-4 pb-2 items-center mt-2 bg-white rounded-md px-8 py-4'>
            <div className='col-span-2 justify-self-start'>Sản phẩm</div>
            <div className='justify-self-center'>Đơn giá</div>
            <div className='justify-self-center'>Số lượng</div>
            <div className='justify-self-end'>Thành tiền</div>
        </div>

        <div className='bg-white rounded-md px-8 py-4 shadow-md'>
            {cartProducts && cartProducts.map((productCart: ProductCart) => (
                <ItemProduct
                    item={productCart}
                    key={productCart.id}
                />
            ))}
        </div>
        <hr className='my-5' />
        <div className='flex flex-row gap-10 items-center justify-end bg-white rounded-md px-8 py-4'>
            <p className='font-bold text-xl'>Phương thức thanh toán </p>

            <div className='flex flex-row gap-2'>

                <div className='w-[240px]'>

                    <button
                        className={`relative flex flex-row border rounded-md w-full py-2 items-center justify-evenly 
                            ${selectedPaymentMethod === "WALLET"
                                ? "border-[2px] border-blue-500 " : ""}
                                
                            ${wallet < 30000 + totalAmount
                                ? "text-slate-300 " : ""} 
                                `}
                        onClick={() => {
                            if (wallet < 30000 + totalAmount) {
                                showToastError("Tài khoản của bạn không đủ")
                            } else {
                                setSelectedPaymentMethod("WALLET");
                            }
                        }}

                    >
                        {selectedPaymentMethod === "WALLET"
                            ? <IoMdCheckmark size={13}
                                className='absolute top-[-2px] right-[-2px] bg-blue-500 text-white rounded-lg' />
                            : null
                        }
                        TK EconoMart ({formatPrice(wallet)})

                    </button>
                </div>


                <div className='w-[220px]'>
                    <button
                        className={`relative flex flex-row border rounded-md w-full py-2 items-center justify-evenly 
                            ${selectedPaymentMethod === "CREDIT_CARD"
                                ? "border-[2px] border-blue-500 " : ""}`}
                        onClick={() => setSelectedPaymentMethod("CREDIT_CARD")}
                    >
                        {selectedPaymentMethod === "CREDIT_CARD"
                            ? <IoMdCheckmark size={13}
                                className='absolute  top-[-2px] right-[-2px] bg-blue-500 text-white rounded-lg' />
                            : null
                        }
                        <HiCreditCard />
                        Thanh toán bằng thẻ
                    </button>
                </div>

                <div className='w-[240px]'>

                    <button
                        className={`relative flex flex-row border rounded-md w-full py-2 items-center justify-evenly 
                            ${selectedPaymentMethod === "CASH_ON_DELIVERY"
                                ? "border-[2px] border-blue-500 " : ""}`}
                        onClick={() => setSelectedPaymentMethod("CASH_ON_DELIVERY")}
                    >
                        {selectedPaymentMethod === "CASH_ON_DELIVERY"
                            ? <IoMdCheckmark size={13}
                                className='absolute top-[-2px] right-[-2px] bg-blue-500 text-white rounded-lg' />
                            : null
                        }
                        <FaHandHoldingUsd className='' />
                        Thanh toán khi nhận hàng
                    </button>
                </div>
            </div>

        </div>


        <div className=' bottom-0 flex text-sm
         border-slate-200  justify-between gap-4 items-center bg-white rounded-md px-8 py-4'>

            <div className='flex flex-row items-center justify-end  w-full '>

                <div className='text-bold flex flex-col w-[280px] gap-1 my-10'>
                    <div className=' flex flex-row justify-between w-full h-10 items-center'>
                        <div className='flex flex-col items-center'>
                            <p className='text-gray-500'>Tổng tiền hàng :</p>
                        </div>
                        <p className="text-left pl-0 text-bold">{formatPrice(totalAmount)}</p>
                    </div>

                    <div className=' flex flex-row justify-between w-full h-10 items-center'>
                        <div className='flex flex-col items-center'>
                            <p className='text-gray-500'>Phí Vận Chuyển :</p>
                        </div>
                        <p className="text-left pl-0">{formatPrice(30000)}</p>
                    </div>

                    <div className=' flex flex-row justify-between w-full h-10 items-center'>
                        <div className='flex flex-col h-full justify-center items-center'>
                            <p className='text-gray-500'>Tổng thanh toán  :</p>
                        </div>
                        <p className='text-rose-500 text-xl font-semibold'>{formatPrice(30000 + totalAmount)}</p>
                    </div>

                    <div className='w-full'>
                        <Button
                            icon={IoBagCheckOutline}
                            label={'Đặt hàng'}
                            rounded
                            styleIcon='text-white'
                            onClick={handleCheckout}
                        />
                    </div>

                </div>
                <RenderIf isTrue={isOpen}>
                    <ListAddress onClose={toggleOpen} email={currentUser.email} updateDefaultAddress={setUpdateDefaultAddress} />
                    <BackDrop onClick={toggleOpen} />
                </RenderIf>


            </div>

        </div >
    </div >

}

export default CheckoutClient
