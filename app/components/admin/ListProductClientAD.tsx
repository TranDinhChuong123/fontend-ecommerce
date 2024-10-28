'use client'

import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";

const ListProductClientAD = () => {
    const [products, setProducts] = useState([])
    const [dataSearch, setDataSearch] = useState('')
    const axios = useAxiosAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await handleApiCall(axios.post('/product', { limit: 200 }));
            setProducts(res?.data || []);
        }
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const res = await handleApiCall(axios.post('/product', { limit: 200 }));
        setProducts(res?.data || []);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 400 },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'brand', headerName: 'Brand', width: 200 },

    ]

    const filterProducts = async () => {
        const res = await handleApiCall(axios.post('/product', { limit: 100, productFilter: { name: dataSearch, category: dataSearch, brand: dataSearch } }));

        console.log("res", res);

        setProducts(res?.data || []);
    }


    return (


        <div className="flex flex-col items-center justify-center gap-4">

            <div className='bg-white'>

            </div>
            <div className="h-[95%] w-[96%] bg-white p-5" >
                <div className='flex flex-row items-center justify-between mb-10'>
                    <h1 className="text-2xl font-bold hover:cursor-pointer hover:opacity-95"
                        onClick={() => fetchProducts()}
                    >Danh sách sản phẩm</h1>

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

export default ListProductClientAD
