'use client'

import Input from "@/app/components/inputs/Input"
import { useEffect, useState } from "react"
import axios from "@/services/axios/publicAxios"
import handleApiCall from "@/services/handleApiCall"
import RenderIf from "@/utils/RenderIf"
import OtpFormRegiter from "@/app/components/auth/register/OtpFormRegister"
import OtpFormFGPassword from "@/app/components/auth/forgot-password/OtpFormFGPassword"
import { showToastError, showToastSuccess } from "@/utils/util"
import { useRouter } from "next/navigation"

interface Props {
    searchParams: { step: string }
}

const ForgotPasswordPage: React.FC<Props> = ({ searchParams }) => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isOTPVerifi, setOTPVerifi] = useState(false)
    const [isForm, setIsForm] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const handleSendOTP = async () => {
        if (!email) {
            showToastError("Vui lòng nhập email");
            return;
        }
        setIsLoading(true);
        try {
            const checkResponse = await axios.post('/auth/validate-email', { email });
            if (checkResponse?.data) {
                const response = await axios.post('/auth/forgot-password', { email });
                if (response) {
                    localStorage.setItem('email', email);
                    router.push('/auth/forgot-password?step=otp');
                    setIsForm(true);
                    setIsLoading(false);
                }
            } else {
                showToastError("Email không hợp lệ hoặc không tồn tại");
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            showToastError('Mật khẩu không khớp')
            return
        }
        try {
            setIsLoading(true)
            const response = await axios.post(`/auth/reset-password?email=${email}&newPassword=${password}`);
            if (response) {
                console.log("response", response);
                showToastSuccess("Thay đổi mật khẩu thành công")
                router.push('/auth/login');
                setIsLoading(false)
            }
            setIsLoading(false)
        } catch (error: any) {
            console.error('Error sending PassWord:', error?.message);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        // <div className="flex flex-col items-center justify-center gap-2 p-10 bg-register-svg bg-cover bg-center w-screen h-screen">
        // <RenderIf isTrue={!isForm && !isOTPVerifi && searchParams.step !== "otp" && searchParams.step != "reset-password"}>
        //         <p className="font-bold">Nhập email để đặt lại mật khẩu</p>
        //         <input
        //             id="email"
        //             type="text"
        //             name="email"
        //             placeholder="Enter your email address"
        //             className="border-[1.5px] px-4 py-2 w-[350px]"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}

        //         />
        //         <button
        //             className="border bg-blue-700 px-4 py-2 text-white"
        //             onClick={() => handleSendOTP()}
        //             disabled={isLoading}
        //         >
        //             {isLoading ? "Loading..." : "Gữi mã OTP"}
        //         </button>
        //     </RenderIf>

        //     <RenderIf isTrue={ isForm && !isOTPVerifi || searchParams.step === "otp" }>
        //         <OtpFormFGPassword email={email} setSuccess={setOTPVerifi} />
        //     </RenderIf>
        //     <RenderIf isTrue={isOTPVerifi || searchParams.step === "reset-password"}>
        //         <p>Nhập mật khẩu mới</p>
        //         <input
        //             id="password"
        //             type="password"
        //             name="password"
        //             placeholder="Enter your password"
        //             className="border-[1.5px] px-4 py-2 w-[350px]"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}

        //         />
        //         <input
        //             id="confirmPassword"
        //             type="password"
        //             name="confirmPassword"
        //             placeholder="Enter your cofirm password"
        //             className="border-[1.5px] px-4 py-2 w-[350px]"
        //             value={confirmPassword}
        //             onChange={(e) => setConfirmPassword(e.target.value)}

        //         />
        //         <button className="border bg-blue-700 px-4 py-2 text-white"
        //             onClick={() => handleSubmit()}
        //             disabled={isLoading}
        //         >
        //             {isLoading ? "Loading..." : "Đặt lại mật khẩu"}
        //         </button>
        //     </RenderIf>
        // </div>
        <div className="flex flex-col items-center justify-center gap-6 p-8 bg-register-svg bg-cover bg-center w-screen h-screen text-gray-800">
            {/* Form nhập email */}
            <RenderIf isTrue={!isForm && !isOTPVerifi && searchParams.step !== "otp" && searchParams.step !== "reset-password"}>
                <p className="font-semibold text-lg text-center">Nhập email để đặt lại mật khẩu</p>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Nhập email của bạn"
                    className="border-2 border-gray-300 rounded-md px-4 py-3 w-[350px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md w-[350px] transition duration-200"
                    onClick={() => handleSendOTP()}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Gửi mã OTP"}
                </button>
            </RenderIf>

            {/* Form nhập OTP */}
            <RenderIf isTrue={isForm && !isOTPVerifi || searchParams.step === "otp"}>
                <OtpFormFGPassword email={email} setSuccess={setOTPVerifi} />
            </RenderIf>

            {/* Form đặt lại mật khẩu */}
            <RenderIf isTrue={isOTPVerifi || searchParams.step === "reset-password"}>
                <p className="font-semibold text-lg text-center">Nhập mật khẩu mới</p>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu mới"
                    className="border-2 border-gray-300 rounded-md px-4 py-3 w-[350px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu mới"
                    className="border-2 border-gray-300 rounded-md px-4 py-3 w-[350px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md w-[350px] transition duration-200"
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Đặt lại mật khẩu"}
                </button>
            </RenderIf>
        </div>

    )
}

export default ForgotPasswordPage
