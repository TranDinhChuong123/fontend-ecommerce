import { DynamicProductType, ProductVariationType } from "@/types/ProductTypes";
import Button from "../Button";

interface SetColorProps {
    productVariations: ProductVariationType[];
    selectedProduct: DynamicProductType,
    handleCapacityProduct: (productVariation: ProductVariationType) => void
}


const SetCapacityProduct: React.FC<SetColorProps> = ({
    selectedProduct,
    productVariations,
    handleCapacityProduct
}) => {
    return (
        <div>
            <div className="flex flex-row gap-1 items-center ">
                <span className="font-semibold mr-2 mb-2">Dung lượng:</span>
                <div className="grid grid-cols-3 gap-2">
                    {productVariations.map((productVariation: ProductVariationType) => {
                        return <Button
                            key={productVariation.capacity}
                            label={productVariation.capacity}
                            outline
                            custom={`${productVariation.capacity === selectedProduct.selectedVariation.capacity ? "border-[2px] border-teal-400" : "border-[2px] border-white"}`}
                            styleIcon="w-10 h-10"
                            
                
                            onClick={() => handleCapacityProduct(productVariation)}
                        />

                    })}
                </div>
            </div>

        </div>
    )
}

export default SetCapacityProduct
