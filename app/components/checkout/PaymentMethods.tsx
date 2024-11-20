// import { IoMdCheckmark } from "react-icons/io";
// import { HiCreditCard } from "react-icons/hi2";
// import { FaHandHoldingUsd } from "react-icons/fa";
// import { showToastError } from "@/utils/util";

// interface PaymentMethodsProps {
//     selectedPaymentMethod: string;
//     onSelectPaymentMethod: (method: string) => void;
//     wallet: number;
//     totalAmount: number;
// }

// const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedPaymentMethod, onSelectPaymentMethod, wallet, totalAmount }) => {
//     const shippingFee = 30000;

//     return (
//         <div className="flex flex-row gap-10 items-center justify-end bg-white px-8 py-4">
//             <p className="font-bold text-xl">Phương thức thanh toán</p>
//             <div className="flex flex-row gap-2">
//                 {/* Wallet Payment */}
//                 <button
//                     className={`relative flex flex-row border rounded-md w-[240px] py-2 items-center justify-evenly 
//                         ${selectedPaymentMethod === "WALLET" ? "border-[2px] border-blue-500" : ""}
//                         ${wallet < totalAmount + shippingFee ? "text-slate-300" : ""}`}
//                     onClick={() => {
//                         if (wallet < totalAmount + shippingFee) {
//                             showToastError("Tài khoản của bạn không đủ");
//                         } else {
//                             onSelectPaymentMethod("WALLET");
//                         }
//                     }}
//                 >
//                     {selectedPaymentMethod === "WALLET" && <IoMdCheckmark size={13} className="absolute top-[-2px] right-[-2px] bg-blue-500 text-white rounded-lg" />}
//                     TK EconoMart ({wallet})
//                 </button>
//                 {/* Credit Card */}
//                 <button
//                     className={`relative flex flex-row border rounded-md w-[220px] py-2 items-center justify-evenly 
//                         ${selectedPaymentMethod === "CREDIT_CARD" ? "border-[2px] border-blue-500" : ""}`}
//                     onClick={() => onSelectPaymentMethod("CREDIT_CARD")}
//                 >
//                     {selectedPaymentMethod === "CREDIT_CARD" && <IoMdCheckmark size={13} className="absolute top-[-2px] right-[-2px] bg-blue-500 text-white rounded-lg" />}
//                     <HiCreditCard />
//                     Thanh toán bằng thẻ
//                 </button>
//                 {/* Cash on Delivery */}
//                 <button
//                     className={`relative flex flex-row border rounded-md w-[240px] py-2 items-center justify-evenly 
//                         ${selectedPaymentMethod === "CASH_ON_DELIVERY" ? "border-[2px] border-blue-500" : ""}`}
//                     onClick={() => onSelectPaymentMethod("CASH_ON_DELIVERY")}
//                 >
//                     {selectedPaymentMethod === "CASH_ON_DELIVERY" && <IoMdCheckmark size={13} className="absolute top-[-2px] right-[-2px] bg-blue-500 text-white rounded-lg" />}
//                     <FaHandHoldingUsd />
//                     Thanh toán khi nhận hàng
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentMethods;

// import { IoMdCheckmark } from "react-icons/io";
// import { HiCreditCard } from "react-icons/hi2";
// import { FaHandHoldingUsd } from "react-icons/fa";
// import { showToastError } from "@/utils/util";

// interface PaymentMethodsProps {
//     selectedPaymentMethod: string;
//     onSelectPaymentMethod: (method: string) => void;
//     wallet: number;
//     totalAmount: number;
// }

// const PaymentMethods: React.FC<PaymentMethodsProps> = ({
//     selectedPaymentMethod,
//     onSelectPaymentMethod,
//     wallet,
//     totalAmount,
// }) => {
//     const shippingFee = 30000;

//     return (
//         <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//                 Phương thức thanh toán
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {/* Wallet Payment */}
//                 <button
//                     className={`relative flex flex-col items-center justify-center border rounded-lg p-4 transition-all duration-300 
//             ${selectedPaymentMethod === "WALLET"
//                             ? "border-blue-500 bg-blue-50 shadow-lg"
//                             : "border-gray-300 hover:shadow-md"
//                         } ${wallet < totalAmount + shippingFee
//                             ? "text-gray-300 cursor-not-allowed"
//                             : "text-gray-700"
//                         }`}
//                     onClick={() => {
//                         if (wallet < totalAmount + shippingFee) {
//                             showToastError("Tài khoản của bạn không đủ");
//                         } else {
//                             onSelectPaymentMethod("WALLET");
//                         }
//                     }}
//                 >
//                     {selectedPaymentMethod === "WALLET" && (
//                         <IoMdCheckmark
//                             size={20}
//                             className="absolute top-2 right-2 bg-blue-500 text-white rounded-full"
//                         />
//                     )}
//                     <div className="text-lg font-semibold">TK EconoMart</div>
//                     <div className="text-sm font-medium">{wallet.toLocaleString()} đ</div>
//                 </button>

