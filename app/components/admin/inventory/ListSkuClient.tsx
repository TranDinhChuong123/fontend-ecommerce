

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import { CiEdit } from 'react-icons/ci';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdOutlineUpdate } from 'react-icons/md';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import { IoEyeSharp } from "react-icons/io5";

interface IPrams {
    productId: string;
}

const ListSkuClient: React.FC<IPrams> = ({ productId }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<any>([]);

    const router = useRouter();
    const axios = useAxiosAuth();

    const columns = [
        {
            field: 'action',
            headerName: 'Xem chi tiết',
            width: 100,
            renderCell: (params: any) => (
                <button
                    onClick={() => router.push(`/admin/inventory/receipt?inven_id=${params.row.id}&prod_id=${productId}&sku_id=${params.row.variationId}`)}
                    className="text-primary"
                >
                    <IoEyeSharp size={20} color="#1E90FF" />
                </button>
            ),
        },
        { field: 'variationId', headerName: 'SKU', width: 100 },
        product[0]?.color ? { field: 'color', headerName: 'Màu sắc', width: 150 } : null,
        product[0]?.capacity ? { field: 'capacity', headerName: 'Dung lượng', width: 150 } : null,
        product[0]?.size ? { field: 'size', headerName: 'Kích thước', width: 150 } : null,
        { field: 'quantityInStock', headerName: 'Số lượng tồn', width: 200 },
        { field: 'totalQuantityIn', headerName: 'Tổng lượng nhập', width: 200 },
    ];

    const validColumns = columns.filter(column => column !== null); // Remove null columns

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await handleApiCall(axios.get(`/inventory/${productId}`));
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-slate-400">
                <div className="flex items-center gap-2 bg-white p-10 rounded-md shadow-md">
                    <MdOutlineUpdate size={20} />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-slate-700 max-w-7xl mx-auto px-5 py-8">
            <div className="flex justify-between items-center bg-white w-full py-4 px-5 rounded-md shadow-md mb-4">
                <button onClick={() => window.history.back()} className="text-gray-500">
                    <IoIosArrowRoundBack size={25} />
                </button>
                <div className="text-lg font-semibold">Sản phẩm | {productId}</div>
            </div>

            <hr className="w-full border-t-[2px] border-slate-300 mb-4" />

            <div className="flex gap-4 bg-white p-4 rounded-md shadow-md w-full mb-6">
                <div className="relative w-[200px] aspect-square">
                    {product[0]?.urlImage && (
                        <Image
                            className="object-contain bg-cover"
                            src={product[0].urlImage}
                            alt={product[0].productName || "Product Image"}
                            fill
                        />
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-xl font-medium">{product[0]?.productName}</p>
                </div>
            </div>

            <div className="w-full bg-white shadow-md rounded-md p-4">
                <DataGrid
                    columns={validColumns}
                    rows={product}
                    pageSizeOptions={[10]}
           
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnSelector
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                    }}
                    sx={{
                        '.MuiDataGrid-columnHeader': {
                            fontWeight: 'bold',
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ListSkuClient;

