'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaHouseUser } from "react-icons/fa";
import handleApiCall from "@/services/handleApiCall";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { showToastError, showToastSuccess } from "@/utils/util";

interface AuthFormProps {
    onClose: () => void;
    email: string;
    setIsFormSuccess: (success: boolean) => void;
    address?: any;
}

const AddressForm: React.FC<AuthFormProps> = ({ onClose, email, setIsFormSuccess, address }) => {
    const router = useRouter();
    const [zIndex, setZIndex] = useState(50);
    const axios = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            'name': address ? address.name : "",
            'phoneNumber': address ? address.phoneNumber : "",
            'street': address ? address.street : "",
        }
    })

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true);
            const response = await handleApiCall(axios.post(`/user/${email}/addresses`, {
                ...(address && { id: address.id }),
                ...data
            }));

            if (!response) showToastError("Thêm Địa Thất Bại");
            if (address) showToastSuccess("Cập nhập thành công");
            else showToastSuccess("Thêm Địa Chỉ Thành Công");
            setIsFormSuccess(true);
            onClose();
        } catch (error) {
            showToastError('Thêm Địa Chỉ không thành công!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setZIndex(0);
            onClose();
        }
    };
    console.log(errors);


    return (
        <div className={`fixed top-[15%] z-${zIndex} flex justify-center left-0 right-0`} onClick={handleBackdropClick}>
            <div className="relative flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <div className="flex items-center gap-2">
                    <FaHouseUser className="text-slate-600 w-8 h-8" />
                    <h2 className="text-2xl font-normal text-slate-600">Địa chỉ Mới</h2>
                </div>
                {errors.name && <p className="text-red-500 text-xl">Vui lòng kiểm tra thông tin</p>}
                <p className="text-slate-700 ">Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</p>

                <Input id="name" label="Họ và Tên" disabled={isLoading}
                    errors={errors} register={register}
                    required isDefaultValue={address ? true : false}
                />

                <Input id="phoneNumber" label="Số Điện Thoại" disabled={isLoading}
                    errors={errors} register={register} required
                    isDefaultValue={address ? true : false}
                />
                <Input id="street" label="Địa Chỉ Cụ Thể" disabled={isLoading}
                    errors={errors} register={register} required
                    isDefaultValue={address ? true : false}
                />

                <div className="flex flex-row gap-2 items-center justify-end w-full">
                    <button className="px-4 py-2 rounded-md" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="border-slate-400 px-4 py-2 rounded-md border" onClick={handleSubmit(onSubmit)}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
