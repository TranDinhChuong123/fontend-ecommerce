
'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import handleApiCall from "@/services/handleApiCall";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { showToastError, showToastSuccess, truncateText } from "@/utils/util";
import AddressForm from "../cart/AddressForm";
import { AddressType } from "@/types/ProductTypes";

interface AuthFormProps {
    onClose: () => void;
    email: string;
    updateDefaultAddress: (success: boolean) => void;
}

const ListAddress: React.FC<AuthFormProps> = ({ onClose, email, updateDefaultAddress }) => {
    const router = useRouter();
    const [zIndex, setZIndex] = useState(50);
    const [ListAddress, setListAddress] = useState([]);
    const axios = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isShowForm, setIsShowForm] = useState(false);
    const [isFormSuccess, setIsFormSuccess] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
    const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null); //
    const toggleForm = (address?: any) => {
        setSelectedAddress(address);
        setIsShowForm(prev => !prev);
    };

    useEffect(() => {
        const getListAddress = async () => {
            const resData = await handleApiCall(axios.get(`/user/${email}/addresses`));
            if (!resData) showToastError("List address empty");
            setListAddress(resData.data || []);
            const defaultAddress = resData.data.find((addr: AddressType) => addr.state);
            console.log("defaultAddress", defaultAddress);

            if (defaultAddress) {
                setDefaultAddressId(defaultAddress.id);
            }
        };
        getListAddress();
    }, [axios, email]);

    useEffect(() => {
        if (isFormSuccess) {
            setIsShowForm(false);
            const updateListAddress = async () => {
                const resData = await handleApiCall(axios.get(`/user/${email}/addresses`));
                if (!resData) showToastError("List address empty");
                setListAddress(resData.data || []);
                setIsFormSuccess(false);
                updateDefaultAddress(true)
            };
            updateListAddress();
        }
    }, [isFormSuccess, email, axios]);

    const handleConfirm = async () => {
        if (selectedAddress && selectedAddress.id !== defaultAddressId) {
            const resData = await handleApiCall(axios.get(`/user/${email}/addresses/${selectedAddress.id}/set-default`));
            console.log("resData", resData);
            if (!resData) showToastError("Set default address failed");
            showToastSuccess("Đặt địa chỉ mặc định thành công");
            updateDefaultAddress(true);
            setDefaultAddressId(selectedAddress.id);
            onClose();

        }
        if (selectedAddress && selectedAddress.id == defaultAddressId) {
            onClose();
        }
    };


    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setZIndex(0);
            onClose();
        }
    };

    if (isShowForm) {
        return (
            <AddressForm
                setIsFormSuccess={setIsFormSuccess}
                onClose={() => setIsShowForm(false)}
                email={email}
                address={selectedAddress}
            />
        );
    }

    return (
        <div className={`fixed top-[5%] z-${zIndex} flex justify-center left-0 right-0 h-[90%]`} onClick={handleBackdropClick}>
            <div className="border relative flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-lg w-[650px]">
                <h1 className="text-xl">Địa chỉ của tôi</h1>
                <hr className="w-full" />
                <div className="flex flex-col gap-4 w-full h-[70%] overflow-y-auto">
                    {ListAddress.map((address: AddressType) => (
                        <div key={address.id} className="flex flex-row gap-2 items-center">
                            <input
                                id={address.id}
                                type="radio"
                                checked={address.id === (selectedAddress ? selectedAddress.id : defaultAddressId)}
                                className="w-4 h-4" name="address"
                                onChange={() => setSelectedAddress(address)}
                            />
                            <div className="w-5/6 h-auto">
                                <p>{address.name}</p>
                                <p>{address.phoneNumber}</p>
                                <p>{truncateText(address.street, 60)}</p>
                            </div>
                            <button className="text-blue-600 w-1/6" onClick={() => toggleForm(address)}>
                                Cập nhật
                            </button>
                        </div>
                    ))}
                </div>
                <div className="absolute rounded-b-md bottom-0 flex flex-row gap-2 items-center justify-between w-full bg-white h-[60px] border p-8">
                    <button className="border px-4 py-2" onClick={() => toggleForm()}>
                        Thêm địa chỉ mới
                    </button>
                    <div className="flex flex-row gap-2">
                        <button className="border px-4 py-2 rounded-md" onClick={onClose}>
                            Hủy
                        </button>
                        <button className="border px-4 py-2 rounded-md" onClick={handleConfirm}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListAddress;

