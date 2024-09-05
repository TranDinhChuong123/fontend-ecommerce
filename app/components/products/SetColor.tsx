import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
    images: SelectedImgType[];
    cartProduct: CartProductType,
    handColorSelect: (value: SelectedImgType) => void
}


const SetColor: React.FC<SetColorProps> = ({
    images,
    cartProduct,
    handColorSelect
}) => {
    return (
        <div>
            <div className=" grid flex gap-4 items-center">

                <span className="font-semibold">COLOR:</span>
                <div className="flex gap-1 ">

                    {images.map((image: any) => {
                        return <div key={image.color} className={`h-7 w-7 rounded-full 
                                    border-teal-300 flex items-center justify-center 
                                    ${cartProduct.selectedImg.color === image.color ?
                                "border-[1.5px]" : "border-none"}`}
                            onClick={() => handColorSelect(image)}
                        >
                            <div className=" h-5 w-5 rounded-full border-[1.2px] border-slate-300
                                 cursor-pointer" style={{ background: image.colorCode }}>

                            </div>

                        </div>


                    })}
                </div>
            </div>

        </div>
    )
}

export default SetColor
