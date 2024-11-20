// 'use client'

// import { formatPrice, truncateText } from "@/utils/util";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface ProductCardProps {
//     product: any;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//     const router = useRouter();
//     const productVariation = product.productVariations[0]; // Lấy phiên bản sản phẩm đầu tiên
//     const priceNew =
//         productVariation?.discountPercent > 0
//             ? productVariation.price -
//             (productVariation.price * productVariation.discountPercent) / 100
//             : productVariation?.price;

//     return (
//         <Link
//             href={`${product?.slug}?spid=${product?.id}`}
//             // onClick={() => router.push(`${product?.slug}?spid=${product?.id}`)}
//             className="col-span-1 border-[1.2px] gap-1 p-2 
//             text-center rounded-sm text-sm cursor-pointer
//             border-slate-200 bg-slate-50 
//             transition hover:scale-105"
//         >
//             <div className="flex flex-col items-center w-full gap-1">

//                 <div className="w-full relative aspect-square overflow-hidden">
//                     <Image
//                         fill
//                         src={product.images[0]?.urlImage || product.images[1]?.urlImage || "/public/google-icon.png"}
//                         alt={product.name}
//                         className="w-full h-full object-contain"
//                     />
//                 </div>

//                 <div className="mt-4 h-9">{truncateText(product?.name)}</div>

//                 <div className="text-xl font-medium text-gray-700">
//                     {formatPrice(priceNew)}
//                 </div>
//                 <div className="line-through text-sm text-gray-500">
//                     {formatPrice(productVariation?.price)}
//                 </div>

//                 {product?.discountPercent > 0 && (
//                     <div className="text-sm font-medium text-red-500">
//                         -{product?.discountPercent}%
//                     </div>
//                 )}



//                 <div className="text-sm text-gray-500">
//                     Đã bán: {product?.totalSold}
//                 </div>

//             </div>
//         </Link>
//     );
// };

// export default ProductCard;

'use client'

import { formatPrice, truncateText } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const productVariation = product.productVariations[0]; // Lấy phiên bản sản phẩm đầu tiên
    const priceNew =
        productVariation?.discountPercent > 0
            ? productVariation.price - (productVariation.price * productVariation.discountPercent) / 100
            : productVariation?.price;

    return (
        <Link
            href={`${product?.slug}?spid=${product?.id}`}
            className="product-card group col-span-1 border border-slate-200 bg-white rounded-lg shadow-sm p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
            <div className="flex flex-col items-center gap-3">
                {/* Image Container */}
                <div className="w-full relative aspect-square overflow-hidden rounded-md">
                    <Image
                        fill
                        src={product.images[0]?.urlImage || product.images[1]?.urlImage || "/public/google-icon.png"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                </div>

                {/* Product Name */}
                <div className="text-center mt-2 text-sm font-medium text-gray-800 truncate w-full">
                    {truncateText(product?.name, 40)} {/* limit text length */}
                </div>

                {/* Price Container */}
                <div className="flex flex-col items-center justify-center gap-2 mt-2">
                    {/* New Price */}
                    <div className="text-xl font-semibold text-gray-800">
                        {formatPrice(priceNew)}
                    </div>

                    {/* Original Price */}
                    {productVariation?.price && priceNew !== productVariation?.price && (
                        <div className="line-through text-sm text-gray-500">
                            {formatPrice(productVariation?.price)}
                        </div>
                    )}
                </div>

                {/* Discount Percentage */}
                {product?.discountPercent > 0 && (
                    <div className="text-sm font-medium text-red-500 mt-1">
                        -{product?.discountPercent}% OFF
                    </div>
                )}

                {/* Sold Count */}
                <div className="text-sm text-gray-500 mt-2">
                    Đã bán: {product?.totalSold}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;


