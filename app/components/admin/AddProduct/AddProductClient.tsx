// 'use client'

// import useAxiosAuth from "@/hooks/useAxiosAuth";
// import handleApiCall from "@/services/handleApiCall";
// import { categories } from "@/utils/Categories";
// import { createSlug, showToastError, showToastSuccess } from "@/utils/util";
// import Image from "next/image";
// import { useState } from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { MdUpload } from "react-icons/md";
// import CategoryInput from "../../inputs/CategoryInput";
// import Input from "../../inputs/Input";
// import TextArea from "../../inputs/TextArea";
// import VariantSelector, { DataVariant } from "./VariantSelector";
// export type ImageType = {
//     color: string;
//     colorCode: string;
//     image: File | null;
// }

// export type UploadedImageType = {
//     colorCode: string;
//     image: string;
// }


// const AddProductPage = () => {
//     const axios = useAxiosAuth();
//     const [isLoading, setIsLoading] = useState(false)
//     const [previewImage, setPreviewImage] = useState<string | null>(null);
//     const [imageProduct, setImageProduct] = useState<File | null>(null);
//     const [isColorChecked, setIsColorChecked] = useState(false);
//     const [isCapacityChecked, setIsCapacityChecked] = useState(false);
//     const [isSizeChecked, setIsSizeChecked] = useState(false);
//     const [colorValue, setColorValue] = useState("");
//     const [capacityValue, setCapacityValue] = useState("");
//     const [sizeValue, setSizeValue] = useState("");

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         reset,
//         formState: { errors }
//     } = useForm<FieldValues>({
//         defaultValues: {
//             name: '',
//             description: '',
//             brand: '',
//             category: 'dien-thoai-smartphone',
//             price: '',
//             purchasePrice: '',
//         },

//     })

//     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//         const { name, description, brand, category, price, purchasePrice } = data;

//         if (category === undefined || category === null) {
//             showToastError("Vui lòng chọn danh mục");
//         }
//         if (!imageProduct) {
//             showToastError("Vui lòng chọn ảnh");
//             return;
//         }
//         const formData = new FormData();
//         formData.append('files', imageProduct);
//         const resImages = await handleApiCall(axios.post(`/upload/images`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         }));

//         if (resImages.status !== 200) {
//             return;
//         }

//         const product = {
//             name,
//             description,
//             brand,
//             category: createSlug(category),
//             slug: createSlug(name),
//             images: [{
//                 color: isColorChecked ? colorValue : undefined,
//                 urlImage: resImages.data[0]
//             }],
//             productVariations: [
//                 // {
//                 //     color: isColorChecked ? colorValue : undefined,
//                 //     capacity: isCapacityChecked ? capacityValue : undefined,
//                 //     size: isSizeChecked ? sizeValue : undefined,
//                 //     discountPercent: 0,
//                 //     price,
//                 //     purchasePrice
//                 // }
//             ]

//         }
//         const res = await handleApiCall(axios.post(`/product/create`, product));
//         if (!res?.data) {
//             showToastError("Thêm sản phẩm thất bại");
//             return
//         }

//         const resdraft = await handleApiCall(axios.post('/product-variation', {
//             productId: res.data.id || '',
//             urlImage: resImages.data[0],
//             color: isColorChecked ? colorValue : undefined,
//             capacity: isCapacityChecked ? capacityValue : undefined,
//             size: isSizeChecked ? sizeValue : undefined,
//             price,
//         }));
//         if (!resdraft) {
//             showToastError("Thêm sản phẩm thất bại");
//             return
//         }

//         console.log("res", res);
//         setSizeValue('')
//         setColorValue('')
//         setCapacityValue('')
//         setIsColorChecked(false)
//         setIsCapacityChecked(false)
//         setIsSizeChecked(false)
//         setPreviewImage(null)
//         setImageProduct(null)
//         reset();
//         showToastSuccess("Thêm sản phẩm thành công");

//     }

//     const category = watch('category')


//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const files = event.target.files;
//         if (files && files.length > 0) {
//             const selectedFile = files[0];
//             setImageProduct(selectedFile);
//             const previewUrl = URL.createObjectURL(selectedFile);
//             setPreviewImage(previewUrl);
//         }
//     };


//     const setCustomValue = (id: string, value: any) => {
//         return setValue(id, value, {
//             shouldDirty: true,
//             shouldTouch: true,
//             shouldValidate: true
//         })
//     }


//     return (
//         <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-50 min-h-screen">
//             {/* Header Section */}
//             <div className="w-full bg-white shadow-lg p-6 rounded-md mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">Thêm sản phẩm</h1>
//             </div>

