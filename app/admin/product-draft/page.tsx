'use client';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { GrCheckbox } from "react-icons/gr";
import { useEffect, useState } from 'react';
import { CiSearch, CiEdit } from "react-icons/ci";
import { formatPrice, showToastError, showToastSuccess } from '@/utils/util';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/common/Button';
import { MdAddChart } from "react-icons/md";
import LoadingComponent from '@/app/components/common/LoadingComponent';
const ProductsDraftPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [dataSearch, setDataSearch] = useState('');
    const axios = useAxiosAuth();
    const router = useRouter();
    const [openForm, setOpenForm] = useState(false);
    const [productAdd, setProductAdd] = useState<any>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
    const [openTableSupplier, setOpenTableSupplier] = useState(false);

    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [averagePrice, setAveragePrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const fetchSuppliers = async () => {
        const res = await handleApiCall(axios.get('/supplier'));
        setSuppliers(res?.data || []);
    };

    const fetchProducts = async () => {
        const res = await handleApiCall(axios.get(`/sku-details/status/DRAFT`));
        setProducts(res?.data || []);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);


    useEffect(() => {
        if (quantity > 0) {
            setAveragePrice(cost / quantity);
        } else {
            setAveragePrice(0);
        }
    }, [quantity, cost]);

    const columns = [
        {
            field: 'action',
            headerName: 'Nhập kho',
            flex: 1,
            renderCell: (params: any) => (
                <button
                    color="primary"
                    onClick={() => {
                        setOpenForm(true);
                        setProductAdd(params.row);
                    }}
                >
                    <MdAddChart size={20} className='text-green-600' />
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

    const columnsSupplier = [
        {
            field: 'action',
            headerName: 'Chọn',
            width: 100,
            renderCell: (params: any) => (
                <button
                    color="primary"
                    onClick={() => {
                        setOpenTableSupplier(false);
                        setSelectedSupplier(params.row);
                    }}
                >
                    <GrCheckbox  className='text-green-600' size={22} />
                </button>
            ),
        },
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Tên nhà cung cấp', flex: 1 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 1 },
        { field: 'address', headerName: 'Địa chỉ', flex: 1 },
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

    const onSubmit = async () => {


        if (!selectedSupplier) {
            showToastError('Chọn nhà cung cấp');
            return;
        }
        console.log("selectedSupplier", selectedSupplier);

        const inventory = {
            variationId: productAdd?.id,
            productId: productAdd?.productId,
            totalQuantityIn: 0,
            quantityInStock: 0,
            totalCost: 0,
        };
        const resInventory = await handleApiCall(axios.post(`/inventory/new`, inventory));
        console.log("resInventory", resInventory);
        if (!resInventory.data) {
            showToastError('Nhập kho không thàng công.');
            return;
        }

        const resInvenTransaction = await handleApiCall(axios.post(`/inventory-transactions/create`, {
            inventoryId: resInventory.data.id,
            type: 'IN',
            totalPrice: cost,
            quantity: Number(quantity),
            supplierId: selectedSupplier?.id,
        }));
        console.log("resInvenTransaction", resInvenTransaction);


        if (!resInvenTransaction.data) {
            showToastError('Tạo phiếu nhập hàng không thành công.');
            return;
        }

        const resSKU = await handleApiCall(axios.put(`/sku-details/stored`,{
            id:productAdd?.id,
            price: price,
            discountPercent,  
        }));
        console.log("resSKU", resSKU);
        if (!resSKU) {
            showToastError('Nhập hàng không thành công');
            return;
        }
        setOpenForm(false);
        fetchProducts();
    };
    if (isLoading) return <LoadingComponent />



    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="w-full max-w-7xl bg-white shadow-md rounded-md p-4">
                <h1
                    className="text-3xl font-bold text-teal-700 hover:cursor-pointer hover:text-teal-700 transition"
                    onClick={() => fetchProducts()}
                >
                    Sản phẩm Mẫu
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

            {/* Form Nhập Hàng */}
            <RenderIf isTrue={openForm}>
                <div className="w-full max-w-5xl bg-white shadow-md rounded-md p-6">
                    <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Form Nhập Hàng</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">ID Biến Thể</label>
                            <Input id="id" label="ID Biến Thể" value={productAdd?.id} disabled />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">ID ProductId</label>
                            <Input id="variationId" label="ID ProductId" value={productAdd?.productId || ''} disabled />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Tên Sản Phẩm</label>
                            <Input id="name" label="Tên Sản Phẩm" value={productAdd?.productName} disabled />
                        </div>

                        <div className="col-span-3 flex flex-col items-center gap-2">
                            {productAdd?.color && (
                                <div className='w-full'>
                                    <label className="text-sm font-medium text-gray-600">Màu Sắc</label>
                                    <Input id="name" label="Tên Sản Phẩm" value={productAdd?.color} disabled />
                                </div>
                            )}

                            {productAdd?.size  && (
                                <div className='w-full'>
                                    <label className="text-sm font-medium text-gray-600">Size </label>
                                    <Input id="name" label="Tên Sản Phẩm" value={productAdd?.size} disabled />
                                </div>
                            )}

                            {productAdd?.capacity && (
                                <div className='w-full'>
                                    <label className="text-sm font-medium text-gray-600">Dung lượng </label>
                                    <Input id="name" label="Tên Sản Phẩm" value={productAdd?.capacity} disabled />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Số Lượng Nhập Hàng</label>
                            <Input
                                id="quantity"
                                label="Số Lượng Nhập Hàng"
                                value={quantity.toString()}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>

                        <div className="col-span-2 flex-col items-center gap-4">
                            <label className="text-sm font-medium text-gray-600">Chi Phí Nhập Hàng</label>
                            <Input
                                id="cost"
                                label="Chi Phí Nhập Hàng"
                                value={cost.toString()}
                                onChange={(e) => setCost(Number(e.target.value))}
                            />
                            <span className="text-balance text-red-600 px-2 ">{formatPrice(cost)}</span>
                        </div>

                        <div className="flex flex-col py-1  gap-1 ">
                            <p className="text-lg font-medium">Giá Trung Bình:</p>
                            <p className="text-lg font-bold text-teal-700">{formatPrice(averagePrice)}</p>
                        </div>

                        <div >
                            <label className="text-sm font-medium text-gray-600">Giá Bán</label>
                            <Input
                                id="price"
                                label="Nhập Giá Bán"
                                value={price.toString()}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                            <span className="text-balance text-red-600 px-2 ">{formatPrice(price)}</span>

                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">% Giảm Giá</label>
                            <Input
                                id="discount"
                                label="Nhập % Giảm Giá"
                                value={discountPercent.toString()}
                                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                            />
                        </div>

                        <div className="col-span-3 flex items-center gap-5 ">
                            <label className="text-sm font-medium text-gray-600 w-1/5">Nhà Cung Cấp</label>

                            <Input id="supplier" label="Nhà Cung Cấp" value={selectedSupplier?.name} disabled />

                            <button
                                name="Chọn Nhà Cung Cấp"
                                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition w-2/5"
                                onClick={() => setOpenTableSupplier(true)}
                            >
                                Chọn Nhà Cung Cấp
                            </button>
                        </div>
                    </div>

                    <button
                        name="Nhập Hàng"
                        className="mt-6 w-full bg-teal-700 text-white py-3 rounded shadow hover:bg-teal-800 transition"
                        onClick={onSubmit}
                    >
                        Nhập Hàng
                    </button>
                </div>

                {/* Table Nhà Cung Cấp */}
                <RenderIf isTrue={openTableSupplier}>
                    <div className="w-full max-w-5xl bg-white shadow-md rounded-md p-6">
                        <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">
                            Danh Sách Nhà Cung Cấp
                        </h2>
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
            </RenderIf >

            {/* Content */}
            <div className="w-full max-w-7xl bg-white shadow-md rounded-md p-6">
                <DataGrid
                    columns={columns}
                    rows={products}
                    className="bg-gray-50"
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

                {/* No Product Found */}
                <RenderIf isTrue={products.length === 0}>
                    <div className="flex items-center justify-center py-6">
                        <h1 className="text-xl font-bold text-gray-500">Không tìm thấy sản phẩm</h1>
                    </div>
                </RenderIf>
            </div>


        </div >

    );
};

export default ProductsDraftPage;

