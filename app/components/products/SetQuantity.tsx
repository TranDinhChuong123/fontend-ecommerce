'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

// là tùy chọn (?). Điều này có nghĩa là khi sử dụng interface này, 
// bạn có thể có hoặc không có thuộc tính cartCounter.
interface SetQuantityProps {
    cartCounter?: boolean;
    cartProduct: CartProductType
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded items-center'

const SetQuantity: React.FC<SetQuantityProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease,

}) => {
    return (
        <div className="flex items-center gap-8">
            {cartCounter ? null : <div className="font-semibold justify-center">QUANTITY: </div>}
            <div className="flex gap-4 items-center text-center text-base">
                <button
                    disabled={cartProduct.quantity === 1}
                    className={
                        cartProduct.quantity === 1 ? btnStyles + ' opacity-50' : btnStyles
                    }
                    onClick={handleQtyDecrease}>-</button>
                <input type="text" value={cartProduct.quantity} className="w-10 text-center" />
                <button
                    disabled={cartProduct.quantity === 99}
                    className={
                        cartProduct.quantity === 99 ? btnStyles + ' opacity-50' : btnStyles
                    }
                    onClick={handleQtyIncrease}>+</button>
            </div>
        </div>
    )
}

export default SetQuantity
