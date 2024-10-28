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
import VariationForm from './VariationForm';


interface IPrams {
    productId: string;
}



const ProductDetailClient: React.FC<IPrams> = ({ productId }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<any>({});

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const axios = useAxiosAuth();

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'color', headerName: 'Màu sắc', width: 150 },
        { field: 'size', headerName: 'Kích thước', width: 150 },
        { field: 'price', headerName: 'Giá', width: 150 },
        { field: 'discountPercent', headerName: '(%) giảm giá', width: 100 },
        { field: 'quantity', headerName: 'Số lượng', width: 100, editable: true },
        { field: 'soldQuantity', headerName: 'Đã bán', width: 100 },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 100,
            renderCell: () => (
                <button
                    color="primary"
                    onClick={() => toggleModal()} // Gọi hàm xử lý khi nhấn nút
                >
                    <CiEdit size={20} />
                </button>
            ),
        },



    ]
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await handleApiCall(axios.get(`/product/${productId}`));
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
                    Chi tiết sản phẩm |  {productId}
                </div>
            </div>
            <hr className="w-[95%] border-t-[10px] border-slate-700" />


            <div className='flex flex-row gap-2 bg-white w-[95%] py-4'>

                <div className='relative w-[400px] aspect-square'>
                    {product?.images?.[0]?.urlImage && (
                        <Image
                            className='object-contain bg-cover'
                            src={product.images[0].urlImage}
                            alt={product.name || "Product Image"}
                            fill
                        />
                    )}
                </div>

                <div className='flex flex-col gap-10'>
                    <h1 className='text-2xl font-medium'>{product.name}</h1>
                    <p className=''>Nhãn hàng: {product.brand} </p>
                    <p className=''>Loại hàng: {product.category} </p>

                </div>
            </div>

            <div className='w-[95%] my-10 bg-white'>
                <DataGrid
                    columns={columns}
                    rows={product?.productVariations}
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
            </div>
            <RenderIf isTrue={isOpen}>
                <VariationForm onClose={toggleModal} />
                <BackDrop onClick={toggleModal} />
            </RenderIf>
        </div>
    );
};

export default ProductDetailClient;
