'use client'

import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import Heading from "../Heading"
import Input from "../inputs/Input"
import TextArea from "../inputs/TextArea"
import CustomCheckBox from "../inputs/CustomCheckBox"
import { categories } from "@/utils/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { colors } from "@/utils/Colors"
import SelectColor from "../inputs/SelectColor"

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            price: '',
            images: [],
            inStock: false,
        },

    })



    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        return setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
    return (
        <>
            <Heading title="Add Product" />

            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="price"
                label="Price"
                disabled={isLoading}
                register={register} errors={errors}
                required
                type="number"
            />

            <Input
                id="brand"
                label="Brand"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <TextArea
                id="description"
                label="Description"
                disabled={isLoading}
                register={register} errors={errors}
                required
            />
            <CustomCheckBox
                id="category"
                label="this product is in stock"
                disabled={isLoading}
                register={register}
            />
            <div className=" w-full font-medium">
                <div className="mb-2 font-semibold">Select a Category</div>
                <div className="grid grid-cols-3 md:gid-cols-2 max-h-[50vh] 
                    overflow-y-auto"
                >
                    {categories.map((item) => {
                        if (item.lable === 'All') {
                            return null
                        }

                        return <div key={item.lable} className="col-span-1 p-1">
                            <CategoryInput
                                icon={item.icon}
                                label={item.lable}
                                selected={category === item.lable}
                                onClick={(category) => setCustomValue('category', category)}
                            />
                        </div>

                    })}
                </div>

            </div>

            <div className="w-full flex flex-col gap-4 flex-wrap">
                <div className="font-bold">Select available product color and upload images</div>
                <div className="text-sm">
                    You most upload an image for each of the color selected
                    otherwise your color selection will be ignored.
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {colors.map((item, index) => {
                        return <SelectColor
                            key={index}
                            item={item}
                            isProductCreated={false}
                            addImageToState={() => { }}
                            removeImageFromState={() => { }}
                        />
                    })}
                </div>
            </div>

        </>
    )
}

export default AddProductForm
