
import { DynamicProductType, ProductVariationType } from "@/types/ProductTypes";
import Button from "../common/Button";

interface SetColorProps {
    productVariations: ProductVariationType[];
    selectedProduct: DynamicProductType,
    handleSizeProduct: (productVariation: ProductVariationType) => void
}


const SetSizeProduct: React.FC<SetColorProps> = ({
    selectedProduct,
    productVariations,
    handleSizeProduct
}) => {

    console.log("productVariations123", productVariations);

    return (
        <div>

            <div className="flex gap-1 items-center">
                <span className="font-semibold mr-5">Size:</span>
                <div className="grid grid-cols-8">
                    {productVariations.map((productVariation: ProductVariationType) => {
                        return <Button
                            key={productVariation.size}
                            label={productVariation.size}
                            outline
                            custom={`${productVariation.size === selectedProduct.selectedVariation.size ? "border-[2px] border-teal-400" : "border-[2px] border-[2px] border-white"}`}
                            small
                            onClick={() => handleSizeProduct(productVariation)}
                        />

                    })}
                </div>
            </div>

        </div>
    )
}

export default SetSizeProduct
