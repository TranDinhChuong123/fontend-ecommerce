// import React from "react";
// import { useForm } from "react-hook-form";
// import Input from "../../inputs/Input";


// interface VariantSelectorProps {
//     onSubmit: (data: DataVariant) => void;
// }

// export interface DataVariant {
//     capacity?: string;
//     color?: string;
//     size?: string;
//     discount?: string;
// }
// const VariantSelector: React.FC<VariantSelectorProps> = ({ onSubmit }) => {
//     const { register, watch, formState: { errors }, handleSubmit } = useForm();

//     // Sử dụng watch để theo dõi trạng thái của các checkbox
//     const isCapacityChecked = watch("capacity");
//     const isColorChecked = watch("color");
//     const isSizeChecked = watch("size");
//     // const isDiscountChecked = watch("discount");

//     const onVariantChange = () => {
//         handleSubmit(onSubmit)();
//     };

//     return (
//         <div className="px-5 flex flex-col gap-3">

//             <h1 className="font-semibold">Thêm thuộc tính</h1>

//             <div className="flex flex-col gap-2">
//                 <div className="flex items-center ">
//                     <input
//                         type="checkbox"
//                         id="color"
//                         {...register("color")}


//                     />
//                     <label htmlFor="color" className="ml-2">Màu sắc</label>
//                 </div>

//                 {isColorChecked && (
//                     <Input
//                         id="colorValue"
//                         label="Nhập màu sắc"
//                         register={register}
//                         errors={errors}
//                         onChange={onVariantChange}
//                     />
//                 )}
//             </div>

//             <div className="flex flex-col gap-2">
//                 <div className="flex flex-row items-center">
//                     <input
//                         type="checkbox"
//                         id="capacity"
//                         {...register("capacity")}
//                     />
//                     <label htmlFor="capacity" className="ml-2">Dung lượng</label>
//                 </div>
//                 {isCapacityChecked && (
//                     <Input
//                         id="capacityValue"
//                         label="Nhập dung lượng"
//                         register={register}
//                         errors={errors}
//                         onChange={onVariantChange}
//                     />
//                 )}
//             </div>

//             <div className="flex flex-col gap-2">
//                 <div className="flex items-center ">
//                     <input
//                         type="checkbox"
//                         id="size"
//                         {...register("size")}
//                     />
//                     <label htmlFor="size" className="ml-2">Kích thước</label>
//                 </div>


//                 {isSizeChecked && (
//                     <Input
//                         id="sizeValue"
//                         label="Nhập kích thước"
//                         register={register}
//                         errors={errors}
//                         onChange={onVariantChange}
//                     />
//                 )}
//             </div>

//         </div>
//     );
// };

// export default VariantSelector;


import React, { useState } from "react";
import Input from "../../inputs/Input";

interface VariantSelectorProps {
    onSubmit: (data: DataVariant) => void;
}

export interface DataVariant {
    capacity?: string;
    color?: string;
    size?: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ onSubmit }) => {
    // State cho checkbox
    const [isColorChecked, setIsColorChecked] = useState(false);
    const [isCapacityChecked, setIsCapacityChecked] = useState(false);
    const [isSizeChecked, setIsSizeChecked] = useState(false);

    // State cho giá trị input
    const [colorValue, setColorValue] = useState("");
    const [capacityValue, setCapacityValue] = useState("");
    const [sizeValue, setSizeValue] = useState("");

    const handleSubmit = () => {
        
        const data: DataVariant = {
            color: isColorChecked ? colorValue : undefined,
            capacity: isCapacityChecked ? capacityValue : undefined,
            size: isSizeChecked ? sizeValue : undefined,
        };
        onSubmit(data);
    };

    return (
        <div className="px-5 flex flex-col gap-3">
            <h1 className="font-semibold">Thêm thuộc tính</h1>

            {/* Màu sắc */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="color"
                        checked={isColorChecked}
                        onChange={(e) => setIsColorChecked(e.target.checked)}
                    />
                    <label htmlFor="color" className="ml-2">Màu sắc</label>
                </div>
                {isColorChecked && (
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="colorValue"
                        placeholder="Nhập màu sắc"
                        value={colorValue}
                        onChange={(e) => setColorValue(e.target.value)}
                    />
                )}
            </div>

            {/* Dung lượng */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <input

                        type="checkbox"
                        id="capacity"
                        checked={isCapacityChecked}
                        onChange={(e) => setIsCapacityChecked(e.target.checked)}
                    />
                    <label htmlFor="capacity" className="ml-2">Dung lượng</label>
                </div>
                {isCapacityChecked && (
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                        id="capacityValue"
                        placeholder="Nhập dung lượng"
                        value={capacityValue}
                        onChange={(e) => setCapacityValue(e.target.value)}
                    />
                )}
            </div>

            {/* Kích thước */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="size"
                        checked={isSizeChecked}
                        onChange={(e) => setIsSizeChecked(e.target.checked)}
                    />
                    <label htmlFor="size" className="ml-2">Kích thước</label>
                </div>
                {isSizeChecked && (
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                        id="sizeValue"
                        placeholder="Nhập kích thước"
                        value={sizeValue}
                        onChange={(e) => setSizeValue(e.target.value)}
                    />
                )}
            </div>

            <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSubmit}
            >
                Lưu thuộc tính
            </button>
        </div>
    );
};

export default VariantSelector;




