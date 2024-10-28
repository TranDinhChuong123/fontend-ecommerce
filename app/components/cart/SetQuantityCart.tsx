// 'use client'

// import { ProductCart } from "@/types/ProductTypes";
// import { useState } from "react";
// import toast from "react-hot-toast";


// interface SetQuantityProps {
//     cartCounter?: boolean;
//     productCart: ProductCart;
//     handleQtyIncrease: () => void;
//     handleQtyDecrease: () => void;
//     handleQtyChange: (buyQuantity: number) => void;
// }

// const btnStyles = 'border-[1.2px] border-slate-500 px-2 rounded items-center'

// const SetQuantityCart: React.FC<SetQuantityProps> = ({
//     cartCounter,
//     productCart,
//     handleQtyIncrease,
//     handleQtyDecrease,
//     handleQtyChange
// }) => {

//     const [inputValue, setInputValue] = useState<string>(String(productCart.buyQuantity));

//     // Hàm xử lý khi người dùng rời khỏi ô input
//     const handleBlur = () => {
//         let value = Number(inputValue);
//         if (isNaN(value) || value < 1) {

//             toast.error("Số lượng nhập nhỏ hơn tối thiểu");
//             value = 1;
//         } else if (value > productCart.quantity) {

//             toast.error("Số lượng nhập lớn hơn tối đa");
//             value = productCart.quantity;
//         }
//         handleQtyChange(value);
//         setInputValue(String(value));
//     };

//     const handleIncrease = () => {
//         const value = Number(inputValue);
//         // setInputValue(String(value + 1));
//         handleQtyIncrease();
//     };

//     // Cập nhật khi ấn nút -
//     const handleDecrease = () => {
//         const value = Number(inputValue);
//         // setInputValue(String(value - 1));
//         handleQtyDecrease();
//     };
//     return (

//         <div className="flex items-center gap-4">
//             {cartCounter ? null : <div className="font-semibold justify-center">Số lượng: </div>}
//             <div className="flex items-center text-center text-base">
//                 <button
//                     disabled={Number(inputValue) === 1}
//                     className={
//                         Number(inputValue) === 1 ? btnStyles + ' opacity-50' : btnStyles
//                     }
//                     onClick={handleDecrease}>-</button>


//                 <input
//                     type="text"
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onBlur={handleBlur}
//                     value={inputValue}
//                     className="w-10 text-center"

//                 />
//                 <button
//                     disabled={Number(inputValue) === productCart.quantity}
//                     className={
//                         Number(inputValue) === productCart.quantity ? btnStyles + ' opacity-50' : btnStyles
//                     }
//                     onClick={handleIncrease}>+</button>
//             </div>
//         </div >
//     )
// }

// export default SetQuantityCart


'use client'

import { ProductCart } from "@/types/ProductTypes";
import { useState } from "react";
import toast from "react-hot-toast";

interface SetQuantityProps {
    cartCounter?: boolean;
    productCart: ProductCart;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
    handleQtyChange: (buyQuantity: number) => void;
}

const btnStyles = 'border-[1.2px] border-slate-500 px-2 rounded items-center';

const SetQuantityCart: React.FC<SetQuantityProps> = ({
    cartCounter,
    productCart,
    handleQtyIncrease,
    handleQtyDecrease,
    handleQtyChange
}) => {
    const [inputValue, setInputValue] = useState<string>(String(productCart.buyQuantity));

    // Hàm xử lý khi người dùng rời khỏi ô input
    const handleBlur = () => {
        let value = Number(inputValue);
        if (isNaN(value) || value < 1) {
            toast.error("Số lượng nhập nhỏ hơn tối thiểu");
            value = 1;
        } else if (value > productCart.quantity) {
            toast.error("Số lượng nhập lớn hơn tối đa");
            value = productCart.quantity;
        }
        handleQtyChange(value);
        setInputValue(String(value));
    };

    const handleIncrease = () => {
        const value = Number(inputValue);
        if (value < productCart.quantity) {
            const newValue = value + 1;
            setInputValue(String(newValue));
            handleQtyChange(newValue);
            handleQtyIncrease(); // Gọi hàm tăng số lượng
        }
    };

    const handleDecrease = () => {
        const value = Number(inputValue);
        if (value > 1) {
            const newValue = value - 1;
            setInputValue(String(newValue));
            handleQtyChange(newValue);
            handleQtyDecrease(); // Gọi hàm giảm số lượng
        }
    };

    return (
        <div className="flex items-center gap-4">
            {cartCounter ? null : <div className="font-semibold justify-center">Số lượng: </div>}
            <div className="flex items-center text-center text-base">
                <button
                    disabled={Number(inputValue) === 1}
                    className={Number(inputValue) === 1 ? btnStyles + ' opacity-50' : btnStyles}
                    onClick={handleDecrease}
                >
                    -
                </button>

                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    value={inputValue}
                    className="w-10 text-center"
                />
                <button
                    disabled={Number(inputValue) === productCart.quantity}
                    className={Number(inputValue) === productCart.quantity ? btnStyles + ' opacity-50' : btnStyles}
                    onClick={handleIncrease}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default SetQuantityCart;

