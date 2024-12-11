// import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
// import { useEffect, useState } from "react";

// interface InputProps {
//     id: string;
//     label: string;
//     type?: string;
//     disabled?: boolean;
//     required?: boolean;
//     register?: UseFormRegister<FieldValues>;
//     errors?: FieldErrors;
//     value?: string;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     isDefaultValue?: boolean;
//     height?: string;
//     isCurrency?: boolean
// }

// const Input: React.FC<InputProps> = ({
//     id,
//     label,
//     type = "text",
//     disabled,
//     required,
//     register,
//     errors,
//     value = "",
//     onChange,
//     isDefaultValue = true,
//     height,
//     isCurrency = false
// }) => {
//     const [hasValue, setHasValue] = useState(value!.length > 0);

//     useEffect(() => {
//         setHasValue(value!.length > 0 || isDefaultValue);
//     }, [value]);


//     return (
//         <div className="w-full relative">
//             <input
//                 id={id}
//                 disabled={disabled}
//                 autoComplete="on"
//                 placeholder=" "
//                 defaultValue={value}
//                 type={type}

//                 {...(register && register(id, { required }))}
//                 {...(value && { value })}

//                 onChange={(e) => {
//                     setHasValue(e.target.value.length > 0);
//                     if (onChange) onChange(e);
//                 }}
//                 className={`peer w-full p-2 pt-3
//                     border rounded-md transition 
//                     outline-none font-light
//                     disabled:cursor-not-allowed disabled:opacity-70
//                     ${height ? height : 'h-10'}
//                     ${errors[id] ? 'border-rose-500' : 'border-slate-500'}
//                     ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-500'}
//                 `}
//             />
//             <label
//                 className={`absolute top-[2px] left-2 text-md font-light cursor-text origin-[0] bg-white px-1 rounded-lg
//                     transition-transform duration-150 transform 
//                     peer-focus:-translate-y-[11px]
//                     peer-focus:scale-75
//                     ${hasValue ? 'scale-75 -translate-y-[11px] ' : 'scale-75 -translate-y-[11px]'}
//                     ${errors[id] ? 'text-rose-500' : 'text-slate-800'}
//             `}
//                 htmlFor={id}
//             >
//                 {label}
//             </label>
//         </div>
//     );
// };

// export default Input;


import { FieldErrors, FieldValues, UseFormRegister, FieldError } from "react-hook-form";
import { useEffect, useState } from "react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register?: UseFormRegister<FieldValues>;
    errors?: FieldErrors;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDefaultValue?: boolean;
    height?: string;
    isCurrency?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    register,
    errors,
    value = "",
    onChange,
    isDefaultValue = true,
    height,
    isCurrency = false
}) => {
    const [hasValue, setHasValue] = useState(value ? value.length > 0 : false);

    useEffect(() => {
        setHasValue(value ? value.length > 0 : isDefaultValue);
    }, [value]);

    // Check if errors exist for the given id before accessing it
    const errorMessage = errors?.[id] as FieldError | undefined;

    return (
        <div className="w-full relative">
            <input
                id={id}
                disabled={disabled}
                autoComplete="on"
                placeholder={label}
                defaultValue={value}
                type={type}
                {...(register && register(id, { required }))}
                {...(value && { value })}
                onChange={(e) => {
                    setHasValue(e.target.value.length > 0);
                    if (onChange) onChange(e);
                }}


                className={` w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                    disabled:cursor-not-allowed disabled:opacity-70
                    ${height ? height : 'h-10'}
                    ${errorMessage ? 'border-rose-500' : ''}
                    ${errorMessage ? 'focus:border-rose-500' : ''}
                `}
            />
            {/* Optionally render an error message if there's an error */}
            {errorMessage && errorMessage.message && (
                <span className="text-rose-500 text-xs">{errorMessage.message}</span>
            )}
        </div>
    );
};

export default Input;






















