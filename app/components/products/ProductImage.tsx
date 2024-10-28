import { DynamicProductType, ImageType, ProductVariationType } from "@/types/ProductTypes";
import RenderIf from "@/utils/RenderIf";
import Image from "next/image";


interface ProductImageProps {
    selectedProduct: DynamicProductType,
    product: any,
    handleColorProduct: (
        color: string,
        urlImage: string,
        productVariations: ProductVariationType[]
    ) => void
}

const ProductImage: React.FC<ProductImageProps> = ({ selectedProduct, product, handleColorProduct }) => {

    return (
        <div className="grid grid-cols-6 gap-2 h-full
            min-h-[100px] 
            max-h-[420px]
            sm:min-h-[200px]
        ">
            <div className=" flex flex-col w-full items-center 
             justify-center gap-4 cursor-pointer border h-full 
                min-h-[100px] 
                max-h-[420px]
                sm:min-h-[200px]
            ">

                {product.images.map((image: ImageType, index: number) => {
                    const productVariations = product.productVariations.filter((variation: ProductVariationType) => variation.color === image.color);
                    return <div
                        className={`relative w-[80%] aspect-square rounded border-teal-300 
                            ${selectedProduct?.urlImage === image.urlImage
                                && image.color === selectedProduct.color
                                ? 'border-[1.5px]' : ''
                            }`}
                        key={index}
                        onClick={() => handleColorProduct(image.color, image.urlImage, productVariations)}
                    >
                        <Image
                            fill
                            src={image.urlImage}
                            alt={`Image ${index}`}
                            className="object-contain"
                        />
                    </div>
                }


                )}

            </div>

            <div className="col-span-5 relative aspect-square">


                <Image
                    fill
                    src={selectedProduct?.urlImage || ''}
                    alt={selectedProduct.selectedVariation.id}
                    className="w-full h-full object-contain 
                    min-h-[100px]
                    max-h-[300px] 
                    sm:min-h-[200px] 
                    "
                />


            </div>
        </div>
    )
}

export default ProductImage
