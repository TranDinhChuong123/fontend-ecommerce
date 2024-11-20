import { formatPrice } from "@/utils/util";
import { useState } from "react";

interface CartSummaryProps {
    totalAmount: number;
    shippingFee: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, shippingFee }) => {
    const [message, setMessage] = useState<string>("");

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg px-6 py-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-gray-700">Chi tiết Đơn hàng</p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500">Tổng tiền hàng:</p>
                    <p className="text-right text-gray-700">{formatPrice(totalAmount)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500">Phí Vận Chuyển:</p>
                    <p className="text-right text-gray-700">{formatPrice(shippingFee)}</p>
                </div>
                <div className="flex justify-between items-center font-semibold">
                    <p className="text-gray-800">Tổng thanh toán:</p>
                    <p className="text-xl text-red-600">{formatPrice(totalAmount + shippingFee)}</p>
                </div>
            </div>

            {/* Input for user message */}
            <div className="mt-6">
                <label htmlFor="orderMessage" className="block text-gray-700 font-semibold mb-2">
                    Lời nhắn cho đơn hàng:
                </label>
                <input
                    id="orderMessage"
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập lời nhắn của bạn"
                />
            </div>
        </div>
    );
};

export default CartSummary;


// import { formatPrice } from "@/utils/util";

// interface CartSummaryProps {
//     totalAmount: number;
//     shippingFee: number;
// }

// const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, shippingFee }) => (
//     <div className="flex flex-col bg-white shadow-lg rounded-lg px-6 py-4 border border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//             <p className="text-lg font-semibold text-gray-700">Chi tiết Đơn hàng</p>
//         </div>
//         <div className="flex flex-col gap-4">
//             <div className="flex justify-between items-center">
//                 <p className="text-gray-500">Tổng tiền hàng:</p>
//                 <p className="text-right text-gray-700">{formatPrice(totalAmount)}</p>
//             </div>
//             <div className="flex justify-between items-center">
//                 <p className="text-gray-500">Phí Vận Chuyển:</p>
//                 <p className="text-right text-gray-700">{formatPrice(shippingFee)}</p>
//             </div>
//             <div className="flex justify-between items-center font-semibold">
//                 <p className="text-gray-800">Tổng thanh toán:</p>
//                 <p className="text-xl text-red-600">{formatPrice(totalAmount + shippingFee)}</p>
//             </div>
//         </div>
//     </div>
// );

// export default CartSummary;


// import { formatPrice } from "@/utils/util";

// interface CartSummaryProps {
//     totalAmount: number;
//     shippingFee: number;
// }

// const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, shippingFee }) => (
//     <div className="bottom-0 flex text-sm border-slate-200 justify-between gap-4 items-center bg-white rounded-md px-8 py-4">
//         <div className="flex flex-row items-center justify-end w-full">
//             <div className="text-bold flex flex-col w-[280px] gap-1 my-10">
//                 <div className="flex flex-row justify-between w-full h-10 items-center">
//                     <p className="text-gray-500">Tổng tiền hàng:</p>
//                     <p className="text-left">{formatPrice(totalAmount)}</p>
//                 </div>
//                 <div className="flex flex-row justify-between w-full h-10 items-center">
//                     <p className="text-gray-500">Phí Vận Chuyển:</p>
//                     <p className="text-left">{formatPrice(shippingFee)}</p>
//                 </div>
//                 <div className="flex flex-row justify-between w-full h-10 items-center">
//                     <p className="font-bold">Tổng thanh toán:</p>
//                     <p className="text-xl text-red-600">{formatPrice(totalAmount + shippingFee)}</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// export default CartSummary;
