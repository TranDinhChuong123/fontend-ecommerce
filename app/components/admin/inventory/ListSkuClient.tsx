"use client";

import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import Image from 'next/image';

import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdOutlineUpdate } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from 'react';
import BackDrop from '../../nav/BackDrop';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';


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
            headerName: 'Nhập hàng',
            width: 100,
            renderCell: (params: any) => (
                <button
                    color="primary"
                    onClick={() => router.push(`/admin/inventory/receipt?sku=${params.row.variationId}`)}
                >
                    <CiEdit size={20} />
                </button>
            ),
        },
        { field: 'variationId', headerName: 'SKU', width: 100 },
        product[0]?.color ? { field: 'color', headerName: 'Màu sắc', width: 150 } : null,
        product[0]?.capacity ? { field: 'capacity', headerName: 'Dung lượng', width: 150 }: null,
        product[0]?.size ? { field: 'size', headerName: 'Kích thước', width: 150 }: null,
        { field: 'quantityInStock', headerName: 'Số lượng tồn', width: 200 },
        { field: 'totalQuantityIn', headerName: 'Tống lượng nhập', width: 200 },

    ]

    const validColumns = columns.filter(column => column !== null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await handleApiCall(axios.get(`/inventory/${productId}`));
                console.log('response', response);

                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center border h-screen'>
                <div className='text-xl mt-10 text-slate-400

                 flex flex-row items-center gap-2 bg-white w-[95%] justify-center py-10 h-[70%]'>
                    <MdOutlineUpdate size={20} />
                    loading...
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center text-slate-700'>
            <div className='flex flex-row bg-white w-[95%] py-6 justify-between px-5'>
                <div>
                    <button onClick={() => window.history.back()}>
                        <IoIosArrowRoundBack size={25} />
                    </button>
                </div>
                <div>
                    Sản phẩm |  {productId}
                </div>
            </div>
            <hr className="w-[95%] border-t-[10px] border-slate-700" />


            <div className='flex flex-row gap-2 bg-white w-[95%] py-4 items-center'>

                <div className='relative w-[200px] aspect-square'>
                    {product[0].urlImage && (
                        <Image
                            className='object-contain bg-cover'
                            src={product[0].urlImage}
                            alt={product.name || "Product Image"}
                            fill
                        />
                    )}
                </div>
                <p>{product[0].productName}</p>
            </div>


            <div className='w-[95%] my-10 bg-white'>
                <DataGrid
                    columns={validColumns}
                    rows={product}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    disableColumnMenu // Tắt menu cho các cột
                    disableColumnSelector // Tắt selector cột
                />
            </div>

        </div>
    );
};

export default ListSkuClient;
