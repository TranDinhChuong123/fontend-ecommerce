


'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import handleApiCall from "@/services/handleApiCall";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { showToastError, showToastSuccess, truncateText } from "@/utils/util";
import AddressForm from "../cart/AddressForm";
import { AddressType } from "@/types/ProductTypes";
import { useSession } from "next-auth/react";
import RenderIf from "@/utils/RenderIf";



const UserAddressClient: React.FC = () => {

    const { data: session } = useSession();
    const email = session?.user.email;
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
            setListAddress(resData?.data || []);
            const defaultAddress = resData?.data.find((addr: AddressType) => addr.state);
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
            setDefaultAddressId(selectedAddress.id);

        }
        if (selectedAddress && selectedAddress.id == defaultAddressId) {
        }
    };


    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setZIndex(0);
        }
    };

    if (isShowForm) {
        return (
            <AddressForm
                setIsFormSuccess={setIsFormSuccess}
                onClose={() => setIsShowForm(false)}
                email={email || ''}
                address={selectedAddress}
            />
        );
    }

    return (

        <div className=" flex flex-col items-center gap-4 bg-white p-8  w-full h-screen">
            <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-xl">Địa chỉ của tôi</h1>
                <button className="border px-4 py-2" onClick={() => toggleForm()}>
                    Thêm địa chỉ mới
                </button>
            </div>

            <hr className="w-full" />
            <div className="flex flex-col gap-4 w-full h-[70%] overflow-y-auto">
                {ListAddress.length > 0 && ListAddress.map((address: AddressType) => (
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
                <RenderIf isTrue={ListAddress.length === 0}>
                    <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl text-slate-700">
                        <p className="font-semibold">Bạn cần thêm địa chỉ</p>
                    </div>
                </RenderIf>
            </div>
        </div>
    );
};

export default UserAddressClient;

