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
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface IPrams {
    sku: string;
}

const ReceiptClient: React.FC<IPrams> = ({ sku }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<any[]>([]);  // Đảm bảo product là mảng
    const [inputValue, setInputValue] = useState<string>('');

    const router = useRouter();
    const axios = useAxiosAuth();

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'date', headerName: 'Ngày nhập hàng', flex: 1 },
        { field: 'importerId', headerName: 'Người nhập hàng', flex: 1 },
        { field: 'quantity', headerName: 'Số lượng', flex: 1 },
    ];

    const handleAddStock = async () => {
        if (!inputValue || isNaN(Number(inputValue)) || Number(inputValue) <= 0) {
            alert("Vui lòng nhập một số lượng hợp lệ.");
            return;
        }

        try {
            const response = await handleApiCall(axios.post(`/inventory/add-stock/${sku}`, { quantity: Number(inputValue) }));
            console.log('response', response);
            // Cập nhật lại sản phẩm sau khi nhập kho thành công
            fetchProduct();
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await handleApiCall(axios.get(`/inventory/sku/${sku}`));
            console.log('response', response);
            setProduct(response.data.entries || []); 
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [sku]);  

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center border h-screen'>
                <div className='text-xl mt-10 text-slate-400 flex flex-row items-center gap-2 bg-white w-[95%] justify-center py-10 h-[70%]'>
                    <MdOutlineUpdate size={20} />
                    loading...
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center text-slate-700 gap-5'>
            <div className='flex flex-row bg-white w-[95%] py-6 justify-between px-5'>
                <div>
                    <button onClick={() => window.history.back()}>
                        <IoIosArrowRoundBack size={25} />
                    </button>
                </div>
                <div>
                    SKU|  {sku}
                </div>
            </div>
            <hr className="w-[95%] border-t-[10px] border-slate-700" />

            <div className='flex flex-row bg-white w-[95%] justify-center p-10 gap-5'>
                <input
                    type="number"
                    className='border px-4 py-2'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập số lượng"
                />
                <button
                    className='border px-4 py-2'
                    onClick={handleAddStock}
                >Nhập số lượng hàng</button>
            </div>

            <div className='w-[95%] my-10 bg-white'>
                <p className='px-5 py-2 text-2xl'>Lịch sử nhập kho</p>
                <DataGrid
                    columns={columns}
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
                    disableColumnMenu
                    disableColumnSelector
                />
            </div>
        </div>
    );
};

export default ReceiptClient;
