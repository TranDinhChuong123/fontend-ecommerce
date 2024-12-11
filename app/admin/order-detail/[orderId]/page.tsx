

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import LoadingComponent from "@/app/components/common/LoadingComponent";
import { showToastSuccess } from "@/utils/util";
import RenderIf from "@/utils/RenderIf";

interface Product {
  name: string;
  buyQuantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  createdAt: string;
  status: string;
  products: Product[];
  totalAmount: number;
  feeShip: number;
  cancellationReason?: string | null;
}

const OrderDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = Array.isArray(params?.orderId)
    ? params.orderId[0]
    : params?.orderId;
  const [orderDetails, setOrderDetails] = useState<OrderDetails | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const axios = useAxiosAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await handleApiCall(axios.get(`/order/${orderId}`));
        const data = response.data;

        if (data) {
          const order = {
            id: data.id || "N/A",
            customerName: data.address?.name || "Không rõ",
            customerPhone: data.address?.phoneNumber || "Không rõ",
            customerAddress: data.address?.street || "Không rõ",
            createdAt: new Date(data.createdAt).toLocaleDateString(),
            status:
              data.orderStatus === "PENDING"
                ? "Chờ xác nhận"
                : data.orderStatus === "SHIPPING"
                  ? "Đang giao hàng"
                  : data.orderStatus === "COMPLETED"
                    ? "Đã nhận hàng"
                    : "Đã hủy đơn",
            products: data.orderProducts || [],
            totalAmount: data.totalPrice || 0,
            feeShip: data.feeShip || 0,
            cancellationReason: data.cancelReason || null,
          };
          setOrderDetails(order);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderDetails?.id]);

  const handleBackClick = () => {
    router.push("/admin/manage-orders");
  };

  // Hàm xác nhận đơn hàng và xuất kho
  const handleConfirmOrder = async () => {
    try {
      console.log(orderId);

      const response = await handleApiCall(axios.put(`/order/confirm/${orderId}`));
      if (response.data) {
        showToastSuccess("Xác nhận đơn hàng thành công!");
        router.push("/admin/manage-orders");
        setIsSuccess(true);

      } else {
        console.error("Lỗi khi xác nhận đơn hàng:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xác nhận đơn hàng:", error);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      const response = await handleApiCall(axios.put(`/order/complete/${orderDetails?.id}`));
      if (response) {
        showToastSuccess("Hoàn thành đơn hàng thành công!");
        router.push("/admin/manage-orders");
        setIsSuccess(true);
      } else {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API hoàn thành đơn hàng:", error);
    }
  };
  console.log("isSuccess", isSuccess);
  


  if (loading) return <LoadingComponent />;

  if (!orderDetails) return <p>Không tìm thấy thông tin đơn hàng.</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={handleBackClick}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Quay lại danh sách đơn hàng
      </button>

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Chi tiết đơn hàng</h1>
      <div className="flex justify-between mb-6">
        <p><strong>Ngày đặt hàng:</strong> {orderDetails.createdAt}</p>
        <p><strong>Trạng thái:</strong> {orderDetails.status}</p>
        {orderDetails.cancellationReason && (
          <p><strong>Lý do hủy:</strong> {orderDetails.cancellationReason}</p>
        )}
      </div>
      {/* Thông tin khách hàng */}
      <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Thông tin khách hàng</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <p><strong>Mã đơn hàng:</strong> {orderDetails.id}</p>
          <p><strong>Khách hàng:</strong> {orderDetails.customerName}</p>
          <p><strong>Số điện thoại:</strong> {orderDetails.customerPhone}</p>
          <p><strong>Địa chỉ:</strong> {orderDetails.customerAddress}</p>
        </div>
      </div>

      {/* Chi tiết đơn hàng */}
      <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Chi tiết đơn hàng</h2>
        <table className="w-full table-collapse rounded-lg shadow-slate-950">
          <thead>
            <tr className="bg-blue-300 text-white">
              <th className="py-2 px-4 border-b rounded-tl-lg w-1/2">Tên sản phẩm</th>
              <th className="py-2 px-4 border-b text-center w-1/6">Số lượng</th>
              <th className="py-2 px-4 border-b text-right w-1/4 rounded-tr-lg">Giá</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orderDetails.products.map((product: any, index: any) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b w-1/3">{product.name}</td>
                <td className="py-2 px-4 border-b text-center w-1/6">{product.buyQuantity}</td>
                <td className="py-2 px-4 border-b text-right w-1/4">{product.price.toLocaleString()} ₫</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tổng kết đơn hàng */}
      <div className="flex justify-start gap-5 p-6 bg-gray-50 rounded-lg shadow-md border-t border-gray-300">
        <p><strong>Phí vận chuyển:</strong> <span className="text-red-600">{orderDetails.feeShip.toLocaleString()} ₫ </span></p>
        <p><strong>Tổng tiền:</strong > <span className="text-red-600">{orderDetails.totalAmount.toLocaleString()} ₫</span></p>
      </div>

      {/* Nút xác nhận đơn hàng */}

      {orderDetails.status === "Chờ xác nhận" && (
        <div className="mt-6 text-right">
          <button
            onClick={handleConfirmOrder}
            className="px-10 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {isSuccess ? "Thành công" : "Xác nhận đơn hàng"}
          </button>
        </div>
      )}

      {/* Nút xác nhận đơn hàng */}
      {orderDetails.status === "Đang giao hàng" && (
        <div className="mt-6 text-right">
          <button
            disabled={isSuccess}
            onClick={handleCompleteOrder}
            className="px-6 font-semibold py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isSuccess ? "THÀNH CÔNG" : "GIAO HÀNG THÀNH CÔNG"}
          </button>
          
        </div>
      )}

    </div>


  );
};

export default OrderDetailsPage;

