'use client'

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import { categories } from "@/utils/Categories";
import { createSlug, showToastError, showToastSuccess } from "@/utils/util";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdUpload } from "react-icons/md";
import CategoryInput from "../../inputs/CategoryInput";
import Input from "../../inputs/Input";
import TextArea from "../../inputs/TextArea";
import VariantSelector, { DataVariant } from "./VariantSelector";
export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}


const AddProductClient = () => {
    const axios = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageProduct, setImageProduct] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: 'dien-thoai-smartphone',
            price: '',
            purchasePrice: '',
            productVariation: '',
        },

    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { name, description, brand, category, price, purchasePrice, productVariation } = data;
        if(category === undefined || category === null ){
            showToastError("Vui lòng chọn danh mục");
        }
        if (!imageProduct) {
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

        const product = {
            name,
            description,
            brand,
            category: createSlug(category),
            slug: createSlug(name),
            images: [{
                color: productVariation?.color,
                urlImage: resImages.data[0]
            }],
            productVariations: [
                {
                    color: productVariation?.colorValue,
                    capacity: productVariation?.capacityValue,
                    size: productVariation?.sizeValue,
                    discountPercent: 0,
                    price,
                    purchasePrice
                }
            ]

        }
        const res = await handleApiCall(axios.post(`/product/create`, product));

        console.log("res", res);
        showToastSuccess("Thêm sản phẩm thành công");
        // reset();      

    }

    const category = watch('category')


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setImageProduct(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreviewImage(previewUrl);
        }
    };


    const setCustomValue = (id: string, value: any) => {
        return setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const handleVariantSubmit = (data: DataVariant) => {
        console.log(data);

        return setCustomValue('productVariation', data)
    };




    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="h-[95%] w-[90%] bg-white p-5" >
                <div>
                    <h1 className="text-2xl font-bold">Thêm sản phẩm</h1>
                </div>
            </div >

            <div className="h-[95%] w-[90%] bg-white p-7 flex flex-row items-center gap-2">
                <div className="">
                    <div className="mb-2 font-semibold">Chọn loại sản phẩm</div>
                    <div className="flex flex-row gap-2 items-center flex-wrap">
                        {categories.map((item) => {
                            return <div key={item.lable} className="col-span-1 p-1">
                                <CategoryInput
                                    icon={item.icon}
                                    label={item.lable}
                                    selected={category === item.slug}
                                    onClick={(category) => setCustomValue('category', category)}
                                    slug={item.slug}
                                />

                            </div>

                        })}
                        {/* <button className="flex flex-row border-l-[1.5px] items-center justify-center px-2 h-[50px]">

                            <IoIosAddCircleOutline size={30} className="text-slate-700" />
                            Thêm
                        </button> */}
                    </div>
                </div>
            </div>

            <div className="h-[98%] w-[95%] bg-white py-5 px-2 flex">

                <div className="w-[30%] px-1">
                    <div className="flex flex-col gap-1 items-center w-full">
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div className="preview-container flex flex-row mt-5 h-[200px] w-[200px] gap-2 relative justify-center">
                            {previewImage ? (
                                <Image
                                    key={previewImage}
                                    src={previewImage}
                                    alt={`preview ${previewImage}`}
                                    layout="fill"
                                    objectFit="contain"
                                    className="bg-contain"
                                    unoptimized={true}
                                />
                            ) : (
                                <div className="h-[200px] w-[180px] border-[2px] border-dashed flex items-center justify-center">
                                    <MdUpload size={45} className="text-slate-300" />
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => document.getElementById('fileInput')?.click()} // Mở hộp thoại chọn file khi bấm nút
                            className="bg-blue-500 text-white py-2 px-4  mt-5"
                        >
                            Upload hình ảnh
                        </button>

                    </div>
                </div>

                <div className="w-[60%] flex flex-col gap-2">
                    <div className="mb-2 font-semibold">Thông tin sản phẩm</div>

                    <Input
                        id="name"
                        label="Tên sản phẩm"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required

                    />


                    <div className="flex flex-row gap-2">

                        <Input
                            id="price"
                            label="Giá dự kiến ban đầu"
                            disabled={isLoading}
                            register={register} errors={errors}
                            required
                            type="number"
                        />

                    </div>

                    <Input
                        id="brand"
                        label="Nhãn hàng"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />

                    <TextArea
                        id="description"
                        label="Mô tả"
                        disabled={isLoading}
                        register={register} errors={errors}
                        required
                        placeholder="Mô tả"
                    />
                </div>

                <div className="w-[40%] ">
                    <VariantSelector onSubmit={handleVariantSubmit} />
                </div>



            </div>

            <div className="w-[95%] bg-white py-5 px-2 flex items-center justify-center">
                <button className="bg-sky-400 text-white py-2 px-20 text-lg"

                    onClick={handleSubmit(onSubmit)}
                >
                    Thêm sản phẩm
                </button>

            </div>

        </div >


    )
}

export default AddProductClient
