'use client'

import { useState } from "react"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FaFacebook } from 'react-icons/fa'
import GoogleIcon from "@/public/google-icon.png"
import Heading from "../Heading"
import Input from "../inputs/Input"
import Button from "../Button"
import { MdOutlineCancel } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
interface AuthFormProps {
    onClose: () => void
}


// const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
//     const router = useRouter();

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="relative flex flex-col items-center gap-4 bg-white w-[350px] p-6 rounded-lg shadow-lg">
//                 <button
//                     className="absolute top-2 right-2"
//                     onClick={onClose}
//                 >
//                     <MdOutlineCancel className="text-black w-6 h-6" />
//                 </button>

//                 <Heading title="Đăng Nhập EconoMart" />

//                 <Button
//                     label="Google"
//                     imageIcon={{ src: GoogleIcon, alt: "Google Icon" }}
//                     onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}
//                     small
//                     outline
//                 />
//                 <Button
//                     label="Facebook"
//                     icon={FaFacebook}
//                     onClick={() => signIn('facebook', { callbackUrl: 'http://localhost:3000' })}
//                     small
//                     outline
//                     styleIcon="text-blue-600"
//                 />
//             </div>
//         </div>
//     );
// };

// export default AuthForm;



const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
    const router = useRouter();
    const [zIndex, setZIndex] = useState(50); // Trạng thái zIndex

    const handleBackdropClick = (e: React.MouseEvent) => {
        // Kiểm tra xem click có phải là trên backdrop không
        if (e.currentTarget === e.target) {
            setZIndex(0); // Hạ z-index
            onClose(); // Đóng form
        }
    };

    return (
        <div className={`fixed left-0 right-0 z-${zIndex} flex items-center justify-center`} onClick={handleBackdropClick}>
            <div className="relative flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-lg">
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <MdOutlineCancel className="text-blue-600 w-6 h-6" />
                </button>

                {/* <Heading title="Đăng Nhập" /> */}
                <h2 className="text-2xl font-normal text-blue-600">Đăng nhập</h2>

                <Button
                    label="Sign in with Google"
                    icon={FcGoogle}
                    onClick={() => signIn('google')}
                    small
                    outline
                    styleIcon="w-7 h-7"
                    custom="md:w-full lg:w-[350px] h-10 border-blue-600"
                />
                <Button
                    label="Sign in with Facebook"
                    icon={FaFacebook}
                    onClick={() => signIn('facebook')}
                    small
                    styleIcon="text-white"
                    custom="md:w-full lg:w-[350px] h-10 bg-blue-600"
                />
            </div>
        </div>
    );
};

export default AuthForm;
