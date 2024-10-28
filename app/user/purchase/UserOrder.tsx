'use client'

import ItemProduct from '@/app/checkout/ItemProduct';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import React, { useEffect, useState } from 'react'
import ItemOrder from './ItemOrder';
import RenderIf from '@/utils/RenderIf';
import { formatPrice } from '@/utils/util';
import { useRouter } from 'next/navigation';
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineUpdate } from "react-icons/md";
import SideBar from '../SideBar';
interface Props {
    status: string | undefined
    currentUser: string | undefined
}

const UserOrder: React.FC<Props> = ({ status, currentUser }) => {
    const router = useRouter()
    const axios = useAxiosAuth();
    const [orderPendings, setOrderPendings] = useState([]);
    const [orderCancelleds, setOrderCancelleds] = useState([]);
    const [orderCompleted, setOrderCompleted] = useState([]);
    const [orderWaitingForDelivery, setOrderWaitingForDelivery] = useState([]);
    const [orderReturn, setOrderReturn] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(status || "pending");
    const [isLoading, setIsLoading] = useState(true);


    const handleReOrder = async (orderId: string) => {
        try {
            const response = await handleApiCall(axios.post(`/order/re-order`, {
                orderId
            }));

            if (!response) {
                throw new Error("Error updating cart checked status");
            }
            return true; // Trả về true nếu thành công
        } catch (error: any) {
            console.error(error.message);
            return false; // Trả về false nếu có lỗi
        }
    };
    useEffect(() => {
        const getUserOrderPeding = async () => {
            const res = await handleApiCall(axios.get(`/user/status-orders/PENDING`));
            setOrderPendings(res.data || []);

        }
        getUserOrderPeding();
    }, [selectedOrder == "pending"]);

    useEffect(() => {
        const getUserOrderPeding = async () => {

        }
        getUserOrderPeding();
    }, [selectedOrder])


    useEffect(() => {
        const getUserOrderCancelled = async () => {
            const res = await handleApiCall(axios.get(`/user/status-orders/CANCELED`));
            setOrderCancelleds(res.data || []);
            setIsLoading(false);
        }
        getUserOrderCancelled();
    }, [selectedOrder == "canceled"]);


    useEffect(() => {
        const getUserOrderCompleted = async () => {
            const res = await handleApiCall(axios.get(`/user/status-orders/COMPLETED`));
            setOrderCompleted(res.data || []);
            setIsLoading(false);
        }
        getUserOrderCompleted();
    }, [selectedOrder == "completed"]);

    useEffect(() => {
        const getUserOrderCancelled = async () => {
            const res = await handleApiCall(axios.get(`/user/status-orders/CANCELED`));
            setOrderCancelleds(res.data || []);
            setIsLoading(false);
        }
        getUserOrderCancelled();
    }, [selectedOrder == "canceled"]);


    useEffect(() => {
        const getUserOrderCancelled = async () => {
            const res = await handleApiCall(axios.get(`/user/status-orders/CANCELED`));
            console.log("res", res);
            if (res && res.data) {
                const data = res.data.filter((order: any) => order.orderStatus === "CANCELED" && order.payment.paymentStatus === "COMPLETED");
                setOrderReturn(data || []);
                console.log("orderCancelledsRefunded", data);
            }
            setIsLoading(false);
        }
        getUserOrderCancelled();
    }, [selectedOrder == "return"]);


    const handleButtonClick = (status: string) => {
        router.push(`/user/purchase?status=${status}`);
        setSelectedOrder(status)
    };



    if (isLoading) {
        return (
            <div className='flex flex-col items-center'>
                <div className='text-xl mt-10 text-slate-400 flex flex-row items-center gap-2'>
                    <MdOutlineUpdate size={20} />
                    loading...
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-row w-full'>
            <SideBar currentUser={currentUser || ''} />
            <div className='bg-slate-50 border px-16 py-4 w-[85%]'>
                <div className='flex flex-row gap-4 w-full justify-center text-slate-700 mb-5'>
                    <button
                        className={` py-2 px-4  
                        ${selectedOrder === "all" && "border-b-2 border-slate-700"}`}
                        onClick={() => handleButtonClick("all")}
                    >
                        Tất cả
                    </button>

                    <button
                        className={` py-2 px-4  
                        ${selectedOrder === "pending" && "border-b-2 border-slate-700"}`}
                        onClick={() => handleButtonClick("pending")}
                    >
                        Chờ xác nhận
                    </button>

                    <button
                        className={` py-2 px-4  
                        ${selectedOrder === "waiting_for_delivery" && "border-b-2 border-slate-700"}`}
                        onClick={() => handleButtonClick("waiting_for_delivery")}
                    >
                        Chờ giao hàng
                    </button>

                    <button
                        className={` py-2 px-4  
                        ${selectedOrder === "completed" && "border-b-2 border-slate-700"}`}
                        onClick={() => handleButtonClick("completed")}
                    >
                        Hoàn thành
                    </button>

                    <button
                        className={` py-2 px-4  
                        ${selectedOrder === "canceled" && "border-b-2 border-slate-700"}`}
                        onClick={() => handleButtonClick("canceled")}
                    >
                        Đã hủy
                    </button>

                    <button
                        className={` py-2 px-4  
                        ${selectedOrder === "return" && "border-b-2 border-slate-700"}`}
                        onClick={() => handleButtonClick("return")}
                    >
                        Trả Hàng/Hoàn tiền
                    </button>

                </div>
                <RenderIf isTrue={selectedOrder == "pending"}>

                    <RenderIf isTrue={orderPendings.length == 0}>
                        <div className='flex flex-row justify-center items-center h-60'>
                            <TbReportSearch size={40} className='text-slate-700' />
                            <p className='text-xl text-slate-700'>Chưa có đơn hàng</p>
                        </div>
                    </RenderIf>

                    {orderPendings.map((order: any) => {
                        return (
                            <div key={order.id} className='relative hover:cursor-pointer border px-8 shadow-md rounded-md mb-4'
                                onClick={() => router.push(`/user/purchase/order?orid=${order.id}`)}
                            >
                                <div className='flex flex-row justify-end'>
                                    <h1 className='text-xl py-2 font-light'>Đơn hàng chờ xác nhận</h1>
                                </div>
                                {order.orderProducts.map((orderProduct: any) => (
                                    <ItemOrder
                                        item={orderProduct}
                                        key={orderProduct.id}
                                    />
                                ))}

                                <div className='flex flex-row justify-between py-4'>

                                    <button className='px-4 py-2 text-white bg-slate-300 rounded-md' disabled>
                                        Đang xử lý
                                    </button>
                                    <span className='text-right flex flex-row gap-2 items-center'>
                                        <p className='text-slate-700'>Thành tiền: </p>
                                        <p className='font-semibold text-xl text-red-600'>{formatPrice(order.totalPrice)}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </RenderIf>

                <RenderIf isTrue={selectedOrder == "completed"}>

                    <RenderIf isTrue={orderCompleted.length == 0}>
                        <div className='flex flex-row justify-center items-center h-60'>
                            <TbReportSearch size={40} className='text-slate-700' />
                            <p className='text-xl text-slate-700'>Chưa có đơn hàng</p>
                        </div>
                    </RenderIf>

                    {orderCompleted.map((order: any) => {
                        return (
                            <div key={order.id} className='relative hover:cursor-pointer border px-8 shadow-md rounded-md mb-4'
                            >
                                <div onClick={() => router.push(`/user/purchase/order?orid=${order.id}`)}>
                                    <div className='flex flex-row justify-end'>
                                        <h1 className='text-xl py-2 font-light'>Đơn hàng hoàn thành</h1>
                                    </div>
                                    {order.orderProducts.map((orderProduct: any) => (
                                        <ItemOrder
                                            item={orderProduct}
                                            key={orderProduct.id}
                                        />
                                    ))}
                                </div>

                                <div className='flex flex-row justify-between py-4'>


                                    <button className='w-[120px] py-2 text-white bg-slate-700 rounded-md'
                                        onClick={
                                            async () => {
                                                const isUpdated = await handleReOrder(order?.id)
                                                console.log("isUpdated", isUpdated)
                                                if (isUpdated) {
                                                    router.push("/cart");
                                                }
                                            }
                                        }
                                    >
                                        Mua lại
                                    </button>

                                    <span className='text-right flex flex-row gap-2 items-center'>
                                        <p className='text-slate-700'>Thành tiền: </p>
                                        <p className='font-semibold text-xl text-red-600'>{formatPrice(order.totalPrice)}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </RenderIf>

                <RenderIf isTrue={selectedOrder == "canceled"}>

                    <RenderIf isTrue={orderCancelleds.length == 0}>
                        <div className='flex flex-row justify-center items-center h-60'>
                            <TbReportSearch size={40} className='text-slate-700' />
                            <p className='text-xl text-slate-700'>Chưa có đơn hàng</p>
                        </div>
                    </RenderIf>

                    {orderCancelleds.map((order: any) => {
                        return (
                            <div key={order.id} className='relative hover:cursor-pointer border px-8 shadow-md rounded-md mb-4'
                            >
                                <div onClick={() => router.push(`/user/purchase/order?orid=${order.id}`)}>
                                    <div className='flex flex-row justify-end'>
                                        <h1 className='text-xl py-2 font-light'>Đơn hàng đã hủy</h1>
                                    </div>
                                    {order.orderProducts.map((orderProduct: any) => (
                                        <ItemOrder
                                            item={orderProduct}
                                            key={orderProduct.id}
                                        />
                                    ))}
                                </div>

                                <div className='flex flex-row justify-between py-4'>

                                    <button className='px-8 py-2 text-white bg-slate-700 rounded-md'
                                        onClick={
                                            async () => {
                                                const isUpdated = await handleReOrder(order?.id)
                                                console.log("isUpdated", isUpdated)
                                                if (isUpdated) {
                                                    router.push("/cart");
                                                }
                                            }
                                        }
                                    >
                                        Mua lại
                                    </button>
                                    <span className='text-right flex flex-row gap-2 items-center'>
                                        <p className='text-slate-700'>Thành tiền: </p>
                                        <p className='font-semibold text-xl text-red-600'>{formatPrice(order.totalPrice)}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </RenderIf>

                <RenderIf isTrue={selectedOrder == "return"}>

                    <RenderIf isTrue={orderReturn.length == 0}>
                        <div className='flex flex-row justify-center items-center h-60'>
                            <TbReportSearch size={40} className='text-slate-700' />
                            <p className='text-xl text-slate-700'>Chưa có đơn hàng</p>
                        </div>
                    </RenderIf>

                    {orderReturn.map((order: any) => {
                        return (
                            <div key={order.id} className='relative hover:cursor-pointer border px-8 shadow-md rounded-md mb-4'
                            >
                                <div onClick={() => router.push(`/user/purchase/return?orid=${order.id}`)}>
                                    <div className='flex flex-row justify-end'>
                                        <h1 className='text-xl py-2 font-light'>Đã hoàn tiền</h1>
                                    </div>
                                    {order.orderProducts.map((orderProduct: any) => (
                                        <ItemOrder
                                            item={orderProduct}
                                            key={orderProduct.id}
                                        />
                                    ))}
                                </div>

                                <div className='flex flex-row justify-end py-4'>

                                    <span className='text-right flex flex-row gap-2 items-center'>
                                        <p className='text-slate-700'>Số tiền hoàn lại: </p>
                                        <p className='font-semibold text-xl text-red-600'>{formatPrice(order.totalPrice)}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </RenderIf>

                <RenderIf isTrue={selectedOrder == "waiting_for_delivery"}>

                    <RenderIf isTrue={orderWaitingForDelivery.length == 0}>
                        <div className='flex flex-row justify-center items-center h-60'>
                            <TbReportSearch size={40} className='text-slate-700' />
                            <p className='text-xl text-slate-700'>Chưa có đơn hàng</p>
                        </div>
                    </RenderIf>

                    {orderWaitingForDelivery.map((order: any) => {
                        return (
                            <div key={order.id} className='relative hover:cursor-pointer border px-8 shadow-md rounded-md mb-4'
                            >
                                <div onClick={() => router.push(`/user/purchase/return?orid=${order.id}`)}>
                                    <div className='flex flex-row justify-end'>
                                        <h1 className='text-xl py-2 font-light'>Đã hoàn tiền</h1>
                                    </div>
                                    {order.orderProducts.map((orderProduct: any) => (
                                        <ItemOrder
                                            item={orderProduct}
                                            key={orderProduct.id}
                                        />
                                    ))}
                                </div>

                                <div className='flex flex-row justify-end py-4'>

                                    <span className='text-right flex flex-row gap-2 items-center'>
                                        <p className='text-slate-700'>Số tiền hoàn lại: </p>
                                        <p className='font-semibold text-xl text-red-600'>{formatPrice(order.totalPrice)}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </RenderIf>

            </div>
        </div>



    )
}

export default UserOrder
