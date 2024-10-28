'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import handleApiCall from "@/services/handleApiCall";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { showToastError, showToastSuccess, truncateText } from "@/utils/util";
import { AddressType } from "@/types/ProductTypes";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Rating } from "@mui/material";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { log } from "console";

interface AuthFormProps {
    item: any;
    onClose: () => void;
    updateDefaultAddress?: (success: boolean) => void;
}

const ReviewForm: React.FC<AuthFormProps> = ({ item, onClose, updateDefaultAddress }) => {
    const router = useRouter();
    const axios = useAxiosAuth();
    const [zIndex, setZIndex] = useState(50);
    const [ListAddress, setListAddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowForm, setIsShowForm] = useState(false);
    const [isFormSuccess, setIsFormSuccess] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    })
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Chuyển đổi FileList sang array và lưu vào state
            const fileArray = Array.from(files);
            setSelectedImages(fileArray);

            // Tạo URL cho mỗi file để hiển thị trước khi tải lên
            const previewArray = fileArray.map((file) => URL.createObjectURL(file));
            setPreviewImages(previewArray);
        }
    };



    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        selectedImages.forEach((file) => {
            formData.append('files', file); // Tên trường là 'files' theo backend
        });


        const resImages = await handleApiCall(axios.post(`/upload/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }));

        

        if (resImages.status === 200 && resImages.data) {
            {
                const reviewRequest = {
                    orderId: item.id,
                    productId: item.productId,
                    selectedVariationId: item.selectedVariationId,
                    rating: data.rating,
                    comment: data.comment,
                    imageUrls: resImages.data
                };

                const response = await handleApiCall(axios.post(`/review/create`, reviewRequest));

                console.log("response", response);
                if (response.status === 200 && response.data) {
                    showToastSuccess('Đánh giá thành công!');
                    setIsFormSuccess(true);
                    setIsLoading(false);
                    onClose(); // Đóng form sau khi thành công
                } else {
                    showToastError('Đánh giá không thành công. Vui lòng thử lại!'); // Thông báo lỗi nếu không thành công
                }
            }


        };
    }


    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setZIndex(0);
            onClose();
        }
    };


    return (
        <div className={`fixed top-0 z-${zIndex} flex justify-center left-0 right-0 h-[100%]`} onClick={handleBackdropClick}>
            <div className="border relative flex flex-col items-center gap-4 bg-white p-2 rounded-lg shadow-lg w-[650px]">
                <h1 className="text-xl">Đánh giá sản phẩm</h1>
                <hr className="w-full" />

                <div>
                    <div className="flex flex-row gap-4 w-full">
                        <div className="relative flex flex-col gap-4 w-[140px] h-[80px]">
                            <Image src={item.urlImage}
                                alt={item.id}
                                fill
                            />
                        </div>
                        <p>{item.name}</p>
                    </div>
                    <div className="flex flex-row gap-4 items-center py-5">
                        <span>Chất lượng sản phẩm</span>

                        <Rating onChange={(event, newValue) => setCustomValue('rating', newValue)} />

                    </div>

                    <TextArea
                        id="comment"
                        label="comment"
                        register={register}
                        errors={errors}
                        required
                        placeholder="Vui lòng đánh giá cho sản phẩm..."
                    />

                </div>

                <div className="flex flex-col gap-1 items-start w-full">
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('fileInput')?.click()} // Mở hộp thoại chọn file khi bấm nút
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Thêm hình ảnh
                    </button>
                    <div className="preview-container flex flex-row mt-5 h-[100px] w-[100px] gap-2">
                        {previewImages.map((src, index) => (
                            <Image
                                key={index}
                                src={src}
                                alt={`preview ${index}`}
                                width={100}  // Đặt kích thước cho hình ảnh
                                height={100} // Đặt kích thước cho hình ảnh
                                className="preview-image"
                            />
                        ))}
                    </div>

                </div>



                <div className="absolute rounded-b-md bottom-0 flex flex-row gap-2 items-center justify-end w-full bg-white h-[60px] border p-8">

                    <div className="flex flex-row gap-2">
                        <button className="border px-4 py-2 rounded-md" onClick={onClose}>
                            Hủy
                        </button>
                        <button
                            className="border px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang gửi...' : 'Xác nhận'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;


