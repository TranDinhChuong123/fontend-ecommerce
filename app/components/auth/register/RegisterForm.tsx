// "use client";

// import { useState } from 'react';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import Input from '../inputs/Input';
// import Button from '../Button';
// import RenderIf from '@/utils/RenderIf';
// import OtpForm from '@/app/auth/register/OtpForm';

// function RegisterForm() {
//     const [email, setEmail] = useState('');
//     const [step, setStep] = useState(1);
//     const [openAuthModal, setOpenAuthModal] = useState(false);

//     const handleEmailSubmit = (email: string) => {
//         setEmail(email);
//         setStep(2);
//     };
//     const {
//         reset,
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm<FieldValues>({
//         defaultValues: {
//             'fullname': "",
//             'email': "",
//             'password': "",
//             'confirmPassword': "",
//         },
//         mode: 'all',
//     })
//     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//         setOpenAuthModal(true)
//     };

//     const isFormValid = fullname && emailInput && password && confirmPassword && isValid;
//     return (
//         <div className='w-[500px] bg-white p-4 rounded-lg shadow-lg'>

//             <RenderIf isTrue={!openAuthModal}>
//                 <div className='flex flex-col gap-4 w-[100%]'>
//                     <div className='flex flex-row justify-center'>
//                         <p>Đăng ký Tài khoản</p>
//                     </div>

//                     <Input id="fullname" label="Họ và Tên"
//                         errors={errors} register={register} required
//                     />
//                     <Input id="email" label="Email"
//                         errors={errors} register={register} required
//                     />
//                     <Input id="password" label="Mật khẩu"
//                         errors={errors} register={register} required
//                     />
//                     <Input id="confirmPassword" label="Xác nhận mật khẩu"
//                         errors={errors} register={register} required
//                     />
//                     <Button label='Đăng ký' onClick={() => handleSubmit(onSubmit)} />
//                 </div>
//             </RenderIf>

//             <RenderIf isTrue={openAuthModal}>
//                 <button onClick={() => setOpenAuthModal(!openAuthModal)}>Quay lại</button>
//                 <OtpForm />
//             </RenderIf>
//         </div>
//     );
// }

// export default RegisterForm;

"use client";

import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../inputs/Input';
import Button from '../../Button';
import RenderIf from '@/utils/RenderIf';
import OtpFormRegiter from '@/app/components/auth/register/OtpFormRegister';
import handleApiCall from '@/services/handleApiCall';
import axios from '@/services/axios/publicAxios';
import { useRouter } from 'next/navigation';
import { TbRuler } from 'react-icons/tb';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function RegisterForm() {
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
        // setOpenAuthModal(true);
        console.log("data", data);


        try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/auth/send-verification-code/${data.email}`, {
                method: 'POST',
            });
            const resData = await response.json();
            console.log("resData", resData);

            if (resData.data) {
                setOpenAuthModal(true);
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
            <RenderIf isTrue={!openAuthModal}>
                <div className='flex flex-col gap-4 w-[100%]'>
                    <div className='flex flex-row justify-center'>
                        <p>Đăng ký Tài khoản</p>
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

            <RenderIf isTrue={openAuthModal == true}>
                <button onClick={() => setOpenAuthModal(false)}>Quay lại</button>
                <OtpFormRegiter user={user} />
            </RenderIf>
        </div>
    );
}

export default RegisterForm;




