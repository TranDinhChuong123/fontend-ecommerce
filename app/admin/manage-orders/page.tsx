


'use client'
import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import { formatPrice } from "@/utils/util";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

// Các trạng thái đơn hàng
const StatusOrder = [
  { label: "Chờ Xác nhận", value: "PENDING" },
  { label: "Đang Giao Hàng", value: "SHIPPING" },
  { label: "Hoàn Thành", value: "COMPLETED" },
  { label: "Đã Hủy", value: "CANCELED" },
];

const ListProductPage = () => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState("PENDING");
  const [orderData, setOrderData] = useState<any[]>([]);

  const getUserOrderByStatus = async (status: string) => {
    const res = await handleApiCall(axios.get(`/order/status/${status}`));
    console.log("res", res);

    setOrderData(res?.data || []);
  };

  const columns = [
    {
      field: 'action',
      headerName: 'Xem chi tiết',
      flex: 1,
      renderCell: (params: any) => (
        <button
          onClick={() => router.push(`/admin/order-detail/${params.row.id}`)}
          className="text-primary"
        >
          <IoEyeSharp size={20} color="#1E90FF" />
        </button>
      ),
    },
    { field: 'id', headerName: 'ID Đơn hàng', flex: 2 },
    { field: 'userId', headerName: 'Khách hàng', flex: 4 },
    { field: 'orderDate', headerName: 'Ngày đặt hàng', flex: 2 },
    { field: 'totalPrice', headerName: 'Tổng tiền', flex: 2 },
    { field: 'paymentMethod', headerName: 'Phương thức thanh toán', flex: 3 },
    { field: 'orderStatus', headerName: 'Trạng thái', flex: 2 },
  ];

  useEffect(() => {
    getUserOrderByStatus(selectedOrder);
  }, [selectedOrder]);

  const rows = orderData.map((order: any) => {
    return {
      id: order.id,
      userId: order.userId,
      orderDate: order.createdAt,
      totalPrice: formatPrice(order.totalPrice),
      paymentMethod: order.payment.paymentMethod,
      paymentStatus: order.payment.paymentStatus,
      orderStatus: order.orderStatus
    };
  });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="text-center font-bold text-2xl bg-white p-6 rounded-lg shadow-md mb-6">
        <h1>Quản lý đơn hàng</h1>
      </div>

      {/* Thanh trạng thái */}
      <div className="flex justify-center gap-4 my-4">
        {StatusOrder.map(status => (
          <button
            key={status.value}
            className={`p-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer 
          ${selectedOrder === status.value ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
            onClick={() => {
              setSelectedOrder(status.value);
              getUserOrderByStatus(status.value);
            }}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Bảng hiển thị đơn hàng */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          sx={{
            '.MuiDataGrid-columnHeader': {
              fontWeight: 'bold',
              backgroundColor: '#f0f0f0',
            },
            '.MuiDataGrid-root': {
              backgroundColor: '#ffffff', // Background bảng dữ liệu
            },
            '.MuiDataGrid-cell': {
              backgroundColor: '#ffffff', // Nền các ô
            },
          }}
        />
      </div>
    </div>

  );
};

export default ListProductPage;
