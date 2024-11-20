// 'use client'

// import useAxiosAuth from "@/hooks/useAxiosAuth";
// import handleApiCall from "@/services/handleApiCall"
// import RenderIf from "@/utils/RenderIf";
// import { useCallback, useEffect, useState } from "react"
// import { RiMapPin2Line } from "react-icons/ri"
// import { formatPrice, getFormattedDate } from "@/utils/util";
// import { IoIosArrowBack } from "react-icons/io";
// import ItemOrder from "../ItemOrder";
// import { useRouter } from "next/navigation";
// const OrderDetailReturn = ({ orderId }: { orderId: string }) => {
//   const [orderDetail, setOrderDetail] = useState<any>(null);
//   const [isOpen, setIsOpen] = useState(false)
//   const [isCancelOrder, setIsCancelOrder] = useState(false);
//   const router = useRouter();
//   const toggleOpen = useCallback(() => {
//     setIsOpen((prev) => !prev)
//   }, [])
//   const axios = useAxiosAuth();
//   useEffect(() => {
//     const getOrderDetail = async () => {
//       const res = await handleApiCall(axios.get(`/order/${orderId}`));
//       setOrderDetail(res.data);
//       console.log("res", res);
//     }
//     getOrderDetail();
//   }, [])
//   return (
//     <RenderIf isTrue={orderDetail}>
//       <div className="flex flex-col px-2 py-4 bg-slate-50 gap-4">
//         <div className="flex flex-row gap-2 items-center justify-between">


//           <div className="w-full flex flex-row gap-4 items-center bg-white p-4 rounded-lg shadow-md">
//             <button className="flex flex-row items-center"
//               onClick={() => router.push(`/user/purchase?status=return`)}
//             >
//               <IoIosArrowBack size={20} />
//               Trở lại
//             </button>
//             <span className="text-sm text-gray-500 flex-shrink-0">
//               {getFormattedDate(orderDetail?.createdAt)}
//             </span>

//             <span className="text-base font-semibold text-gray-800">
//               MÃ ĐƠN HÀNG: {orderDetail?.id}
//             </span>

//             <span className="text-gray-400">|</span>

//             <div className="flex flex-row items-center gap-2">
//               <span className="text-sm text-green-600 font-medium">Đã hoàn tiền</span>
//               <span className="text-xs text-gray-500">
//                 ({getFormattedDate(orderDetail?.cancelDate)})
//               </span>
//             </div>
//           </div>
//           <hr className='my-3' />

//         </div>

//         <div className='bg-white rounded-xl px-8 py-4  text-slate-700 '>
//           <div className='flex flex-row gap-2 text-xl  items-center'>
//             <RiMapPin2Line />
//             <p> Địa chỉ nhận hàng</p>
//           </div >
//           <div className='flex flex-row gap-5 items-center'>

//             <p>{orderDetail?.address.name}</p>
//             <p>{orderDetail?.address.phoneNumber}</p>
//             <p>{orderDetail?.address.street}</p>
//           </div>
//         </div>
//         <div className="border rounded-xl shadow-sm bg-white px-8 py-4">
//           {orderDetail?.orderProducts.map((orderProduct: any) => (
//             <ItemOrder
//               item={orderProduct}
//               key={orderProduct.id}
//             />
//           ))}
//         </div>

//         <div className='bg-white rounded-xl px-8 py-2 pb-8 shadow-md text-slate-700 flex flex-col items-end w-full'>

//           <div className='text-bold flex flex-col gap-1 my-5 border w-full'>

//             <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
//               <div className='flex flex-col items-end w-[70%] border-r px-2'>
//                 <p className='text-gray-500'>Đề xuất số tiền hoàn lại</p>
//               </div>
//               <p className="text-left pl-0 text-bold ">{formatPrice(orderDetail?.totalPrice)}</p>
//             </div>



//             <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
//               <div className='flex flex-col items-end w-[70%] border-r px-2'>
//                 <p className='text-gray-500'>Số tiền hoàn nhận được</p>
//               </div>
//               <p className="text-left pl-0 text-bold ">{formatPrice(orderDetail?.totalPrice)}</p>
//             </div>

//             <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
//               <div className='flex flex-col items-end w-[70%] border-r px-2'>
//                 <p className='text-gray-500'>Hoàn tiền vào</p>
//               </div>
//               <p className="text-left pl-0 text-bold ">Số dư TK Economart</p>
//             </div>




//           </div>

//           <RenderIf isTrue={orderDetail?.orderStatus === "CANCELED"}>
//             <div className="flex flex-row justify-start w-full">
//               <p>Lý do Hủy đơn hàng: {orderDetail?.cancelReason}</p>
//             </div>
//           </RenderIf>



//         </div>

//       </div>
//     </RenderIf>

//   )
// }

// export default OrderDetailReturn

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
      <div className="flex flex-col px-4 py-6 bg-gray-100 gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <button
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
              onClick={() => router.push(`/user/purchase?status=return`)}
            >
              <IoIosArrowBack size={20} />
              <span className="font-semibold">Trở lại</span>
            </button>
            <div className="flex flex-col items-end text-right">
              <span className="text-sm text-gray-500">
                {getFormattedDate(orderDetail?.createdAt)}
              </span>
              <span className="text-base font-bold text-gray-800">
                MÃ ĐƠN HÀNG: {orderDetail?.id}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 font-medium">Đã hoàn tiền</div>
            <span className="text-xs text-gray-500">
              ({getFormattedDate(orderDetail?.cancelDate)})
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-gray-700">
          <div className="flex flex-row items-center gap-2 mb-4 text-xl font-semibold">
            <RiMapPin2Line />
            <span>Địa chỉ nhận hàng</span>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <strong>Người nhận:</strong> {orderDetail?.address.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {orderDetail?.address.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {orderDetail?.address.street}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          {orderDetail?.orderProducts.map((orderProduct: any) => (
            <ItemOrder item={orderProduct} key={orderProduct.id} />
          ))}
        </div>

        {/* Refund Information */}
        <div className="bg-white rounded-xl p-6 shadow-md flex flex-col text-gray-700">
          <div className="flex flex-col gap-4 mb-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Đề xuất số tiền hoàn lại</span>
              <span className="font-semibold">{formatPrice(orderDetail?.totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Số tiền hoàn nhận được</span>
              <span className="font-semibold">{formatPrice(orderDetail?.totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Hoàn tiền vào</span>
              <span className="font-semibold">Số dư TK Economart</span>
            </div>
          </div>

          <RenderIf isTrue={orderDetail?.orderStatus === "CANCELED"}>
            <div className="bg-red-50 p-4 rounded-md text-red-600">
              <strong>Lý do hủy đơn hàng:</strong> {orderDetail?.cancelReason}
            </div>
          </RenderIf>
        </div>
      </div>

    </RenderIf>

  )
}

export default OrderDetailReturn

