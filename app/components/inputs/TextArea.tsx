'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface TextAreaProps {
    id: string
    label: string
    disabled?: boolean
    required?: boolean
    register?: UseFormRegister<FieldValues>
    errors: FieldErrors,
    placeholder?: string
}

const TextArea: React.FC<TextAreaProps> = ({
    id,
    label,
    disabled,
    required,
    register,
    errors,
    placeholder=" "
}) => {
    return (
        <div className="w-full relative">
            <textarea
                autoComplete="off"
                id={id}
                disabled={disabled}
                {...(register && register(id, { required }))}
                placeholder={placeholder}
                className={`peer w-full p-2 pt-2
                    focus:outline-none
                    border rounded-md transition 
                    outline-none font-light max-h-[100px] min-h-[100px]
                    disabled:cursor-not-allowed disabled:opacity-70
                    ${errors[id] ? 'border-rose-500' : 'border-slate-500'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-500'}
                `}

            />

        </div>
    )
}

export default TextArea


