'use client';

import LoadingComponent from '@/app/components/common/LoadingComponent';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { formatPrice, showToastError, showToastSuccess } from '@/utils/util';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { MdUpload } from "react-icons/md";


const AddVariantPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [dataSearch, setDataSearch] = useState('');
    const [variantValue, setVariantValue] = useState<any>({ productId: '', productName: '', price: '', size: '', color: '', capacity: '' });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageProduct, setImageProduct] = useState<File | null>(null);
    const [isColorChecked, setIsColorChecked] = useState(false);
    const [isCapacityChecked, setIsCapacityChecked] = useState(false);
    const [isSizeChecked, setIsSizeChecked] = useState(false);

    const axios = useAxiosAuth();
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await handleApiCall(axios.post('/product', { limit: 100, allProduct: true, sortDirection: 'desc' }));
        setProducts(res?.data || []);
        setIsLoading(false);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVariantValue((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleAddAttribute = async () => {
        if (!imageProduct) {
            showToastError("Vui lòng chọn ảnh");
            return;
        }
        const formData = new FormData();
        formData.append('files', imageProduct);
        const resImages = await handleApiCall(axios.post(`/upload/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }));
        if (resImages.status !== 200) {
            return;
        }
        const { ...rest } = variantValue;

        const variantData = {
            productId: rest.productId,
            productName: rest.productName,
            price: rest.price,
            size: isSizeChecked? rest.size : null,
            color: isColorChecked? rest.color : null,
            capacity: isCapacityChecked? rest.capacity : null,
            urlImage: resImages?.data[0],
        };
        const res = await handleApiCall(axios.post('/sku-details', variantData));

        if (res?.data) {
            showToastSuccess('Thêm thuộc tính thành công');
            setIsFormVisible(false);
            setPreviewImage(null);
            setVariantValue({ productId: '', productName: '', price: '', size: '', color: '', capacity: '' });
        } else {
            showToastError('Thêm thuộc tính không thành công');
        }
    };

    const columns = [
        {
            field: 'action',
            headerName: 'Thêm Biến Thể',
            flex: 1,
            renderCell: (params: any) => (
                <button
                    onClick={() => {
                        setIsFormVisible(true)
                        setVariantValue((prev: any) => ({ ...prev, productId: params?.row?.id, productName: params.row.name }))
                    }}
                    className="text-primary"
                >
                    <IoIosAddCircle size={24} className="hover:cursor-pointer text-blue-600" />
                </button>
            ),
        },
        { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'name', headerName: 'Name', flex: 4 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params: any) => {
                const status = params.row.status;
                const statusClass = status === 'DRAFT' 
                    ? 'text-gray-700 font-semibold' 
                    : status === 'PUBLISHED' 
                    ? ' text-green-700 font-semibold' 
                    : ' text-blue-700 font-semibold'; // Thêm các trạng thái khác nếu cần
    
                return (
                    <div className={`p-2 rounded-md ${statusClass}`}>
                        {status}
                    </div>
                );
            },
        },
    ];
    console.log("Foramdata", variantValue);


    const filterProducts = async () => {
        setIsLoading(true);
        const res = await handleApiCall(
            axios.post('/product', {
                limit: 100,
                productFilter: { name: dataSearch, category: dataSearch, brand: dataSearch },
            })
        );
        setProducts(res?.data || []);
        setIsLoading(false);
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setImageProduct(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreviewImage(previewUrl);
        }
    };

    if (isLoading) return <LoadingComponent />;

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="h-[95%] w-[96%] bg-white p-5">
                <div className="flex flex-row items-center justify-between mb-10">
                    <h1
                        className="text-2xl font-bold hover:cursor-pointer hover:opacity-95"
                        onClick={() => fetchProducts()}
                    >
                        Danh sách sản phẩm
                    </h1>


                    <div className="flex flex-row items-center gap-1 border rounded-full pl-2">
                        <CiSearch size={24} />
                        <input
                            type="text"
                            className="focus:outline-none w-[300px] rounded-full px-4 py-2"
                            onChange={(e) => setDataSearch(e.target.value)}
                        />
                        <button
                            className="bg-teal-700 text-white px-3 py-2 rounded-r-full font-light"
                            onClick={() => filterProducts()}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <RenderIf isTrue={isFormVisible}>
                    <div className="mt-5 p-5 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">Thêm thuộc tính</h2>

                        {/* Product Information Section */}
                        <div className="w-full bg-white shadow-lg p-6 rounded-md mb-6 flex flex-col md:flex-row gap-6">
                            {/* Image Upload Section */}
                            <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                <div className="w-52 h-52 bg-gray-100 border-2 border-dashed flex items-center justify-center relative overflow-hidden">
                                    {previewImage ? (
                                        <Image
                                            key={previewImage}
                                            src={previewImage}
                                            alt={`preview ${previewImage}`}
                                            fill
                                            objectFit="cover"
                                            className="bg-contain"
                                            unoptimized
                                        />
                                    ) : (
                                        <MdUpload size={45} className="text-gray-300" />
                                    )}
                                </div>


                                <button
                                    type="button"
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                    className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 hover:bg-blue-600 transition"
                                >
                                    Upload hình ảnh
                                </button>
                            </div>

                            <div className="flex flex-col gap-4 w-full">
                                <input
                                    type="text"
                                    name="productId"
                                    placeholder="Id sản phẩm"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={variantValue.productId || ''}
                                    disabled
                                />
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Tên sản phẩm "
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={variantValue.productName || ''}
                                    disabled
                                />
                                <input
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="price"
                                    placeholder="Nhập giá tiền dự kiến"
                                    value={variantValue.price}
                                    onChange={handleInputChange}
                                />
                                <span className="text-balance text-red-600 px-2 ">{formatPrice(variantValue.price)}</span>
                                <div className="space-y-4">
                                    {/* Color */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="color"
                                                checked={isColorChecked}
                                                onChange={(e) => setIsColorChecked(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="color" className="text-gray-600">Màu sắc</label>
                                        </div>
                                        {isColorChecked && (
                                            <input
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                name="color"
                                                placeholder="Nhập màu sắc"
                                                value={variantValue.color}
                                                onChange={handleInputChange}
                                            />
                                        )}
                                    </div>

                                    {/* Capacity */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="capacity_checkbox"
                                                checked={isCapacityChecked}
                                                onChange={(e) => setIsCapacityChecked(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="capacity" className="text-gray-600">Dung lượng</label>
                                        </div>
                                        {isCapacityChecked && (
                                            <input
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                name="capacity"
                                                placeholder="Nhập dung lượng"
                                                value={variantValue.capacity}
                                                onChange={handleInputChange}
                                            />
                                        )}
                                    </div>

                                    {/* Size */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="size"
                                                checked={isSizeChecked}
                                                onChange={(e) => setIsSizeChecked(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="size" className="text-gray-600">Kích thước</label>
                                        </div>
                                        {isSizeChecked && (
                                            <input
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                name="size"
                                                placeholder="Nhập kích thước"
                                                value={variantValue.size}
                                                onChange={handleInputChange}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddAttribute}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={() => setIsFormVisible(false)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>


                        </div>


                    </div>
                </RenderIf>

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

export default AddVariantPage;


