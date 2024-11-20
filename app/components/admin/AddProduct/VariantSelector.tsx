import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../inputs/Input";


interface VariantSelectorProps {
    onSubmit: (data: DataVariant) => void;
}

export interface DataVariant {
    capacity?: string;
    color?: string;
    size?: string;
    discount?: string;
}
const VariantSelector: React.FC<VariantSelectorProps> = ({ onSubmit }) => {
    const { register, watch, formState: { errors }, handleSubmit } = useForm();

    // Sử dụng watch để theo dõi trạng thái của các checkbox
    const isCapacityChecked = watch("capacity");
    const isColorChecked = watch("color");
    const isSizeChecked = watch("size");
    // const isDiscountChecked = watch("discount");

    const onVariantChange = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <div className="px-5 flex flex-col gap-3">

            <h1 className="font-semibold">Thêm thuộc tính</h1>

            <div className="flex flex-col gap-2">
                <div className="flex items-center ">
                    <input
                        type="checkbox"
                        id="color"
                        {...register("color")}
                 

                    />
                    <label htmlFor="color" className="ml-2">Màu sắc</label>
                </div>

                {isColorChecked && (
                    <Input
                        id="colorValue"
                        label="Nhập màu sắc"
                        register={register}
                        errors={errors}
                        onChange={onVariantChange}
                    />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center">
                    <input
                        type="checkbox"
                        id="capacity"
                        {...register("capacity")}
                    />
                    <label htmlFor="capacity" className="ml-2">Dung lượng</label>
                </div>
                {isCapacityChecked && (
                    <Input
                        id="capacityValue"
                        label="Nhập dung lượng"
                        register={register}
                        errors={errors}
                        onChange={onVariantChange}
                    />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center ">
                    <input
                        type="checkbox"
                        id="size"
                        {...register("size")}
                    />
                    <label htmlFor="size" className="ml-2">Kích thước</label>
                </div>


                {isSizeChecked && (
                    <Input
                        id="sizeValue"
                        label="Nhập kích thước"
                        register={register}
                        errors={errors}
                        onChange={onVariantChange}
                    />
                )}
            </div>
{/* 
            <div className="flex flex-col gap-2">
                <div className="flex items-center ">
                    <input
                        type="checkbox"
                        id="discount"
                        {...register("discount")}
                    />
                    <label htmlFor="discount" className="ml-2">Giảm giá(%)</label>
                </div>


                {isDiscountChecked && (
                    <Input
                        id="discountValue"
                        label="Nhập Giảm giá(%)"
                        register={register}
                        errors={errors}
                    />
                )}
            </div> */}




        </div>
    );
};

export default VariantSelector;
