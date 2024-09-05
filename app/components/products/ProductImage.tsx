'use client'

import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails"
import Image from "next/image";

interface ProductImageProps {
    cartProduct: CartProductType,
    product: any,
    handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ cartProduct, product, handleColorSelect }) => {

    return (
        <div className="grid grid-cols-6 gap-2 h-full
            min-h-[300px] 
            max-h-[500px]
            sm:min-h-[400px]
        ">
            <div className=" flex flex-col w-full items-center 
             justify-center gap-4 cursor-pointer border h-full 
            
                min-h-[300px]
                max-h-[500px] 
                sm:min-h-[400px] 
            ">
                {product.images.map((image: SelectedImgType) => (
                    <div className={`relative w-[80%] aspect-square 
                    rounded border-teal-300 ${cartProduct.selectedImg.color === image.color
                            ? 'border-[1.5px]' : ''
                        }`}
                        key={image.color}
                        onClick={() => handleColorSelect(image)}>
                        <Image
                            fill
                            src={image.image}
                            alt={image.color}
                            className="object-contain"
                        />

                    </div>


                ))}
            </div>

            <div className="col-span-5 relative aspect-square">

                {/*  fill Thuộc tính này cho phép hình ảnh chiếm toàn bộ
                không gian của phần tử cha mà không cần xác
                định chiều rộng và chiều cao cụ thể. Khi sử
                dụng fill, bạn nên đảm bảo phần tử cha có
                vị trí relative hoặc absolute để hoạt động chính xác 
                
                
                
                object-contain: Đảm bảo toàn bộ hình ảnh hiển 
                hị trong phần tử chứa mà không bị cắt xén. Tỉ
                lệ khung hình của hình ảnh được duy trì.
                
                alt: Thuộc tính alt của hình ảnh, dùng để mô tả nội dung của hình ảnh.
                 Nếu hình ảnh không tải được, nội dung của thuộc tính alt sẽ hiển thị.
                  Trong trường hợp này, nó được lấy từ thuộc tính name của cartProduct. 

                */}
                <Image
                    fill
                    src={cartProduct.selectedImg.image}
                    alt={cartProduct.name}
                    className="w-full h-full object-contain max-h-[500px] min-h-[300px]
                        sm:min-h-[400px] "

                />

            </div>
        </div>
    )
}

export default ProductImage
