'use client'

import Input from "@/app/components/inputs/Input"
import { use, useState } from "react"
import axios from "@/services/axios/publicAxios"
import handleApiCall from "@/services/handleApiCall"
import RenderIf from "@/utils/RenderIf"
import OtpFormRegiter from "@/app/components/auth/register/OtpFormRegister"
import OtpFormFGPassword from "@/app/components/auth/forgot-password/OtpFormFGPassword"
import { showToastError, showToastSuccess } from "@/utils/util"
import { useRouter } from "next/navigation"
import useCurrentUser from "@/actions/useCurrentUser "
import OtpFormResetPassword from "@/app/components/user/reset-password/OtpFormResetPassword"

interface Props {
    searchParams: { step: string }
}

const ResetPasswordPage: React.FC<Props> = ({ searchParams }) => {
    const email = useCurrentUser()
    const [isLoading, setIsLoading] = useState(false)
    const [isOTPVerifi, setOTPVerifi] = useState(false)
    const [isForm, setIsForm] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const handleSendOTP = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('/auth/forgot-password', { email })
            if (response) {
                console.log("response", response);
                router.push('/user/reset-password?step=otp');
                setIsForm(true)
            }
            setIsLoading(false)

        } catch (error) {
            console.error('Error sending OTP:', error);
            setIsLoading(false)
        }
    }
    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            showToastError('Mật khẩu không khớp')
            return
        }
        try {
            setIsLoading(true)
            console.log("email", email);
            console.log("password", password);

            const response = await axios.post(`/auth/reset-password?email=${email}&newPassword=${password}`);
            if (response) {
                console.log("response", response);
                showToastSuccess("Thay đổi mật khẩu thành công")

                router.push('/user/reset-password');

                setIsLoading(false)
                setOTPVerifi(false)
                setIsForm(false)
                setSuccess(true)
            }
            setIsLoading(false)
        } catch (error: any) {
            console.error('Error sending PassWord:', error?.message);
            setIsLoading(false)
        }
    }
    console.log("searchParams", searchParams);



    return (
        <div className="flex flex-col items-center justify-center gap-2 p-10 bg-cover bg-center w-full h-screen">
            <RenderIf isTrue={!isForm && !isOTPVerifi && searchParams.step !== "otp" && searchParams.step != "reset-password"}>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-gray-700 mb-4">Xác minh thông tin tài khoản</h1>
                    <p className="text-gray-500 mb-6">
                        Vui lòng xác minh tài khoản của bạn. Để đổi mật khẩu
                    </p>
                    <button
                        onClick={handleSendOTP}
                        className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition ${isLoading && "cursor-not-allowed opacity-70"}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang gửi..." : "Xác minh bằng OTP"}
                    </button>
                </div>
            </RenderIf>

            <RenderIf isTrue={isForm && !isOTPVerifi || searchParams.step === "otp"}>
                <OtpFormResetPassword email={email} setSuccess={setOTPVerifi} />
            </RenderIf>
            <RenderIf isTrue={isOTPVerifi || searchParams.step === "reset-password"}>
                <h1 className="text-lg font-bold text-gray-700 mb-4">Đặt lại mật khẩu</h1>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-[50%] border border-gray-300 rounded-lg py-2 px-4 mb-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter your cofirm password"
                    className="w-[50%] border border-gray-300 rounded-lg py-2 px-4 mb-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}

                />
                <button className={`w-[50%] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${isLoading && "cursor-not-allowed opacity-70"}`}
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Đặt lại mật khẩu"}
                </button>

            </RenderIf>
            {success && <div className="mb-4 text-green-500"> Đổi mật khẩu thành công!</div>}

        </div>
    )
}

export default ResetPasswordPage
