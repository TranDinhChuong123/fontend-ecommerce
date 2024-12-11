
import { DynamicProductType, ImageType, ProductVariationType } from "@/types/ProductTypes";
import Button from "../common/Button";

interface SetColorProps {
    product: any;
    selectedProduct: DynamicProductType,
    handleColorProduct: (
        color: string,
        urlImage: string,
        productVariations: ProductVariationType[]
    ) => void

}


const SetColorProduct: React.FC<SetColorProps> = ({
    selectedProduct,
    product,
    handleColorProduct
}) => {
    return (
        <div>
            <div className="flex gap-1  flex-row w-auto h-auto">

                <span className="font-semibold mr-2">Màu:</span>
                <div className="grid grid-cols-2 grid-rows-2 w-auto h-auto">

                    {product.images.map((image: ImageType) => {
                        const productVariations = product.productVariations.filter((variation: ProductVariationType) => variation.color === image.color);

                        return <Button
                            key={image.color}
                            label={image.color}
                            imageIcon={{ src: image.urlImage, alt: image.color }}
                            outline
                            custom={`${image.urlImage === selectedProduct.urlImage && image.color === selectedProduct.color ? "border-[2px] border-teal-400" : "border-[2px] border-[2px] border-white"}`}
                            styleIcon="w-10 h-10"
                            small
                            onClick={() => handleColorProduct(image.color, image.urlImage, productVariations)}
                        />

                    })}
                </div>
            </div>

        </div>
    )
}

export default SetColorProduct
