'use client'

import { useEffect, useState, useTransition } from "react";
import Heading from "../../components/Heading";
import Input from "../../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const RegisterForm = () => {
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [verificationId, setVerificationId] = useState<string | null>(null);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
    const [isPending, startTransition] = useTransition();
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
    });

    useEffect(() => {
        // Khởi tạo RecaptchaVerifier
        const recaptchaVerifier = new RecaptchaVerifier(auth,
            'recaptcha-container',
            {
                size: 'invisible',
                defaultCountry: 'VN'
            }
        );

        setRecaptchaVerifier(recaptchaVerifier);

        return () => {
            recaptchaVerifier.clear();
        };
    }, []);

    const onSignInSubmit = () => {
        console.log(auth, phoneNumber, recaptchaVerifier);
      
        if (recaptchaVerifier) {
            startTransition(() => {
                signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
                    .then((confirmationResult) => {
                        setVerificationId(confirmationResult.verificationId);
                        toast.success('OTP đã được gửi!');
                    })
                    .catch((error) => {
                        console.error("SMS not sent", error);
                        toast.error('Đã xảy ra lỗi khi gửi OTP!');
                    });
            });
        }
    };

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        onSignInSubmit();
    };

    return (
        <>
            <Heading title="Đăng Ký EconoMart" />
            {Object.keys(errors).length > 0 && (
                <p className="text-red-500 text-center mt-2">Vui lòng kiểm tra thông tin</p>
            )}
            <hr className="bg-slate-200 w-full h-px" />

            <Input
                id="phoneNumber"
                label="Số Điện Thoại"
                disabled={isPending}
                errors={errors}
                register={register}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div id="recaptcha-container" />

            <Button
                label={isPending ? "Loading..." : "Tiếp Theo OTP"}
                onClick={handleSubmit(onSubmit)}
                small
                disabled={isPending}
            />
        </>
    );
};

export default RegisterForm;


