'use client'

import LoadingComponent from "@/app/components/common/LoadingComponent";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import useProfile from "@/hooks/useProfile";
import handleApiCall from "@/services/handleApiCall";
import { showToastError, showToastSuccess } from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdUpload } from "react-icons/md";
const ProfilePage = () => {
    const axios = useAxiosAuth();
    const router = useRouter();
    const { profile, isLoading, setIsUpdate } = useProfile();
    const phoneNumber = profile?.addresses?.find((address: any) => address?.state)?.phoneNumber || '';
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            email: profile?.username || profile?.email || '',
            name: profile?.name || '',
            phone: phoneNumber || '',
            gender: profile?.gender || '',
            dob: profile?.dob || ''
        }
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageProduct, setImageProduct] = useState<File | null>(null);


    const onSubmit = async (data: any) => {
        console.log("data", data);

        const formData = new FormData();
        let resImages;
        if (imageProduct) {
            formData.append('files', imageProduct);
            resImages = await handleApiCall(axios.post(`/upload/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }));

            if (resImages.status !== 200) {
                showToastError("Upload image error");
                return;
            }
            setImageProduct(null);
        }


        const res = await handleApiCall(axios.post('/user/update', {
            ...data,
            // image:  profile?.image || '',
            image: resImages?.data[0] || profile?.image || '',
        }))
        console.log("res", res);

        if (res.status === 200) {
            showToastSuccess("Cập nhật thông tin thành công");
            setIsUpdate(true);
        } else {
            showToastError("Cập nhật thông tin thất bại");
        }
    };

    useEffect(() => {
        if (profile) {
            setValue('email', profile.username || profile.email || null);
            setValue('name', profile.name || null);
            setValue('phone', phoneNumber || null);
            setValue('gender', profile.gender || null);
            setValue('dob', profile.dob || null);
            setPreviewImage(profile?.image || null);
        }
    }, [profile, setValue]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            const maxSize = 1 * 1024 * 1024;
            if (selectedFile.size > maxSize) {
                showToastError("Kích thước tệp phải nhỏ hơn 1MB");
                return;
            }
            setImageProduct(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreviewImage(previewUrl);
        }
    };


    if (isLoading) return <LoadingComponent />

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center w-full px-5">
            <div className="w-full bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">
                    Hồ Sơ Của Tôi
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="">

                    <div className="flex items-center">
                        <div className="w-[70%] flex flex-col gap-2">
                            {/* Email */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">
                                    Tên Đăng nhập
                                </label>
                                <input
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    {...register("email")}
                                    defaultValue={profile?.username || profile?.email || ''}
                                    readOnly
                                    name="email"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>


                            {/* Tên */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">
                                    Tên
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Nhập tên của bạn"
                                    defaultValue={profile?.name}
                                    {...register("name")}
                                    name="name"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>



                            {/* Số điện thoại */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    required
                                    type="text"
                                    defaultValue={phoneNumber || ''}
                                    {...register("phone")}
                                    name="phone"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>

                            {/* Giới tính */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">
                                    Giới tính
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="MALE"
                                            {...register("gender")}
                                            name="gender" // Bổ sung name
                                            defaultChecked={profile?.gender === 'Nam'}
                                            className="mr-2"
                                        />
                                        Nam
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="FEMALE"
                                            {...register("gender")}
                                            name="gender" // Bổ sung name
                                            defaultChecked={profile?.gender === 'Nữ'}
                                            className="mr-2"
                                        />
                                        Nữ
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="OTHER"
                                            {...register("gender")}
                                            name="gender" // Bổ sung name
                                            defaultChecked={profile?.gender === 'Khác'}
                                            className="mr-2"
                                        />
                                        Khác
                                    </label>
                                </div>
                            </div>


                            {/* Ngày sinh */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    {...register("dob")}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>

                        {/* Ảnh đại diện */}
                        <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
                            <label className="block text-gray-600 font-medium mb-2">
                                Ảnh đại diện
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept=".jpeg,.png"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <div className="w-52 h-52 bg-gray-100 border-2 border-dashed flex items-center justify-center relative overflow-hidden rounded-full">
                                {previewImage ? (
                                    <Image
                                        key={previewImage}
                                        src={previewImage}
                                        alt="Avatar"
                                        layout="fill"
                                        objectFit="contain"
                                        className="bg-contain "
                                        unoptimized

                                    />
                                ) : (
                                    <MdUpload size={45} className="text-gray-300" />
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => document.getElementById('fileInput')?.click()}
                                className="border border-gray-200 text-slate-700  py-2 px-6 rounded-md mt-4 hover:bg-gray-200 transition"
                            >
                                Chọn ảnh
                            </button>
                            <div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Định dạng: .JPEG, .PNG
                                </p>
                                <p className="text-sm text-gray-500">
                                    Dụng lượng file tối đa 1 MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Nút lưu */}
                    <button
                        type="submit"
                        className="bg-blue-600 my-4 text-white font-medium py-2 px-10 rounded-md hover:bg-blue-700 transition"
                    >
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage
