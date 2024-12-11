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

const ProductStoredPage = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [dataSearch, setDataSearch] = useState('');
    const axios = useAxiosAuth();
    const router = useRouter();
    const [openForm, setOpenForm] = useState(false);

    // State for form fields

    const fetchSuppliers = async () => {
        const res = await handleApiCall(axios.get('/supplier'));
        setSuppliers(res?.data || []);
    };

    const fetchProducts = async () => {
        const res = await handleApiCall(axios.get(`/sku-details/status/STORED`));
        console.log("res", res);
        
        setProducts(res?.data || []);
    };

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);



    const columns = [
        {
            field: 'action',
            headerName: 'Mở bán',
            flex: 1,
            renderCell: (params: any) => (
                <button
                    color="primary"
                    onClick={() => {
                        setOpenForm(true);
                        router.push(`/admin/product-stored/${params.row?.id}`);
                    }}
                >
                    <CiEdit size={20} />
                </button>
            ),
        },
        { field: 'id', headerName: 'ID Biến thể', flex: 1 },
        { field: 'productId', headerName: 'ID Sản phẩm', flex: 1, editable: true },
        { field: 'productName', headerName: 'Name', flex: 3 },
        {
            field: 'color',
            headerName: 'Màu sắc',
            flex: 1,
            renderCell: (params: any) => params?.row?.color || 'NaN'
        },
        {
            field: 'capacity',
            headerName: 'Dung lượng',
            flex: 1,
            renderCell: (params: any) => params?.row?.capacity || 'NaN'
        },
        {
            field: 'size',
            headerName: 'Kích thước',
            flex: 1,
            renderCell: (params: any) => params?.row?.size || 'NaN'
        },
    ];



    const filterProducts = async () => {
        const res = await handleApiCall(
            axios.post('/product', {
                limit: 100,
                productFilter: { name: dataSearch, category: dataSearch, brand: dataSearch },
            })
        );
        setProducts(res?.data || []);
    };


    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-white"></div>
            <div className="h-[95%] w-[96%] bg-white p-5">
                <div className="flex flex-row items-center justify-between mb-10">
                    <h1
                        className="text-2xl text-green-700 font-bold hover:cursor-pointer hover:opacity-95"
                        onClick={() => fetchProducts()}
                    >
                        Sản phẩm chưa mở bán
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

export default ProductStoredPage;

