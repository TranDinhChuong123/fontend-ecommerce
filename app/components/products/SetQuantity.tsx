'use client'

import { DynamicProductType, ProductCart } from "@/types/ProductTypes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// là tùy chọn (?). Điều này có nghĩa là khi sử dụng interface này, 
// bạn có thể có hoặc không có thuộc tính cartCounter.
interface SetQuantityProps {
    cartCounter?: boolean;
    selectedProduct: DynamicProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
    handleQtyChange: (buyQuantity: number) => void;
}

const btnStyles = 'border-[1.2px] border-slate-500 px-2 rounded items-center'

const SetQuantity: React.FC<SetQuantityProps> = ({
    cartCounter,
    selectedProduct,
    handleQtyIncrease,
    handleQtyDecrease,
    handleQtyChange
}) => {

    const [inputValue, setInputValue] = useState<string>(String(selectedProduct.buyQuantity));

    // Hàm xử lý khi người dùng rời khỏi ô input
    const handleBlur = () => {
        let value = Number(inputValue);
        if (isNaN(value) || value < 1) {

            toast.error("Số lượng nhập nhỏ hơn tối thiểu");
            value = 1;
        } else if (value > selectedProduct.selectedVariation.quantity) {

            toast.error("Số lượng nhập lớn hơn tối đa");
            value = selectedProduct.selectedVariation.quantity;
        }
        handleQtyChange(value);
        setInputValue(String(value));
    };

    const handleIncrease = () => {
        handleQtyIncrease();
        setInputValue(String(selectedProduct.buyQuantity + 1));
    };

    // Cập nhật khi ấn nút -
    const handleDecrease = () => {
        handleQtyDecrease();
        setInputValue(String(selectedProduct.buyQuantity - 1));
    };
    return (

        <div className="flex items-center gap-4">
            {cartCounter ? null : <div className="font-semibold justify-center">Số lượng: </div>}
            <div className="flex items-center text-center text-base">
                <button
                    disabled={selectedProduct.buyQuantity === 1}
                    className={
                        selectedProduct.buyQuantity === 1 ? btnStyles + ' opacity-50' : btnStyles
                    }
                    onClick={handleDecrease}>-</button>


                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    value={inputValue}
                    className="w-10 text-center"
                 

                />
                <button
                    disabled={selectedProduct?.buyQuantity === selectedProduct?.selectedVariation?.quantity}
                    className={
                        selectedProduct?.buyQuantity === selectedProduct?.selectedVariation?.quantity ? btnStyles + ' opacity-50' : btnStyles
                    }
                    onClick={handleIncrease}>+</button>
            </div>
        </div >
    )
}

export default SetQuantity
