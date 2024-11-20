import { HiShoppingBag } from "react-icons/hi2";

import Link from "next/link";
import Button from "../Button";

const EmptyCart: React.FC = () => (
    <div className="flex flex-col items-center m-20">
        <HiShoppingBag className="text-teal-600" size={100} />
        <div className="text-2xl m-5">Giỏ hàng của bạn còn trống</div>
        <div>
            <Link href="/">
                <Button label="Mua Sắm" rounded />
            </Link>
        </div>
    </div>
);

export default EmptyCart;
