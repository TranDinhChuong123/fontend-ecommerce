'use client'

import { useEffect, useState } from "react"
import Heading from "../../components/common/Heading"
import Input from "../../components/inputs/Input"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import Button from "../../components/common/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import GoogleIcon from "@/public/google-icon.png"
import decodeToken from "@/utils/decodeToken"
import getCurrentUser from "@/actions/getCurrentUser"
import { showToastError } from "@/utils/util"


interface LoginFormProps {
    currentUser: any;
    // currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {


    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)


    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            'email': "",
            'password': "",
        }
    })

    useEffect(() => {
        reset();
    }, [reset]);


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true)
            const callback = await signIn('credentials', {
                ...data,
                redirect: false,
            });
            if (callback?.ok) {
                router.refresh();
            } else if (callback?.error) {
                showToastError("Email hoặc password không đúng");
                console.log(callback.error);
            }
        } catch (error) {
            toast.error('Email hoặc password không đúng');
            console.log(error);
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        if (currentUser) {
            const user = decodeToken(currentUser?.accessToken || "")
            if (user?.role === "ROLE_ADMIN") {
                router.push('/admin/dashboard');
                router.refresh();
            } else {
                router.push('/');
                router.refresh();

            }
        }
    }, [currentUser, router])

    if (currentUser) {
        return <p className="text-center">Logged in. Redirecting...</p>
    }
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return (
        <>
            <div className="flex flex-col items-center space-y-2 text-center">
                <h1
                    className="font-bold text-3xl text-gray-800 hover:text-gray-600 hover:cursor-pointer transition duration-200"
                    onClick={() => router.push('/')}
                >
                    EconoMart
                </h1>

                <h2 className="text-xl text-gray-500 font-medium">
                    Đăng Nhập
                </h2>
            </div>

            {Object.keys(errors).length > 0 && (
                <p className="text-red-500 text-center mt-2">Vui lòng kiểm tra thông tin đăng nhập</p>
            )}
            <hr className="bg-slate-200 w-full h-px" />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                errors={errors}
                register={register}
                required

            />
            <Input
                id="password"
                label="Mật Khẩu"
                type="password"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
            <div className=" flex flex-col w-full justify-center items-center gap-2">
                <Button
                    label={isLoading ? "Loading..." : "Đăng Nhập"}
                    onClick={handleSubmit(onSubmit)}


                />

                <Link href="/auth/forgot-password" className="text-md text-gray-500 hover:underline">
                    Quên mật khẩu?
                </Link>
            </div>



            <div className=" flex items-center w-full h-2">
                <hr className="flex-grow h-px" />
                <span className="mx-4 text-gray-500">Hoặc</span>
                <hr className="flex-grow h-px" />
            </div>

            <div className="flex w-full h-9 gap-2">
                <Button
                    label="Google"
                    imageIcon={{ src: GoogleIcon, alt: "Google Icon" }}
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    small
                    outline
                />
                <Button
                    label="Facebook"
                    icon={FaFacebook}
                    onClick={() => signIn('facebook', { callbackUrl: '/' })}
                    small
                    outline
                    styleIcon="text-blue-600"

                />

            </div>
            <p className="text-sm">
                Bạn vẫn chưa có tài khoản <Link className="underline" href="/auth/register">Đăng Ký</Link>
            </p>



        </>
    )
}

export default LoginForm
