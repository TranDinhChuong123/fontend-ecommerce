
import React from 'react';

interface FormWrapProps {
    children: React.ReactNode,
    style?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const FormWrap: React.FC<FormWrapProps> = ({
    children,
    style,
    onClick
}) => {
    return (
        <div onClick={onClick}  className={`relative flex h-full pt-10 
        pb-12 min-h-fit items-center z-5 ${style}`}>
            <div className='flex flex-col w-full max-w-[400px]
             gap-5 items-center shadow-sm shadow-slate-200 rounded-xl 
             p-4 md:p-8 bg-white'>
                {children}
            </div>
        </div>
    );
};

export default FormWrap;

