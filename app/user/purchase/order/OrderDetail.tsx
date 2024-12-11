'use client';

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import RenderIf from "@/utils/RenderIf";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import AddressDetail from "@/app/components/user/purchase/AddressDetail";
import OrderStatus from "@/app/components/user/purchase/OrderStatus";
import CancelButton from "@/app/components/user/purchase/CancelButton";
import PaymentDetail from "@/app/components/user/purchase/PaymentDetail";
import ProductList from "./ProductList";

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

