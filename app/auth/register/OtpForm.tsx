'use client';

import { useState, useRef } from 'react';
import { toast } from "react-hot-toast";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth"; // Hàm xác thực mã OTP
import { auth } from "@/firebase/firebaseConfig"; // Config Firebase
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';

interface OtpFormProps {
    verificationId: string;
    onOtpVerified: () => void; // Callback khi OTP được xác thực thành công
}

const OtpForm: React.FC<OtpFormProps> = ({ verificationId, onOtpVerified }) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);

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
        const otpCode = otp.join('');
        if (otpCode.length !== 6 || otp.includes('')) {
            toast.error("Vui lòng nhập mã OTP gồm 6 chữ số.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Gửi mã OTP lên Firebase để xác thực
            const credential = PhoneAuthProvider.credential(verificationId, otpCode);
            await signInWithCredential(auth, credential);
            toast.success("Xác thực thành công!");
            onOtpVerified(); // Gọi callback sau khi xác thực thành công
        } catch (error) {
            console.error("Lỗi khi xác thực mã OTP:", error);
            toast.error("Lỗi khi xác thực mã OTP. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Heading title="Xác Thực OTP" />
            <p className="text-center text-gray-500 mb-4">
                Vui lòng nhập mã OTP gồm 6 chữ số đã gửi tới số điện thoại của bạn.
            </p>

            <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el!)}
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded"
                        disabled={isSubmitting}
                    />
                ))}
            </div>

            <Button
                label={isSubmitting ? "Đang Xác Thực..." : "Xác Thực OTP"}
                onClick={handleSubmit}
                disabled={isSubmitting}
            />
        </div>
    );
};

export default OtpForm;
