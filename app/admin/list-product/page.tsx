'use client'

import LoadingComponent from '@/app/components/common/LoadingComponent';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
const ListProductPage = () => {
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
        console.log("res", res);

        setProducts(res?.data || []);
        setIsLoading(false);
    }

    const columns = [
        {
            field: 'action',
            headerName: 'Xem chi tiết',
            flex: 1,
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
        { field: 'name', headerName: 'Name', flex: 4 },
        { field: 'status', headerName: 'Trạng thái', flex: 1 },
    ]

    const filterProducts = async () => {
        setIsLoading(true);
        const res = await handleApiCall(axios.post('/product', { limit: 100, productFilter: { name: dataSearch, category: dataSearch, brand: dataSearch } }));
        setProducts(res?.data || []);
        setIsLoading(false);

    }
    if (isLoading) return <LoadingComponent />

    return (

        <div className="flex flex-col items-center justify-center gap-4">

  
            <div className="h-[95%] w-[96%] bg-white p-5" >
      
                {/* Header */}
                <div className="w-full max-w-7xl bg-white shadow-md rounded-md p-4">
                    <h1
                        className="text-3xl font-bold text-teal-700 hover:cursor-pointer hover:text-teal-700 transition"
                        onClick={() => fetchProducts()}
                    >
                        Danh sách sản phẩm
                    </h1>
                    <div className="flex flex-row items-center gap-2 mt-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 w-full max-w-lg">
                            <CiSearch size={24} className="text-gray-600" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full focus:outline-none"
                                onChange={(e) => setDataSearch(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-teal-700 text-white px-4 py-2 rounded-full shadow hover:bg-teal-800 transition"
                            onClick={() => filterProducts()}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                <div>

                </div>

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
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    sx={{
                        '.MuiDataGrid-columnHeader': {
                            fontWeight: 'bold',
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                    onRowClick={(params) => router.push(`/admin/product/${params.row.id}`)}
                />

                <RenderIf isTrue={products.length === 0}>
                    <div className='flex flex-col items-center justify-center gap-4 my-5'>
                        <h1 className="text-xl font-bold">Không tìm thấy sản phẩm</h1>
                    </div>
                </RenderIf>
            </div>

        </div>
    )
}

export default ListProductPage
