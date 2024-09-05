'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface TextAreaProps {
    id: string
    label: string
    disabled?: boolean
    required?: boolean
    register?: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const TextArea: React.FC<TextAreaProps> = ({
    id,
    label,
    disabled,
    required,
    register,
    errors
}) => {
    return (
        <div className="w-full relative">
            <textarea
                autoComplete="off"
                id={id}
                disabled={disabled}
                {...(register && register(id, { required }))}
                placeholder=" "
                className={`peer w-full p-2 pt-6
                    border-2 rounded-md transition 
                    outline-none font-light max-h-[150px] min-h-[150px]
                    disabled:cursor-not-allowed disabled:opacity-70
                    ${errors[id] ? 'border-rose-500' : 'border-slate-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-500'}
                `}

            />

        </div>
    )
}

export default TextArea


