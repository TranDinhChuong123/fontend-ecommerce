
import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";

const OrderSuccess: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        <AiOutlineCheckCircle className="text-green-500" size={80} />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-800">
            Đặt hàng thành công!
        </h1>
        <p className="mt-4 text-gray-600 text-center max-w-md">
            Cảm ơn bạn đã mua sắm tại EconoMart. Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ thông báo ngay khi đơn hàng được vận chuyển.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-5">
            <div className="flex flex-col md:flex-row items-center gap-4 ">
                <Link href="/">
                    <button className="w-60 px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600">
                        Tiếp tục mua sắm
                    </button>
                </Link>

                <Link href="/user/purchase">
                    <button className="w-60 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600">
                        Xem đơn hàng
                    </button>
                </Link>
            </div>

        </div>
    </div>
);

export default OrderSuccess;

