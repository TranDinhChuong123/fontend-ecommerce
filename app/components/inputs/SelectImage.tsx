'use client'

import { useCallback } from "react"
import { ImageType } from "../admin/AddProductForm"
import { useDropzone } from 'react-dropzone'

interface SelectImageProps {
    item?: ImageType,
    handleFileChange: (value: File) => void
}



const SelectImage: React.FC<SelectImageProps> = ({
    item, handleFileChange
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0]); // Chọn file đầu tiên nếu có nhiều file
        }
    }, [handleFileChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },

    })

    return (
        <div className="border-2 border-x-slate-400 p-2 
            border-dashed cursor-pointer text-sm font-normal
            text-slate-400 flex items-center justify-center"
            {...getRootProps()}
        >
            <input type="file" {...getInputProps()} />
            {isDragActive ? (<p>Drop the image here...</p>) : (<p>+ {item?.color}</p>)}

        </div>
    )
}

export default SelectImage
