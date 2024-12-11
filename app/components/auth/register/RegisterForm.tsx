

"use client";

import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../inputs/Input';
import Button from '../../common/Button';
import RenderIf from '@/utils/RenderIf';
import OtpFormRegiter from '@/app/components/auth/register/OtpFormRegister';
import handleApiCall from '@/services/handleApiCall';
import axios from '@/services/axios/publicAxios';
import { useRouter } from 'next/navigation';
import { TbRuler } from 'react-icons/tb';
import { showToastError } from '@/utils/util';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Props {
    stage: string
}


const RegisterForm: React.FC<Props> = ({ stage }) => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = (email: string) => {
        setEmail(email);
        setStep(2);
    };

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setError
    } = useForm<FieldValues>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: 'all', // Kiểm tra tất cả các trường trong form
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("data", data);

        try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/auth/send-verification-code/${data.email}`, {
                method: 'POST',
            });
            const resData = await response.json();
            console.log("resData", resData);
            if (!resData.data) {
                showToastError('Gữi Email không thành công')
            }
            if (resData.data) {
                setOpenAuthModal(true);
                router.push(`/auth/register?stage=2`);
                router.refresh();
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }

    };

    const fullname = watch('fullname');
    const emailInput = watch('email');
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const isFormValid = fullname && emailInput && password && confirmPassword && isValid;
    const user = {
        name: fullname,
        username: emailInput,
        password: password,
        email: emailInput,
        image: "",
        role: "CUSTOMER",
        authProvider: "google",
    }
    useEffect(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Mật khẩu và xác nhận mật khẩu không khớp",
            });
        }
    }, [password, confirmPassword, setError]);


    return (
        <div className='w-[500px] bg-white p-4 rounded-lg shadow-lg '>
            <RenderIf isTrue={!openAuthModal || stage != "2"}>
                <div className='flex flex-col gap-4 w-[100%]'>
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <h1
                            className="font-bold text-3xl text-gray-800 hover:text-gray-600 hover:cursor-pointer transition duration-200"
                            onClick={() => router.push('/')}
                        >
                            EconoMart
                        </h1>

                        <h2 className="text-xl text-gray-500 font-medium">
                            Đăng ký
                        </h2>
                    </div>

                    <Input
                        id="fullname"
                        label="Họ và Tên"
                        errors={errors}
                        register={register}
                        required
                    />
                    <Input
                        id="email"
                        label="Email"
                        errors={errors}
                        register={register}
                        required
                    />
                    <Input
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        errors={errors}
                        register={register}
                        required
                    />
                    <Input
                        id="confirmPassword"
                        label="Xác nhận mật khẩu"
                        type="password"
                        errors={errors}
                        register={register}
                        required
                    />
                    {errors.confirmPassword &&
                        <p className="text-red-500">
                            {errors.confirmPassword.message as string}
                        </p>
                    }
                    <Button
                        label={isLoading ? "Loading..." : "Tạo Tài khoản"}
                        onClick={() => isFormValid && handleSubmit(onSubmit)()}
                        disabled={!isFormValid || isLoading}
                    />
                </div>
            </RenderIf>

            <RenderIf isTrue={openAuthModal == true && stage == "2"}>
                <OtpFormRegiter user={user} />
            </RenderIf>
        </div>
    );
}

export default RegisterForm;




