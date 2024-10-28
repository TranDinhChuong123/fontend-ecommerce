
'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import handleApiCall from "@/services/handleApiCall";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { showToastError, showToastSuccess, truncateText } from "@/utils/util";
import { AddressType } from "@/types/ProductTypes";

interface AuthFormProps {
    onClose: () => void;
}

const VariationForm: React.FC<AuthFormProps> = ({ onClose }) => {

    const [zIndex, setZIndex] = useState(50);


    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setZIndex(0);
            onClose();
        }
    };
    return (
        <div className={`fixed  z-${zIndex} flex justify-center left-0 right-0 h-[100%]`} onClick={handleBackdropClick}>
            <div className="border relative flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-lg w-[650px]">
                <h1 className="text-xl">Cập nhật thuộc tính</h1>
                <hr className="w-full" />

                <div className="absolute rounded-b-md bottom-0 flex flex-row gap-2 items-center justify-between w-full bg-white h-[60px] border p-8">
                    <div className="flex flex-row gap-2">
                        <button className="border px-4 py-2 rounded-md" onClick={onClose}>
                            Hủy
                        </button>
                        <button className="border px-4 py-2 rounded-md" onClick={() => { }}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VariationForm;