//                 {/* Credit Card */}
//                 <button
//                     className={`relative flex flex-col items-center justify-center border rounded-lg p-4 transition-all duration-300 
//             ${selectedPaymentMethod === "CREDIT_CARD"
//                             ? "border-blue-500 bg-blue-50 shadow-lg"
//                             : "border-gray-300 hover:shadow-md"
//                         } text-gray-700`}
//                     onClick={() => onSelectPaymentMethod("CREDIT_CARD")}
//                 >
//                     {selectedPaymentMethod === "CREDIT_CARD" && (
//                         <IoMdCheckmark
//                             size={20}
//                             className="absolute top-2 right-2 bg-blue-500 text-white rounded-full"
//                         />
//                     )}
//                     <HiCreditCard size={24} className="text-blue-500 mb-2" />
//                     <div className="text-lg font-semibold">Thanh toán bằng thẻ</div>
//                 </button>

//                 {/* Cash on Delivery */}
//                 <button
//                     className={`relative flex flex-col items-center justify-center border rounded-lg p-4 transition-all duration-300 
//             ${selectedPaymentMethod === "CASH_ON_DELIVERY"
//                             ? "border-blue-500 bg-blue-50 shadow-lg"
//                             : "border-gray-300 hover:shadow-md"
//                         } text-gray-700`}
//                     onClick={() => onSelectPaymentMethod("CASH_ON_DELIVERY")}
//                 >
//                     {selectedPaymentMethod === "CASH_ON_DELIVERY" && (
//                         <IoMdCheckmark
//                             size={20}
//                             className="absolute top-2 right-2 bg-blue-500 text-white rounded-full"
//                         />
//                     )}
//                     <FaHandHoldingUsd size={24} className="text-green-500 mb-2" />
//                     <div className="text-lg font-semibold">
//                         Thanh toán khi nhận hàng
//                     </div>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentMethods;

import { IoMdCheckmark } from "react-icons/io";
import { HiCreditCard } from "react-icons/hi2";
import { FaHandHoldingUsd } from "react-icons/fa";
import { showToastError } from "@/utils/util";

interface PaymentMethodsProps {
  selectedPaymentMethod: string;
  onSelectPaymentMethod: (method: string) => void;
  wallet: number;
  totalAmount: number;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedPaymentMethod,
  onSelectPaymentMethod,
  wallet,
  totalAmount,
}) => {
  const shippingFee = 30000;

  // Function to handle the payment method click
  const handlePaymentMethodClick = (method: string) => {
    if (method === "WALLET" && wallet < totalAmount + shippingFee) {
      showToastError("Tài khoản của bạn không đủ");
    } else {
      onSelectPaymentMethod(method);
    }
  };

  // Common button styles
  const getButtonClasses = (method: string) => {
    const isSelected = selectedPaymentMethod === method;
    const isDisabled = method === "WALLET" && wallet < totalAmount + shippingFee;
    const baseClasses = "relative flex flex-col items-center justify-center border rounded-lg p-4 transition-all duration-300";
    const selectedClasses = isSelected ? "border-blue-500 bg-blue-50 shadow-lg" : "border-gray-300 hover:shadow-md";
    const disabledClasses = isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-700";
    return `${baseClasses} ${selectedClasses} ${disabledClasses}`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Phương thức thanh toán</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Wallet Payment */}
        <button
          className={getButtonClasses("WALLET")}
          onClick={() => handlePaymentMethodClick("WALLET")}
        >
          {selectedPaymentMethod === "WALLET" && (
            <IoMdCheckmark size={20} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full" />
          )}
          <div className="text-lg font-semibold">TK EconoMart</div>
          <div className="text-sm font-medium">{wallet.toLocaleString()} đ</div>
        </button>

        {/* Credit Card Payment */}
        <button
          className={getButtonClasses("CREDIT_CARD")}
          onClick={() => handlePaymentMethodClick("CREDIT_CARD")}
        >
          {selectedPaymentMethod === "CREDIT_CARD" && (
            <IoMdCheckmark size={20} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full" />
          )}
          <HiCreditCard size={24} className="text-blue-500 mb-2" />
          <div className="text-lg font-semibold">Thanh toán bằng thẻ</div>
        </button>

        {/* Cash on Delivery */}
        <button
          className={getButtonClasses("CASH_ON_DELIVERY")}
          onClick={() => handlePaymentMethodClick("CASH_ON_DELIVERY")}
        >
          {selectedPaymentMethod === "CASH_ON_DELIVERY" && (
            <IoMdCheckmark size={20} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full" />
          )}
          <FaHandHoldingUsd size={24} className="text-green-500 mb-2" />
          <div className="text-lg font-semibold">Thanh toán khi nhận hàng</div>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;

