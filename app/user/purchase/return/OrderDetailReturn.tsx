'use client'

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall"
import RenderIf from "@/utils/RenderIf";
import { useCallback, useEffect, useState } from "react"
import { RiMapPin2Line } from "react-icons/ri"
import { formatPrice, getFormattedDate } from "@/utils/util";
import { IoIosArrowBack } from "react-icons/io";
import ItemOrder from "../ItemOrder";
import { useRouter } from "next/navigation";
const OrderDetailReturn = ({ orderId }: { orderId: string }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false)
  const [isCancelOrder, setIsCancelOrder] = useState(false);
  const router = useRouter();
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])
  const axios = useAxiosAuth();
  useEffect(() => {
    const getOrderDetail = async () => {
      const res = await handleApiCall(axios.get(`/order/${orderId}`));
      setOrderDetail(res.data);
      console.log("res", res);
    }
    getOrderDetail();
  }, [])
  return (
    <RenderIf isTrue={orderDetail}>
      <div className="flex flex-col px-20 py-4 bg-slate-50 gap-4">
        <div className="flex flex-row gap-2 items-center justify-between">
          <button className="flex flex-row items-center"
            onClick={() => router.push(`/user/purchase?status=return`)}
          >
            <IoIosArrowBack size={20} />
            Trở lại
          </button>

          <div className="flex flex-row gap-5 items-center">

            <span className="text-sm text-slate-500">{getFormattedDate(orderDetail?.createdAt)}</span>

            <span>MÃ ĐƠN HÀNG. {orderDetail?.id}</span>
            <span>|</span>


            <div>Đã hoàn tiền</div>
            <span className="text-sm text-slate-500">( {getFormattedDate(orderDetail?.cancelDate)})</span>

          </div>

        </div>

        <div className='bg-white rounded-xl px-8 py-4 shadow-md text-slate-700 '>
          <div className='flex flex-row gap-2 text-xl  items-center'>
            <RiMapPin2Line />
            <p> Địa chỉ nhận hàng</p>
          </div >
          <div className='flex flex-row gap-5 items-center'>

            <p>{orderDetail?.address.name}</p>
            <p>{orderDetail?.address.phoneNumber}</p>
            <p>{orderDetail?.address.street}</p>
          </div>
        </div>
        <div className="border rounded-xl shadow-sm bg-white px-8 py-4">
          {orderDetail?.orderProducts.map((orderProduct: any) => (
            <ItemOrder
              item={orderProduct}
              key={orderProduct.id}
            />
          ))}
        </div>

        <div className='bg-white rounded-xl px-8 py-2 pb-8 shadow-md text-slate-700 flex flex-col items-end w-full'>

          <div className='text-bold flex flex-col gap-1 my-5 border w-full'>

            <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
              <div className='flex flex-col items-end w-[70%] border-r px-2'>
                <p className='text-gray-500'>Đề xuất số tiền hoàn lại</p>
              </div>
              <p className="text-left pl-0 text-bold ">{formatPrice(orderDetail?.totalPrice)}</p>
            </div>



            <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
              <div className='flex flex-col items-end w-[70%] border-r px-2'>
                <p className='text-gray-500'>Số tiền hoàn nhận được</p>
              </div>
              <p className="text-left pl-0 text-bold ">{formatPrice(orderDetail?.totalPrice)}</p>
            </div>

            <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
              <div className='flex flex-col items-end w-[70%] border-r px-2'>
                <p className='text-gray-500'>Hoàn tiền vào</p>
              </div>
              <p className="text-left pl-0 text-bold ">Số dư TK Economart</p>
            </div>




          </div>

          <RenderIf isTrue={orderDetail?.orderStatus === "CANCELED"}>
            <div className="flex flex-row justify-start w-full">
              <p>Lý do Hủy đơn hàng: {orderDetail?.cancelReason}</p>
            </div>
          </RenderIf>



        </div>

      </div>
    </RenderIf>

  )
}

export default OrderDetailReturn
