'use client';

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import RenderIf from "@/utils/RenderIf";
import { showToastError, showToastSuccess } from "@/utils/util";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdUpload } from "react-icons/md";


const CategoryManagementPage = () => {
    const [categories, setCategories] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false); // Trạng thái hiển thị form
    const [newCategory, setNewCategory] = useState({
        name: '',
        slug: '',
        status: '',
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageProduct, setImageProduct] = useState<File | null>(null);

    const axios = useAxiosAuth();

    // Lấy danh sách category
    const fetchCategories = async () => {
        try {
            const response = await handleApiCall(axios.get('/category/all'));
            console.log('response', response);
            setCategories(response?.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Xử lý thay đổi input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý khi gửi form tạo category
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
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


            const dataCategory = {
                name: newCategory.name,
                slug: newCategory.slug,
                imageUrl: resImages?.data[0],
                status: newCategory.status,
            };
            console.log("dataCategory", dataCategory);
            const response = await handleApiCall(axios.post('/category/create', dataCategory));

            if (response.data) {
                fetchCategories(); // Cập nhật lại danh sách category
                setIsFormOpen(false); // Đóng form
                showToastSuccess('Tạo loại sản phẩm thành công');
            } else {
                showToastSuccess('Lỗi khi tạo loại sản phẩm');
            }
        } catch (error) {
            console.error('Error creating category:', error);
        }
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

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Tên loại sản phẩm', flex: 2 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
            field: 'imageUrl',
            headerName: 'Hình ảnh',
            flex: 1,
            renderCell: (params: any) => (
                <Image
                    src={params.row.imageUrl}
                    alt={params.row.name}
                    width={100}
                    height={100}
                />
            ),
        },
        {
            field: 'createdAndUpdatedAt',
            headerName: 'Ngày tạo và cập nhật',
            flex: 2,
            renderCell: (params: any) => {
                const createdAt = params.row.createdAt ? new Date(params.row.createdAt).toLocaleDateString() : 'N/A';
                const updatedAt = params.row.updatedAt ? new Date(params.row.updatedAt).toLocaleDateString() : 'N/A';

                return (
                    <div>
                        <div>{createdAt} và {updatedAt}</div>
                    </div>
                );
            }
        },
        { field: 'status', headerName: 'Trạng thái', flex: 1 },
    ];

    return (
        <div className="h-min-screen w-full flex justify-center bg-gray-100 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-4xl h-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-700">
                        {isFormOpen ? 'Thêm Loại sản phẩm' : 'Danh sách Loại sản phẩm'}
                    </h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => setIsFormOpen((prev) => !prev)}
                    >
                        {isFormOpen ? 'Trở về' : 'Thêm loại sản phẩm'}
                    </button>
                </div>

                {/* Form tạo category mới */}
                <RenderIf isTrue={isFormOpen}>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                        <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-6">
                            {/* Image Upload Section */}
                            <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                <div className="w-full max-w-[200px] h-[200px] bg-gray-100 border-2 border-dashed flex items-center justify-center relative overflow-hidden rounded-md">
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

                            {/* Form Fields */}
                            <div className="flex flex-col w-full md:w-2/3 gap-5">
                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-600">Tên loại sản phẩm:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCategory.name}
                                        onChange={handleInputChange}
                                        className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-600">Slug:</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={newCategory.slug}
                                        onChange={handleInputChange}
                                        className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-600">Trạng thái:</label>
                                    <select
                                        name="status"
                                        value={newCategory.status}
                                        onChange={handleInputChange}
                                        className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="" disabled>Chọn trạng thái</option>
                                        <option value="ACTIVE">Hoạt động</option>
                                        <option value="INACTIVE">Không hoạt động</option>
                                    </select>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-10 py-2 rounded-md hover:bg-green-600 transition"
                                    >
                                        Tạo mới
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </RenderIf>

                {/* Hiển thị danh sách category */}
                <RenderIf isTrue={!isFormOpen}>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <DataGrid
                            columns={columns}
                            rows={categories}
                            rowHeight={80}
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
                                boxShadow: 2,
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#f3f4f6',
                                    fontWeight: 'bold',
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #e5e7eb',
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: '#e0f7fa', // Màu nền khi hover
                                },
                            }}
                        />
                    </div>
                </RenderIf>
            </div>
        </div>
    );
};

export default CategoryManagementPage;
