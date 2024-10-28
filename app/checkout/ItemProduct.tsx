import Link from "next/link"
import Image from "next/image"
import SetQuantity from "../components/products/SetQuantity"
import useCart from "@/hooks/useCart"
import { calculateDiscountedPrice, formatPrice, truncateText } from "@/utils/util"
import { ProductCart } from "@/types/ProductTypes"
import SetQuantityCart from "../components/cart/SetQuantityCart"
import { useCallback } from "react"
import { Checkbox } from "@mui/material"


interface ItemContentProps {
    item: ProductCart,
}

const ItemProduct: React.FC<ItemContentProps> = ({ item }) => {


    return (
        <div className="grid grid-cols-5 text-sm gap-4
     border-slate-200 py-4 items-center">

            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 items-center">
                <div className="relative w-[100px] aspect-square">
                    <Image src={item.urlImage}
                        alt={item.id}
                        fill
                        className="object-contain" />
                </div>
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-slate-900 ">{truncateText(item.name, 35)}</p>

                    <div className="text-slate-800 ">Size: {item?.size}</div>
                    <div className="text-slate-800 ">Màu: {item.color}</div>
                </div>


            </div>

            <div className="justify-self-center ">{formatPrice(calculateDiscountedPrice(item.price, item.discountPercent))}</div>

            <div className="justify-self-center">
                {item.buyQuantity}
            </div>
            <div className="justify-self-end font-semibold">
                {formatPrice(calculateDiscountedPrice(item.price, item.discountPercent) * item.buyQuantity)}
            </div>
        </div>
    )
}

export default ItemProduct
