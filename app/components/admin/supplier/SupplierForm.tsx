'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaHouseUser } from "react-icons/fa";
import handleApiCall from "@/services/handleApiCall";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { showToastError, showToastSuccess } from "@/utils/util";
import Input from "../../inputs/Input";

interface AuthFormProps {
    onClose: () => void;
    setIsFormSuccess: (success: boolean) => void;
}

const SupplierForm: React.FC<AuthFormProps> = ({ onClose, setIsFormSuccess }) => {
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
            'name': "",
            'phoneNumber': "",
            'address': "",
        }
    })

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { name, phoneNumber, address } = data;
        console.log("data", data);

        const res = await handleApiCall(axios.post('/supplier/create', { name, phoneNumber, address }));

        setIsFormSuccess(true)    
        onClose();
        showToastSuccess("Thêm NCC Thành Công");

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
                    <h2 className="text-2xl font-normal text-slate-600">NHÀ CUNG CẤP MỚI</h2>
                </div>
                {errors.name && <p className="text-red-500 text-xl">Vui lòng kiểm tra thông tin</p>}

                <Input id="name" label="Họ và Tên NCC" disabled={isLoading}
                    errors={errors} register={register}
                    isDefaultValue
                    required
                />

                <Input id="phoneNumber" label="Số Điện Thoại" disabled={isLoading}
                    errors={errors} register={register} required isDefaultValue

                />
                <Input id="address" label="Địa Chỉ" disabled={isLoading}
                    errors={errors} register={register} required isDefaultValue

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

export default SupplierForm;
