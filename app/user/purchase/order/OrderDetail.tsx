// 'use client'

// import useAxiosAuth from "@/hooks/useAxiosAuth";
// import handleApiCall from "@/services/handleApiCall"
// import RenderIf from "@/utils/RenderIf";
// import { useCallback, useEffect, useState } from "react"
// import { RiMapPin2Line } from "react-icons/ri"
// import { formatPrice, getFormattedDate } from "@/utils/util";
// import { IoIosArrowBack } from "react-icons/io";
// import ListReason from "./ListReason";
// import BackDrop from "@/app/components/nav/BackDrop";
// import ItemOrder from "../ItemOrder";
// import { useRouter } from "next/navigation";
// const OrderDetail = ({ orderId }: { orderId: string }) => {
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
//       <div className="flex flex-col px-5 py-4 bg-slate-50 gap-4 w-full  ">
//         <div className="flex flex-row gap-2 items-center justify-between w-full ">
//           <button className="flex flex-row items-center"
//             onClick={() => router.push(`/user/purchase?status=${orderDetail?.orderStatus.toLowerCase()}`)}
//           >
//             <IoIosArrowBack size={20} />
//             Trở lại
//           </button>

//           <div className="flex flex-row gap-1 items-center">


//             <RenderIf isTrue={orderDetail?.orderStatus !== "CANCELED"}>
//               <span className="text-sm text-slate-500">{getFormattedDate(orderDetail?.createdAt)}</span>
//             </RenderIf>
//             <span>MÃ ĐƠN HÀNG. {orderDetail?.id}</span>
//             <span>|</span>
//             <RenderIf isTrue={orderDetail?.orderStatus === "PENDING"}>
//               <div>Đơn hàng chờ xác nhận</div>
//             </RenderIf>

//             <RenderIf isTrue={orderDetail?.orderStatus === "CANCELED"}>
//               <div>Đơn hàng đã hủy</div>
//               <span className="text-sm text-slate-500">( {getFormattedDate(orderDetail?.cancelDate)})</span>
//             </RenderIf>

//             <RenderIf isTrue={orderDetail?.orderStatus === "COMPLETED"}>
//               <div>Đơn hàng hoàn thành</div>
//               {/* <span className="text-sm text-slate-500">( {getFormattedDate(orderDetail?.delivery_date)})</span> */}
//             </RenderIf>
//           </div>

//         </div>

//         <div className='bg-white rounded-xl px-8 py-4 shadow-md text-slate-700 '>
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
//               completed={orderDetail.orderStatus === "COMPLETED"}
//               item={orderProduct}
//               key={orderProduct.id}
//             />
//           ))}
//         </div>

//         <div className='bg-white rounded-xl px-8 py-2 pb-8 shadow-md text-slate-700 flex flex-col items-end w-full'>

//           <div className='text-bold flex flex-col gap-1 my-5 border w-full'>

//             <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
//               <div className='flex flex-col items-start w-[50%] border-r px-2'>
//                 <p className='text-gray-500'>Phương thức thanh toán</p>
//               </div>

//               <RenderIf isTrue={orderDetail?.payment.paymentMethod === "CREDIT_CARD"}>
//                 <p className="text-left pl-0 text-bold ">Thanh toán bằng thẻ (Đã thanh toán)</p>
//               </RenderIf>
//               <RenderIf isTrue={orderDetail?.payment.paymentMethod === "CASH_ON_DELIVERY"}>
//                 <p className="text-left pl-0 text-bold ">Thanh toán khi nhận hàng</p>
//               </RenderIf>

//               <RenderIf isTrue={orderDetail?.payment.paymentMethod === "WALLET"}>
//                 <p className="text-left pl-0 text-bold ">Thanh toán bằng TK EconoMart</p>
//               </RenderIf>



//             </div>



//             <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
//               <div className='flex flex-col items-start w-[70%] border-r px-2'>
//                 <p className='text-gray-500'>Tổng tiền hàng</p>
//               </div>
//               <p className="text-left pl-0 text-bold ">{formatPrice(orderDetail?.totalPrice - orderDetail?.feeShip)}</p>
//             </div>

