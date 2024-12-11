"use client";

import LoadingComponent from '@/app/components/common/LoadingComponent';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { formatPrice, showToastSuccess } from '@/utils/util';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";

interface Props {
    searchParams: { inven_id?: string, prod_id?: string, sku_id?: string };
}

const ReceiptPage: React.FC<Props> = ({ searchParams }) => {

    const [inventory, setInvetory] = useState<any>({});
    const [invenTransactionOut, setInvenTransactionOut] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [invenTransactionIn, setInvenTransactionIn] = useState<any[]>([]);
    const [quantity, setQuantity] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<string>('');
    const [product, setProduct] = useState<any>([]);
    const router = useRouter();
    const [suppliers, setSuppliers] = useState([])
    const [selectedSupplier, setSelectedSupplier] = useState<any>('')
    const [openTableSupplier, setOpenTableSupplier] = useState(false);
    const axios = useAxiosAuth();
    const columnsIn = [
        { field: 'id', headerName: 'ID', flex: 1 },
        // { field: 'inventoryId', headerName: 'ID kho hàng', flex: 1 },
        { field: 'supplierId', headerName: 'Id NCC', flex: 1 },
        { field: 'transactionDate', headerName: 'Ngày nhập hàng', flex: 2 },
        { field: 'performedBy', headerName: 'Người nhập hàng', flex: 2 },
        { field: 'quantity', headerName: 'Số lượng', flex: 1.5 },

        {
            field: 'totalPrice',
            headerName: 'Tổng chi phí',
            flex: 2,
            renderCell: (params: any) => formatPrice(params.value),
        },
        {
            field: 'averagePrice',
            headerName: 'Giá trung bình',
            flex: 2,
            renderCell: (params: any) => {
                const { row } = params;
                const average = row.totalPrice && row.quantity ? row.totalPrice / row.quantity : 0;
                return formatPrice(average);
            },
        },

    ];


    const columnsOut = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'inventoryId', headerName: 'Id Kho hàng', flex: 1 },
        { field: 'orderId', headerName: 'Id Đơn hàng', flex: 1.5 },
        { field: 'transactionDate', headerName: 'Ngày xuất hàng', flex: 2 },
        { field: 'quantity', headerName: 'Số lượng', flex: 1 },
        { field: 'performedBy', headerName: 'Người xuất hàng', flex: 1.5 },
    ];
    const columnsSupplier = [
        {
            field: 'action',
            headerName: 'Chọn',
            width: 100,
            renderCell: (params: any) => (
                <button
                    color="primary"
                    onClick={() => {
                        setOpenTableSupplier(false)
                        setSelectedSupplier(params.row)
                    }}
                >
                    <CiEdit size={20} />
                </button>
            ),
        },
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Tên nhà cung cấp', flex: 1 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 1 },
        { field: 'address', headerName: 'Địa chỉ', flex: 1 },
    ]

    const average = invenTransactionIn.reduce((total, transaction) =>
        total + transaction.totalPrice / transaction.quantity,
        0);
    const averagePrice = average / invenTransactionIn.length;


    const fetchSuppliers = async () => {
        const res = await handleApiCall(axios.get('/supplier'));
        setSuppliers(res?.data || []);
    }
    const fetchProduct = async () => {
        try {
            const response = await handleApiCall(axios.get(`/product/${searchParams.prod_id}`));
            setProduct(response?.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
    const fetchInventory = async () => {
        try {
            const response = await handleApiCall(axios.get(`/inventory/sku/${searchParams.sku_id}`));
            setInvetory(response?.data);
            console.log('response', response?.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    useEffect(() => {
        fetchSuppliers();
        fetchProduct();
        fetchInventory();
        fetchInvenTransactionIn();
        fetchInvenTransactionOut();
    }, [searchParams]);

    const fetchInvenTransactionIn = async () => {
        try {
            const response = await handleApiCall(axios.get(`/inventory-transactions/inventory/${searchParams.inven_id}/type/IN`));
            setInvenTransactionIn(response?.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching inventory transactions:', error);
            setLoading(false);
        }
    };

    const fetchInvenTransactionOut = async () => {
        try {
            const response = await handleApiCall(axios.get(`/inventory-transactions/inventory/${searchParams.inven_id}/type/OUT`));
            setInvenTransactionOut(response?.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching inventory transactions:', error);
            setLoading(false);
        }
    };

    const productVariation = product?.productVariations?.find((v: any) => v.id === searchParams.sku_id);

    const handleAddStock = async () => {
        if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
            alert("Vui lòng nhập một số lượng hợp lệ.");
            return;
        }
        try {
            const response = await handleApiCall(axios.post(`/inventory-transactions/create`, {
                inventoryId: searchParams.inven_id,
                type: 'IN',
                totalPrice: totalPrice,
                quantity: Number(quantity),
                supplierId: selectedSupplier?.id,
            }));
            showToastSuccess('Thêm kho hàng thành công');
            fetchInvenTransactionIn();  // Refresh the transaction history
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    if (loading) return <LoadingComponent />;

    return (
        <div className="container mx-auto p-5 text-slate-700">
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md mb-4">
                <button onClick={() => window.history.back()} className="text-xl text-blue-600">
                    <IoIosArrowRoundBack size={25} />
                </button>
                <span className="text-xl font-medium">Inven_ID | {searchParams.inven_id}</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex gap-6 items-center mb-8">
                <div className="relative w-1/3 h-48">

                    {product?.images?.[0]?.urlImage && (
                        <Image
                            className="object-contain bg-cover"
                            src={product.images[0].urlImage}
                            alt={product.name || 'Product Image'}
                            fill
                        />
                    )}

                </div>
                <div className="w-2/3 text-xl font-medium flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">{product?.name}</h2>

                    <div className='flex gap-10'>
                        {productVariation?.color && <p> Màu : {productVariation?.color}</p>}
                        {productVariation?.size && <p> Size : {productVariation?.size}</p>}
                        {productVariation?.capacity && <p> Dung lượng: {productVariation?.capacity}</p>}
                    </div>
                    Giá bán : {formatPrice(productVariation?.price)}
                </div>
            </div>

            <hr className="border-t-4 border-slate-700 mb-8" />


            <div className="p-6 border rounded-md shadow-md w-full md:w-128 lg:w-144 xl:w-160 bg-white my-10">
                <h2 className="text-2xl font-semibold mb-4 text-center">Thông Tin Kho Hàng</h2>

                <div className=" mb-4">
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Tên Kho Hàng:</span>
                        <span className="font-bold">{inventory?.warehouseName}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Địa chỉ Kho Hàng:</span>
                        <span className="font-bold">{inventory?.warehouseAddress}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Thông tin liên hệ Quản lý:</span>
                        <span className="font-bold">{inventory?.managerContact}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Số lượng trong kho:</span>
                        <span className="font-bold">{inventory?.quantityInStock}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Tổng số lượng xuất kho:</span>
                        <span className="font-bold">{inventory?.totalQuantityIn - inventory?.quantityInStock}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Tổng số lượng nhập kho:</span>
                        <span className="font-bold">{inventory?.totalQuantityIn}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Giá nhập hàng Trung bình:</span>
                        <span className="font-bold">{formatPrice(inventory?.totalCost / inventory?.totalQuantityIn)}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-base">
                        <span className="font-medium text-gray-600">Giá nhập bán hiện tại:</span>
                        <span className="font-bold">{formatPrice(productVariation?.price)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                        <span className="font-medium text-gray-600">Tổng chi phí:</span>
                        <span className="font-bold">{formatPrice(inventory?.totalCost)}</span>
                    </div>
                </div>
            </div>


            <div>
            </div>

            {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col gap-4 items-center focus:border-r-indigo-600">
                <input
                    type="number"
                    className="w-1/3 p-2 border border-gray-300 rounded-md"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Nhập số lượng"
                />
                <input
                    type="number"
                    className="w-1/3 p-2 border border-gray-300 rounded-md"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    placeholder="Nhập chi phí"
                />
                <div className='flex flex-row gap-2'>


                    <input
                        type="text"
                        className="w-1/3 p-2 border border-gray-300 rounded-md hover:cursor-not-allowed"
                        value={selectedSupplier?.name || ''}
                        disabled
                        placeholder="Nhà cung cấp"
                    />

                    <div className='w-[40%]'>
                        <button  onClick={() => setOpenTableSupplier(true)}>
                            Chọn nhà cung cấp
                        </button>
                    </div>
                </div>

                <RenderIf isTrue={openTableSupplier}>
                    <div>
                        <div className='flex justify-center p-5'>
                            <p className='text-2xl font-bold'>Danh sách nhà cung cấp</p>
                        </div>
                        <DataGrid
                            columns={columnsSupplier}
                            rows={suppliers}
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
                </RenderIf>

                <button
                    onClick={handleAddStock}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Nhập số lượng hàng
                </button>
            </div> */}

            <div className="bg-white p-8 rounded-xl shadow-lg mb-10 flex flex-col gap-6 items-center">
                <div className='flex flex-row gap-4 w-full '>
                    {/* Input số lượng */}
                    <div className="w-full   flex flex-col items-start gap-2">
                        <label className="text-gray-700 font-medium" htmlFor="quantity">Số lượng:</label>
                        <div className='w-full'>
                            <input
                                id="quantity"
                                type="number"
                                className="w-full  p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Nhập số lượng"
                            />
                        </div>
                    </div>

                    {/* Input tổng chi phí */}
                    <div className="w-full flex flex-col items-start gap-2">
                        <label className="text-gray-700 font-medium" htmlFor="totalPrice">Chi phí:</label>
                        <div className='w-full'>
                            <input
                                id="totalPrice"
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={totalPrice}
                                onChange={(e) => setTotalPrice(e.target.value)}
                                placeholder="Nhập chi phí"
                            />
                        </div>
                        <p className='w-full text-right text-red-600'>{formatPrice(totalPrice)}</p>
                    </div>
                </div>

                {/* Chọn nhà cung cấp */}
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-4">
                        <input
                            type="text"
                            className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                            value={selectedSupplier?.name || ''}
                            disabled
                            placeholder="Nhà cung cấp"
                        />
                        <button
                            onClick={() => setOpenTableSupplier(true)}
                            className="p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition shadow-md"
                        >
                            Chọn nhà cung cấp
                        </button>
                    </div>

                    {/* Danh sách nhà cung cấp */}
                    <RenderIf isTrue={openTableSupplier}>
                        <div className="w-full bg-white p-6 rounded-xl shadow-inner">
                            <div className="flex justify-center p-5">
                                <p className="text-2xl font-semibold text-gray-700">Danh sách nhà cung cấp</p>
                            </div>
                            <DataGrid
                                columns={columnsSupplier}
                                rows={suppliers}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                sx={{
                                    '.MuiDataGrid-columnHeader': {
                                        fontWeight: 'bold',
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableRowSelectionOnClick
                                className="border border-gray-300 rounded-lg"
                            />
                        </div>
                    </RenderIf>
                </div>

                {/* Nút nhập số lượng hàng */}
                <button
                    onClick={handleAddStock}
                    className="w-full md:w-2/3 lg:w-1/2 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition shadow-md"
                >
                    Nhập hàng
                </button>
            </div>


            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-2xl font-semibold mb-4">Lịch sử nhập kho</p>
                <DataGrid
                    columns={columnsIn}
                    rows={invenTransactionIn}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnSelector
                    sx={{
                        '.MuiDataGrid-columnHeader': {
                            fontWeight: 'bold',
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-2xl font-semibold mb-4">Lịch sử xuất kho</p>
                <DataGrid
                    columns={columnsOut}
                    rows={invenTransactionOut}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnSelector
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

export default ReceiptPage;

