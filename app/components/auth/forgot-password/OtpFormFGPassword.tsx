'use client';

import { useState, useRef } from 'react';
import { toast } from "react-hot-toast";
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';
import axios from '@/services/axios/publicAxios';
import { showToastSuccess } from '@/utils/util';
import { fetchRegisterUserAPI } from '@/services/authService';
import { useRouter } from 'next/navigation';
interface OtpFormProps {
    email: any;
    setSuccess: (value: boolean) => void;
}

const OtpFormFGPassword: React.FC<OtpFormProps> = ({ email, setSuccess }) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputRefs = useRef<HTMLInputElement[]>([]);
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (/^\d$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '' && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = async () => {
        console.log("otp", otp);
        const result = Number(otp.join(''));

        try {
            setIsSubmitting(true)
            const res = await axios.post(`/auth/verify-code?email=${email}&code=${result}`);
            console.log("res", res);
            if(res){
                showToastSuccess("Xác Thực Thành Công");
                setSuccess(true)
            }
            setIsSubmitting(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Heading title="Xác Thực OTP" />
            <p className="text-center text-gray-500 mb-4">
                Vui lòng nhập mã OTP gồm 6 chữ số đã gửi tới email của bạn.
            </p>

            <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el: any) => (inputRefs.current[index] = el!)}
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded"
                        disabled={isSubmitting}
                    />
                ))}
            </div>

            <Button
                label={isSubmitting ? "Đang Xác Thực..." : "Xác Thực OTP"}
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
            />
        </div>
    );
};

export default OtpFormFGPassword;

