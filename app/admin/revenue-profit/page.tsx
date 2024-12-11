'use client'

import ExportToExcel from "@/app/components/common/ExportToExcel";
import LoadingComponent from "@/app/components/common/LoadingComponent";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import { formatPrice } from "@/utils/util";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";


const RevenueProfitPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [revenueAndProfit, setRevenueAndProfit] = useState<any>(null);
    const [revenueAndProfitOrders, setRevenueAndProfitOrders] = useState<any>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const axios = useAxiosAuth();
    const fetchRevenueAndProfit = async () => {
        const res = await handleApiCall(axios.get(`/statistics/revenue-profit`));
        setRevenueAndProfit(res?.data || []);
    };

    const fetchrevenueAndProfitOrders = async () => {
        const res = await handleApiCall(axios.get(`/statistics/revenue-profit-orders`));
        setRevenueAndProfitOrders(res?.data || []);
        console.log("res", res);

    };

    const fetchRevenueAndProfitOrders = async (startDate: string, endDate: string) => {
        const res = await handleApiCall(axios.get(`/statistics/orders-date`, {
            params: {
                startDate: startDate,
                endDate: endDate,
            }
        }));
        setRevenueAndProfitOrders(res?.data || []);
    };
    useEffect(() => {
        fetchRevenueAndProfit();
        fetchrevenueAndProfitOrders();
        setIsLoading(false);
    }, []);

    const columns = [

        { field: 'orderId', headerName: 'ID Đơn hàng', flex: 2 },
        { field: 'userId', headerName: 'Khách hàng', flex: 4 },
        {
            field: 'orderDate', headerName: 'Ngày đặt hàng', flex: 2,
            renderCell: (params: any) => {
                const orderDate = params.row.orderDate ? new Date(params.row.orderDate).toLocaleDateString() : 'N/A';
                return <div>{orderDate}</div>;
            }
        },
        {
            field: 'deliveryDate', headerName: 'Ngày giao hàng', flex: 2,
            renderCell: (params: any) => {
                const orderDate = params.row.deliveryDate ? new Date(params.row.deliveryDate).toLocaleDateString() : 'N/A';
                return <div>{orderDate}</div>;
            }
        },
        {
            field: 'totalRevenue', headerName: 'Tổng doanh thu', flex: 2,
            renderCell: (params: any) => formatPrice(params.row.totalRevenue),
        },
        {
            field: 'totalProfit', headerName: 'Tổng lợi nhuận', flex: 2,
            renderCell: (params: any) => formatPrice(params.row.totalProfit),
        },

    ];

    const handleFilter = () => {
        if (startDate && endDate) {
            fetchRevenueAndProfitOrders(startDate, endDate);
        } else {
            alert("Please select both start and end date.");
        }
    };

    if (isLoading) return <LoadingComponent />

    return (

        <div className="bg-gray-100 min-h-screen py-8 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-8">
                    <div className="text-3xl font-semibold text-gray-800 mb-2">Thông tin Doanh thu và Lợi nhuận</div>
                </div>

                <div className="flex gap-2 w-full items-center justify-around">
                    <div className="bg-white shadow-lg rounded-lg p-10 mb-8  flex justify-between items-center">
                        <div className="">
                            <div className="text-xl font-semibold text-gray-700">Tổng Doanh thu</div>
                            <div className="text-2xl font-bold text-green-600">{formatPrice(revenueAndProfit?.totalRevenue)}</div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-10 mb-8  flex justify-between items-center">


                        <div className="">
                            <div className="text-xl font-semibold text-gray-700">Tổng Lợi nhuận</div>
                            <div className="text-2xl font-bold text-blue-600">{formatPrice(revenueAndProfit?.totalProfit)}</div>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="flex gap-2 w-full items-center justify-center mb-8">
                    <div>
                        <label htmlFor="startDate" className="text-lg font-medium">Ngày bắt đầu:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="ml-2 p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="text-lg font-medium">Ngày kết thúc:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="ml-2 p-2 border rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleFilter}
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Lọc
                    </button>
                </div>
                <div className="m-4">
                    <ExportToExcel data={revenueAndProfitOrders} fileName="DoanhThuVaLoiNhuan" />
                </div>

                {/* Data Grid */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <DataGrid
                        getRowId={(row) => row.orderId}
                        columns={columns}
                        rows={revenueAndProfitOrders}
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
                                backgroundColor: '#ffffff',
                            },
                            '.MuiDataGrid-cell': {
                                backgroundColor: '#ffffff',
                            },
                            '.MuiDataGrid-footerContainer': {
                                borderTop: '1px solid #f0f0f0',
                            },
                        }}
                    />
                </div>
            </div>
        </div>



    )
}

export default RevenueProfitPage