//             <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
//               <div className='flex flex-col items-start w-[70%] border-r px-2'>
//                 <p className='text-gray-500'>Phí Vận Chuyển</p>
//               </div>
//               <p className="text-left pl-0 text-bold ">{formatPrice(orderDetail?.feeShip)}</p>
//             </div>

//             <div className=' flex flex-row justify-between w-full h-10 items-center border px-4'>
//               <div className='flex flex-col items-start w-[70%] border-r px-2'>
//                 <p className='text-gray-500'>Tổng thanh toán</p>
//               </div>
//               <p className="text-left pl-0 text-bold text-red-600">{formatPrice(orderDetail?.totalPrice)}</p>
//             </div>


//           </div>

//           <RenderIf isTrue={orderDetail?.orderStatus === "CANCELED"}>
//             <div className="flex flex-row justify-start w-full">
//               <p>Lý do Hủy đơn hàng: {orderDetail?.cancelReason}</p>
//             </div>
//           </RenderIf>



//           <RenderIf isTrue={orderDetail?.orderStatus === "PENDING"}>
//             <button className="border px-4 py-2 border-red-500"
//               onClick={() => setIsOpen(true)}
//             >
//               Hủy đơn hàng

//             </button>
//           </RenderIf>
//           <RenderIf isTrue={isOpen}>
//             <ListReason setIsCancelOrder={setIsCancelOrder} onClose={toggleOpen} orderId={orderDetail?.id} />
//             <BackDrop onClick={toggleOpen} />
//           </RenderIf>

//         </div>

//       </div>
//     </RenderIf>

//   )
// }

// export default OrderDetail

'use client';

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import RenderIf from "@/utils/RenderIf";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

import ListReason from "./ListReason";
import BackDrop from "@/app/components/nav/BackDrop";
import OrderStatus from "@/app/components/user/purchase/OrderStatus";
import AddressDetail from "@/app/components/user/purchase/AddressDetail";

import PaymentDetail from "@/app/components/user/purchase/PaymentDetail";
import ProductList from "./ProductList";
import CancelButton from "@/app/components/user/purchase/CancelButton";

const OrderDetail = ({ orderId }: { orderId: string }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const axios = useAxiosAuth();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const getOrderDetail = async () => {
      const res = await handleApiCall(axios.get(`/order/${orderId}`));
      setOrderDetail(res.data);
    };
    getOrderDetail();
  }, [axios, orderId]);

  return (
    <RenderIf isTrue={orderDetail}>
      <div className="flex flex-col px-5 py-4 bg-gray-50 gap-4 w-full">
        {/* Header */}
        <div className="flex flex-col px-5 py-4 bg-gray-50 gap-4 w-full">
          {/* Header */}
          <div className="flex flex-row items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
            {/* Back Button */}
            <button
              className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
              onClick={() => router.push(`/user/purchase?status=${orderDetail?.orderStatus.toLowerCase()}`)}
            >
              <IoIosArrowBack size={20} />
              <span>Trở lại</span>
            </button>

            {/* Order Status */}
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <OrderStatus orderDetail={orderDetail} />
            </div>
          </div>
        </div>


        {/* Address */}
        <AddressDetail address={orderDetail?.address} />

        {/* Product List */}
        <ProductList products={orderDetail?.orderProducts} status={orderDetail?.orderStatus} />

        {/* Payment Details */}
        <PaymentDetail
          payment={orderDetail?.payment}
          totalPrice={orderDetail?.totalPrice}
          feeShip={orderDetail?.feeShip}
        />

        {/* Cancel Order */}
        <CancelButton
          status={orderDetail?.orderStatus}
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          orderId={orderDetail?.id}
          cancelReason={orderDetail?.cancelReason}
        />
      </div>
    </RenderIf>
  );
};

export default OrderDetail;

