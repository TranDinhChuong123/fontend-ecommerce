'use client'

import LoadingComponent from '@/app/components/common/LoadingComponent';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import * as XLSX from 'xlsx';  // Import thư viện xlsx
import { IoEyeSharp } from "react-icons/io5";
const InventoryPage = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [dataSearch, setDataSearch] = useState('')
    const axios = useAxiosAuth();
    const router = useRouter();



    useEffect(() => {
       fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const res = await handleApiCall(axios.post('/product', { limit: 500 }));
        setProducts(res?.data || []);
        setIsLoading(false);
    }

    const filterProducts = async () => {
        const res = await handleApiCall(axios.post('/product', { limit: 100, productFilter: { name: dataSearch, category: dataSearch, brand: dataSearch } }));

        console.log("res", res);

        setProducts(res?.data || []);
    }

    const columns = [
        {
            field: 'action',
            headerName: 'Xem chi tiết',
            flex:1,
            renderCell: (params: any) => (
                <button
                    onClick={() => { }}
                    className="text-primary"
                >
                    <IoEyeSharp size={20} color="#1E90FF" />
                </button>
            ),
        },
        { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'name', headerName: 'Name', flex: 3 },


    ]

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(products);  // Chuyển đổi mảng sản phẩm thành sheet
        const wb = XLSX.utils.book_new();  // Tạo một workbook mới
        XLSX.utils.book_append_sheet(wb, ws, 'Products');  // Thêm sheet vào workbook
        XLSX.writeFile(wb, 'products.xlsx');  // Tạo file Excel và tải về
    };

    if (isLoading) return <LoadingComponent />
    return (
        <div className="flex flex-col items-center justify-center gap-4">

            <div className='bg-white'>

            </div>
            <div className="h-[95%] w-[96%] bg-white p-5" >
                <div className='flex flex-row items-center justify-between mb-10'>
                    <h1 className="text-2xl font-bold hover:cursor-pointer hover:opacity-95"
                        onClick={() => fetchProducts()}
                    >Danh sách kho hàng</h1>

                    <div className=' flex flex-row items-center gap-1 border rounded-full pl-2'>
                        <CiSearch size={24} />
                        <input
                            type="text"
                            className='focus:outline-none w-[300px] rounded-full px-4 py-2'
                            onChange={(e) => setDataSearch(e.target.value)}
                        />
                        <button
                            className='bg-teal-700 text-white px-3 py-2 rounded-r-full font-light'
                            onClick={() => filterProducts()}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Nút xuất file Excel */}
                <div className="mb-4">
                    <button
                        onClick={exportToExcel}
                        className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-500 transition"
                    >
                        Xuất Excel
                    </button>
                </div>
                <div className='w-full bg-white shadow-md rounded-md p-4'>
                    <DataGrid
                        columns={columns}
                        rows={products}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10, 20, 50]}
                        disableRowSelectionOnClick
                        onRowClick={(params) => router.push(`/admin/inventory/${params.row.id}`)}
                        sx={{
                            '.MuiDataGrid-columnHeader': {
                                fontWeight: 'bold',
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    />


                </div>

                <RenderIf isTrue={products.length === 0}>
                    <div className='flex flex-col items-center justify-center gap-4 my-5'>
                        <h1 className="text-xl font-bold">Không tìm thấy sản phẩm</h1>
                    </div>
                </RenderIf>
            </div>

        </div>
    )
}

export default InventoryPage
