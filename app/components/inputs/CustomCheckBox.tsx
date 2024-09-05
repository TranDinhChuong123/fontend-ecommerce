'use client'

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckBoxProps {
    id: string;
    label: string;
    disabled?: boolean;
    register?: UseFormRegister<FieldValues>;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
    id,
    label,
    disabled,
    register
}) => {
    return (
        <div className=" flex flex-row w-full items-center gap-2">
            <input
                id={id}
                type="checkbox"
                disabled={disabled}
                {...(register && register(id))}
                placeholder=" "
                className="cursor-pointer"
            />
            <label
                className="font-medium cursor-pointer"
                htmlFor={id}
            >
                {label}
            </label>

        </div>
    )
}

export default CustomCheckBox

