'use client';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { CiSearch, CiEdit } from "react-icons/ci";
import { formatPrice, showToastError, showToastSuccess } from '@/utils/util';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/common/Button';

const ProductTopSellingPage = () => {
    const [products, setProducts] = useState([]);
    const axios = useAxiosAuth();
    const router = useRouter();


    const fetchProducts = async () => {
        const res = await handleApiCall(axios.get(`/product/top-selling`));
        console.log("res", res);
        
        setProducts(res?.data || []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);



    const columns = [

        { field: 'id', headerName: 'ID Biến thể', flex: 2 },
        { field: 'name', headerName: 'Tên sản phẩm', flex: 3,  },
        { field: 'totalSold', headerName: 'Số lượng bán', flex: 1 },
        
    ];


    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-white"></div>
            <div className="h-[95%] w-[96%] bg-white p-5">
                <div className="flex flex-row items-center justify-between mb-10">
                    <h1
                        className="text-2xl text-green-700 font-bold hover:cursor-pointer hover:opacity-95"
                        onClick={() => fetchProducts()}
                    >
                        Sản phẩm bán chạy
                    </h1>
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
                />

                <RenderIf isTrue={products.length === 0}>
                    <div className="flex flex-col items-center justify-center gap-4 my-5">
                        <h1 className="text-xl font-bold">Không tìm thấy sản phẩm</h1>
                    </div>
                </RenderIf>

            </div>
        </div>
    );
};

export default ProductTopSellingPage;

