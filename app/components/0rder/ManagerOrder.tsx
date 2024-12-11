"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";

interface Product {
  name: string;
  buyQuantity: number;
}

interface Order {
  id: string;
  customerName: string;
  productNames: string;
  productQuantity: number;
  createdAt: string;
  status: string; // Status values are now dynamically mapped
}

const ManagerOrderPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    | "Tất cả"
    | "Chờ xác nhận"
    | "Đã xác nhận"
    | "Đang giao"
    | "Đã giao hàng"
    | "Đã hủy"
    | "Trả hàng/Hoàn tiền"
  >("Tất cả");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const axios = useAxiosAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await handleApiCall(axios.get("/order"));
        if (response?.data) {
          const rawOrders = response.data;

          const formattedOrders: Order[] = rawOrders.map((order: any) => ({
            id: order.id || "N/A",
            customerName: order.address?.name || "Không rõ",
            productNames:
              order.orderProducts
                ?.map((p: { name: string }) => p.name)
                .join(", ") || "Không rõ",
            productQuantity:
              order.orderProducts?.reduce(
                (acc: number, p: { buyQuantity: number }) =>
                  acc + p.buyQuantity,
                0
              ) || 0,
            createdAt: new Date(order.createdAt).toLocaleDateString(),
            status:
              order.orderStatus === "PENDING"
                ? "Chờ xác nhận"
                : order.orderStatus === "CONFIRMED"
                ? "Đã xác nhận"
                : order.orderStatus === "SHIPPING"
                ? "Đang giao"
                : order.orderStatus === "COMPLETED"
                ? "Đã giao hàng"
                : order.orderStatus === "CANCELED"
                ? "Đã hủy"
                : order.orderStatus === "RETURN"
                ? "Trả hàng/Hoàn tiền"
                : "Không rõ",
          }));

          setOrders(formattedOrders);
        } else {
          console.warn("Dữ liệu trả về không hợp lệ:", response?.data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirmOrder = async (orderId: string) => {
    try {
      const response = await axios.put(`/order/${orderId}/confirm`);
      console.log("API response:", response.data);

      if (response?.status === 200 && response.data?.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Đã xác nhận" } : order
          )
        );
        console.log("Đơn hàng đã được xác nhận!");
      } else {
        console.warn("Không thể xác nhận đơn hàng. Vui lòng thử lại.");
      }
    } catch (error: any) {
      console.error("Lỗi khi xác nhận đơn hàng:", error.message);
    }
  };

  const handleTabClick = (
    tab:
      | "Tất cả"
      | "Chờ xác nhận"
      | "Đã xác nhận"
      | "Đang giao"
      | "Đã giao hàng"
      | "Đã hủy"
      | "Trả hàng/Hoàn tiền"
  ) => {
    setActiveTab(tab);
  };

  const filteredOrders =
    activeTab === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

      <div className="flex space-x-4 mb-6">
        {[
          "Tất cả",
          "Chờ xác nhận",
          "Đã xác nhận",
          "Đang giao",
          "Đã giao hàng",
          "Đã hủy",
          "Trả hàng/Hoàn tiền",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              handleTabClick(
                tab as
                  | "Tất cả"
                  | "Chờ xác nhận"
                  | "Đã xác nhận"
                  | "Đang giao"
                  | "Đã giao hàng"
                  | "Đã hủy"
                  | "Trả hàng/Hoàn tiền"
              )
            }
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border border-gray-300">Mã hóa đơn</th>
                <th className="p-4 border border-gray-300">Khách hàng</th>
                <th className="p-4 border border-gray-300">Sản phẩm</th>
                <th className="p-4 border border-gray-300">Số lượng</th>
                <th className="p-4 border border-gray-300">Ngày đặt</th>
                <th className="p-4 border border-gray-300">Trạng thái</th>
                <th className="p-4 border border-gray-300">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="p-4 border border-gray-300 text-center">
                      {order.id}
                    </td>
                    <td className="p-4 border border-gray-300 text-center">
                      {order.customerName}
                    </td>
                    <td className="p-4 border border-gray-300 text-center">
                      {order.productNames}
                    </td>
                    <td className="p-4 border border-gray-300 text-center">
                      {order.productQuantity}
                    </td>
                    <td className="p-4 border border-gray-300 text-center">
                      {order.createdAt}
                    </td>
                    <td className="p-4 border border-gray-300 text-center">
                      {order.status}
                    </td>
                    <td className="p-4 border border-gray-300 text-center">
                      {order.status === "Chờ xác nhận" && (
                        <button
                          onClick={() => handleConfirmOrder(order.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Xác nhận
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 border border-gray-300 text-center text-gray-500"
                  >
                    Không có đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagerOrderPage;
