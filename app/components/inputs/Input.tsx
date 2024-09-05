
// import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
// import { useEffect, useState } from "react";

// interface InputProps {
//     id: string;
//     label: string;
//     type?: string;
//     disabled?: boolean;
//     required?: boolean;
//     register?: UseFormRegister<FieldValues>;
//     errors: FieldErrors;
//     value?: string;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
// }

// const Input: React.FC<InputProps> = ({
//     id,
//     label,
//     type = "text",
//     disabled,
//     required,
//     register,
//     errors,
//     value = "", // Khởi tạo giá trị mặc định cho value
//     onChange, // Sử dụng onChange để cập nhật giá trị
// }) => {
//     const [hasValue, setHasValue] = useState(false);

//     useEffect(() => {
//         // Update the hasValue state based on the current value of the input
//         const input = document.getElementById(id) as HTMLInputElement;
//         if (input) {
//             setHasValue(input.value.length > 0);
//         }
//     }, [id]);

//     return (
//         <div className="w-full relative">
//             <input
//                 id={id}
//                 disabled={disabled}
//                 autoComplete="new-password"
//                 {...(register && register(id, { required }))}
//                 placeholder=" "
//                 type={type}
//                 onChange={(e) => setHasValue(e.target.value.length > 0)}
//                 className={`peer w-full p-2 pt-6 h-10
//                     border-[1.5px] rounded-md transition 
//                     outline-none font-light
//                     disabled:cursor-not-allowed disabled:opacity-70
//                     ${errors[id] ? 'border-rose-500' : 'border-slate-300'}
//                     ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-500'}
//                 `}
//             />
//             <label
//                 className={`absolute top-1 left-2 text-sm cursor-text origin-[0] 
//                     transition-transform duration-150 transform 
//                     peer-focus:-translate-y-[6px]  
//                     peer-focus:scale-75 
//                     ${hasValue ? 'scale-75 -translate-y-[6px]' : 'scale-100 translate-y-2'}
//                      ${errors[id] ? 'text-rose-500' : 'text-slate-500'}
//             `}
//                 htmlFor={id}
//             >
//                 {label}
//             </label>
//         </div>
//     );
// };

// export default Input;

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register?: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    value?: string; // Thêm thuộc tính value
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Thêm onChange để xử lý sự kiện thay đổi
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    register,
    errors,
    value = "", // Khởi tạo giá trị mặc định cho value
    onChange, // Sử dụng onChange để cập nhật giá trị
}) => {
    const [hasValue, setHasValue] = useState(value.length > 0);

    useEffect(() => {
        setHasValue(value.length > 0); // Cập nhật hasValue khi giá trị thay đổi
    }, [value]);

    return (
        <div className="w-full relative">
            <input
                id={id}
                disabled={disabled}
                autoComplete="new-password"
                {...(register && register(id, { required }))}
                placeholder=" "
                type={type}
                {...(value && { value })}
                // value={value} // Gán giá trị value từ props
                onChange={(e) => {
                    setHasValue(e.target.value.length > 0);
                    if (onChange) onChange(e); // Gọi hàm onChange nếu được truyền vào
                }}
                className={`peer w-full p-2 pt-6 h-10
                    border-[1.5px] rounded-md transition 
                    outline-none font-light
                    disabled:cursor-not-allowed disabled:opacity-70
                    ${errors[id] ? 'border-rose-500' : 'border-slate-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-500'}
                `}
            />
            <label
                className={`absolute top-1 left-2 text-sm cursor-text origin-[0] 
                    transition-transform duration-150 transform 
                    peer-focus:-translate-y-[6px]  
                    peer-focus:scale-75 
                    ${hasValue ? 'scale-75 -translate-y-[6px]' : 'scale-100 translate-y-2'}
                     ${errors[id] ? 'text-rose-500' : 'text-slate-500'}
            `}
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;



