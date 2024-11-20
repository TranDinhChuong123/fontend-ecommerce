// import { formatPrice } from "@/utils/util";

// const PaymentDetail = ({
//   payment,
//   totalPrice,
//   feeShip,
// }: {
//   payment: any;
//   totalPrice: number;
//   feeShip: number;
// }) => (
//   <div className="bg-white rounded-xl px-8 py-2 pb-8 shadow-md text-gray-700 flex flex-col items-end w-full">
//     <div className="flex flex-col gap-1 my-5 border w-full">
//       <div className="flex flex-row justify-between w-full h-10 items-center border px-4">
//         <p className="text-gray-500">Phương thức thanh toán</p>
//         <p className="text-bold">{payment?.paymentMethod}</p>
//       </div>
//       <div className="flex flex-row justify-between w-full h-10 items-center border px-4">
//         <p className="text-gray-500">Tổng tiền hàng</p>
//         <p className="text-bold">{formatPrice(totalPrice - feeShip)}</p>
//       </div>
//       <div className="flex flex-row justify-between w-full h-10 items-center border px-4">
//         <p className="text-gray-500">Phí Vận Chuyển</p>
//         <p className="text-bold">{formatPrice(feeShip)}</p>
//       </div>
//       <div className="flex flex-row justify-between w-full h-10 items-center border px-4">
//         <p className="text-gray-500">Tổng thanh toán</p>
//         <p className="text-bold text-red-600">{formatPrice(totalPrice)}</p>
//       </div>
//     </div>
//   </div>
// );

// export default PaymentDetail;

import { formatPrice } from "@/utils/util";

const PaymentDetail = ({
  payment,
  totalPrice,
  feeShip,
}: {
  payment: any;
  totalPrice: number;
  feeShip: number;
}) => (
  <div className="bg-white rounded-xl px-6 py-6 shadow-lg text-gray-700 flex flex-col items-end w-full">
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between w-full h-12 items-center border-b px-4">
        <p className="text-sm text-gray-600">Phương thức thanh toán</p>
        <p className="text-lg font-semibold">{payment?.paymentMethod}</p>
      </div>
      <div className="flex flex-row justify-between w-full h-12 items-center border-b px-4">
        <p className="text-sm text-gray-600">Tổng tiền hàng</p>
        <p className="text-lg font-semibold">{formatPrice(totalPrice - feeShip)}</p>
      </div>
      <div className="flex flex-row justify-between w-full h-12 items-center border-b px-4">
        <p className="text-sm text-gray-600">Phí Vận Chuyển</p>
        <p className="text-lg font-semibold">{formatPrice(feeShip)}</p>
      </div>
      <div className="flex flex-row justify-between w-full h-12 items-center px-4">
        <p className="text-sm text-gray-600">Tổng thanh toán</p>
        <p className="text-lg font-semibold text-red-600">{formatPrice(totalPrice)}</p>
      </div>
    </div>
  </div>
);

export default PaymentDetail;