//             {/* Category Section */}
//             <div className="w-full bg-white shadow-lg p-6 rounded-md mb-6">
//                 <div>
//                     <div className="mb-4 font-semibold text-gray-700">Chọn loại sản phẩm</div>
//                     <div className="flex flex-wrap gap-4">
//                         {categories.map((item) => (
//                             <div key={item.lable} className="flex-shrink-0">
//                                 <CategoryInput
//                                     icon={item.icon}
//                                     label={item.lable}
//                                     selected={category === item.slug}
//                                     onClick={(category) => setCustomValue('category', category)}
//                                     slug={item.slug}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Product Information Section */}
//             <div className="w-full bg-white shadow-lg p-6 rounded-md mb-6 flex flex-col md:flex-row gap-6">
//                 {/* Image Upload Section */}
//                 <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
//                     <input
//                         id="fileInput"
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleFileChange}
//                     />

//                     <div className="w-52 h-52 bg-gray-100 border-2 border-dashed flex items-center justify-center relative overflow-hidden">
//                         {previewImage ? (
//                             <Image
//                                 key={previewImage}
//                                 src={previewImage}
//                                 alt={`preview ${previewImage}`}
//                                 layout="fill"
//                                 objectFit="contain"
//                                 className="bg-contain"
//                                 unoptimized
//                             />
//                         ) : (
//                             <MdUpload size={45} className="text-gray-300" />
//                         )}
//                     </div>

//                     <button
//                         type="button"
//                         onClick={() => document.getElementById('fileInput')?.click()}
//                         className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 hover:bg-blue-600 transition"
//                     >
//                         Upload hình ảnh
//                     </button>
//                 </div>

//                 {/* Product Info Section */}
//                 <div className="w-full md:w-2/3 flex flex-col gap-4">
//                     <Input
//                         id="name"
//                         label="Tên sản phẩm"
//                         disabled={isLoading}
//                         register={register}
//                         errors={errors}
//                         required
//                     />

//                     <div className="flex flex-row gap-4">
//                         <Input
//                             id="price"
//                             label="Giá dự kiến ban đầu"
//                             disabled={isLoading}
//                             register={register}
//                             errors={errors}
//                             required
//                             type="number"
//                         />
//                     </div>

//                     <Input
//                         id="brand"
//                         label="Nhãn hàng"
//                         disabled={isLoading}
//                         register={register}
//                         errors={errors}
//                         required
//                     />

//                     <TextArea
//                         id="description"
//                         label="Mô tả"
//                         disabled={isLoading}
//                         register={register}
//                         errors={errors}
//                         required
//                         placeholder="Mô tả"
//                     />
//                 </div>
//             </div>

//             {/* Attributes Section */}
//             <div className="w-full bg-white shadow-lg p-6 rounded-md mb-6">
//                 <h1 className="font-semibold text-gray-700 mb-4">Thêm thuộc tính</h1>

//                 <div className="space-y-4">
//                     {/* Color */}
//                     <div className="flex flex-col gap-2">
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="color"
//                                 checked={isColorChecked}
//                                 onChange={(e) => setIsColorChecked(e.target.checked)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="color" className="text-gray-600">Màu sắc</label>
//                         </div>
//                         {isColorChecked && (
//                             <input
//                                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 id="colorValue"
//                                 placeholder="Nhập màu sắc"
//                                 value={colorValue}
//                                 onChange={(e) => setColorValue(e.target.value)}
//                             />
//                         )}
//                     </div>

//                     {/* Capacity */}
//                     <div className="flex flex-col gap-2">
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="capacity"
//                                 checked={isCapacityChecked}
//                                 onChange={(e) => setIsCapacityChecked(e.target.checked)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="capacity" className="text-gray-600">Dung lượng</label>
//                         </div>
//                         {isCapacityChecked && (
//                             <input
//                                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 id="capacityValue"
//                                 placeholder="Nhập dung lượng"
//                                 value={capacityValue}
//                                 onChange={(e) => setCapacityValue(e.target.value)}
//                             />
//                         )}
//                     </div>

//                     {/* Size */}
//                     <div className="flex flex-col gap-2">
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="size"
//                                 checked={isSizeChecked}
//                                 onChange={(e) => setIsSizeChecked(e.target.checked)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="size" className="text-gray-600">Kích thước</label>
//                         </div>
//                         {isSizeChecked && (
//                             <input
//                                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 id="sizeValue"
//                                 placeholder="Nhập kích thước"
//                                 value={sizeValue}
//                                 onChange={(e) => setSizeValue(e.target.value)}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Submit Button */}
//             <div className="w-full flex items-center justify-center py-6">
//                 <button
//                     onClick={handleSubmit(onSubmit)}
//                     className="bg-sky-400 text-white py-3 px-16 text-lg font-semibold rounded-lg hover:bg-sky-500 transition"
//                 >
//                     Thêm sản phẩm
//                 </button>
//             </div>
//         </div>



//     )
// }

// export default AddProductPage
