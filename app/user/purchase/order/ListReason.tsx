'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import handleApiCall from "@/services/handleApiCall";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { showToastError, showToastSuccess } from "@/utils/util";


interface AuthFormProps {
    onClose: () => void;
    orderId: string;
}

const ListReason: React.FC<AuthFormProps> = ({ onClose, orderId }) => {
    const router = useRouter();
    const [zIndex, setZIndex] = useState(50);
    const axios = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReason, setSelectedReason] = useState<string>("Tôi không có nhu cầu mua nữa");

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setZIndex(0);
            onClose();
        }
    };

    const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedReason(e.target.value);
    };

    const handleOnSubmit = async () => {
        try {

            setIsLoading(true);
            const res = await handleApiCall(axios.post(`/order/canceled`, {
                orderId,
                cancelReason: selectedReason
            }));
            console.log("res", res);
            if(res && res.data) {
                showToastSuccess("Hủy đơn hàng thành công");
                router.push("/user/purchase?status=canceled");
                onClose();
            }
            
        } catch (error) {
            showToastError("Failed to cancel order");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`fixed top-[15%] z-${zIndex} flex justify-center left-0 right-0`} onClick={handleBackdropClick}>
            <div className="relative flex flex-col items-start gap-4 bg-white p-10 rounded-lg shadow-lg w-[50%]">
                <h1 className="text-xl font-semibold">Lý do hủy</h1>


                <div className="flex flex-row gap-2" onClick={() => setSelectedReason("Tôi không có nhu cầu mua nữa")}>
                    <input
                        type="radio"
                        value="Tôi không có nhu cầu mua nữa"
                        checked={selectedReason === "Tôi không có nhu cầu mua nữa"}
                        onChange={handleReasonChange}
                    />
                    <label>Tôi không có nhu cầu mua nữa</label>
                </div>

                <div className="flex flex-row gap-2 " onClick={() => setSelectedReason("Tôi muốn cập nhập địa chỉ/số điện thoại")}>
                    <input
                        type="radio"
                        value="Tôi muốn cập nhập địa chỉ/số điện thoại"
                        checked={selectedReason === "Tôi muốn cập nhập địa chỉ/số điện thoại"}
                        onChange={handleReasonChange}
                    />
                    <label>Tôi muốn cập nhập địa chỉ/số điện thoại</label>
                </div>

                <div className="flex flex-row gap-2" onClick={()=> setSelectedReason("Tôi muốn thay đổi sản phẩm( kích thước, màu sắc, số lượng...)")}>
                    <input
                        type="radio"
                        value="Tôi muốn thay đổi sản phẩm( kích thước, màu sắc, số lượng...)"
                        checked={selectedReason === "Tôi muốn thay đổi sản phẩm( kích thước, màu sắc, số lượng...)"}
                        onChange={handleReasonChange}
                    />
                    <label>Tôi muốn thay đổi sản phẩm( kích thước, màu sắc, số lượng...)</label>
                </div>

                <div className="flex flex-row gap-2" onClick={() => setSelectedReason("Tôi muốn thay đổi hình thức thanh toán")}>
                    <input
                        type="radio"
                        value="Tôi muốn thay đổi hình thức thanh toán"
                        checked={selectedReason === "Tôi muốn thay đổi hình thức thanh toán"}
                        onChange={handleReasonChange}
                    />
                    <label>Tôi muốn thay đổi hình thức thanh toán</label>
                </div>

                <div className="flex flex-row gap-2" onClick={() => setSelectedReason("Tôi tìm thấy chỗ mua khác tốt hơn(rẻ hơn, uy tín hơn...)")}>
                    <input
                        type="radio"
                        value="Tôi tìm thấy chỗ mua khác tốt hơn(rẻ hơn, uy tín hơn...)"
                        checked={selectedReason === "Tôi tìm thấy chỗ mua khác tốt hơn(rẻ hơn, uy tín hơn...)"}
                        onChange={handleReasonChange}
                    />
                    <label>Tôi tìm thấy chỗ mua khác tốt hơn(rẻ hơn, uy tín hơn...)</label>
                </div>

   

                <div className="flex flex-row gap-2" onClick={() => setSelectedReason("Tôi không tìm thấy lý do phù hợp. Lý do khác")}>
                    <input
                        type="radio"
                        value="Tôi không tìm thấy lý do phù hợp. Lý do khác"
                        checked={selectedReason === "Tôi không tìm thấy lý do phù hợp. Lý do khác"}
                        onChange={handleReasonChange}
                    />
                    <label>Tôi không tìm thấy lý do phù hợp. Lý do khác</label>
                </div>

                <div className="flex flex-row gap-2 items-center justify-end w-full">
                    <button className="px-4 py-2 rounded-md" onClick={onClose}>
                        Hủy
                    </button>
                    <button
                        className="border-slate-400 px-4 py-2 rounded-md border"
                        onClick={handleOnSubmit}
                        disabled={isLoading}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListReason;

