'use client'

import Input from "@/app/components/inputs/Input"
import { useState } from "react"
import axios from "@/services/axios/publicAxios"
import handleApiCall from "@/services/handleApiCall"
import RenderIf from "@/utils/RenderIf"
import OtpFormRegiter from "@/app/components/auth/register/OtpFormRegister"
import OtpFormFGPassword from "@/app/components/auth/forgot-password/OtpFormFGPassword"
import { showToastError } from "@/utils/util"
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isOTPVerifi, setOTPVerifi] = useState(false)
    const [isForm, setIsForm] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSendOTP = async () => {
        setEmail(email)
        setIsLoading(true)
        try {
            const response = await axios.post('/auth/forgot-password', { email })
            if (response) {
                console.log("response", response);
                setIsForm(true)
            }
            setIsLoading(false)

        } catch (error) {
            console.error('Error sending OTP:', error);
            setIsLoading(false)
        }
    }
    const handleSubmit = async () => {
        if (password!== confirmPassword) {
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
            
                setIsLoading(false)
            }
            setIsLoading(false)
        } catch (error: any) {
            console.error('Error sending PassWord:', error?.message);
            setIsLoading(false)
        }
    }
    console.log("email: " + email);


    return (
        <div className="flex flex-col items-center justify-center gap-2 p-10 bg-register-svg bg-cover bg-center w-screen h-screen">
            <RenderIf isTrue={!isForm && !isOTPVerifi}>
                <p className="font-bold">Nhập email để đặt lại mật khẩu</p>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    className="border-[1.5px] px-4 py-2 w-[350px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <button
                    className="border bg-blue-700 px-4 py-2 text-white"
                    onClick={() => handleSendOTP()}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Gữi mã OTP"}
                </button>
            </RenderIf>

            <RenderIf isTrue={isForm && !isOTPVerifi}>
                <OtpFormFGPassword email={email} setSuccess={setOTPVerifi} />
            </RenderIf>
            <RenderIf isTrue={isOTPVerifi}>
                <p>Nhập mật khẩu mới</p>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="border-[1.5px] px-4 py-2 w-[350px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter your cofirm password"
                    className="border-[1.5px] px-4 py-2 w-[350px]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}

                />
                <button className="border bg-blue-700 px-4 py-2 text-white"
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
