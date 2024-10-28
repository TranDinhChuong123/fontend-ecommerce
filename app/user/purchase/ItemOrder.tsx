import Link from "next/link"
import Image from "next/image"
import SetQuantity from "../../components/products/SetQuantity"
import useCart from "@/hooks/useCart"
import { calculateDiscountedPrice, createSlug, formatPrice, truncateText } from "@/utils/util"
import { ProductCart } from "@/types/ProductTypes"
import SetQuantityCart from "../../components/cart/SetQuantityCart"
import { useCallback, useState } from "react"
import { Checkbox } from "@mui/material"
import { useRouter } from "next/navigation"
import RenderIf from "@/utils/RenderIf"
import ReviewForm from "./ReviewForm"
import BackDrop from "@/app/components/nav/BackDrop"


interface ItemContentProps {
    item: any,
    completed?: boolean
}

const ItemOrder: React.FC<ItemContentProps> = ({ item, completed = false }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className="hover:cursor-pointer w-full flex flex-row gap-2 py-2 border-b rounded-md text-slate-700
        "

        >
            <div className="relative w-[100px] aspect-square"
                onClick={() => router.push(`/${createSlug(item.name)}/?spid=${item.productId}`)}
            >
                <Image src={item.urlImage}
                    alt={item.id}
                    fill
                    className="object-contain" />
            </div>
            <div className="relative flex flex-col justify-between gap-3 py-2 w-full"
                onClick={() => router.push(`/${createSlug(item.name)}/?spid=${item.productId}`)}
            >
                <p className="text-slate-900 w-[75%] ">{item.name}</p>

                <div className="flex flex-row gap-20">
                    <div className="text-slate-800  w-[30%]">Màu: {item.color}</div>
                    <div className="text-slate-800 ">Size: {item?.size}</div>

                </div>
                <div className="absolute right-[5%] bottom-[50%]">x{item.buyQuantity}</div>

                <div className="absolute flex flex-row gap-10 right-0 bottom-0 pr-5">

                    <div className="line-through text-gray-400">{formatPrice(item.price)} </div>
                    <div className="text-red-600">{formatPrice(calculateDiscountedPrice(item.price, item.discountPercent))} </div>
                </div>

            </div>

            <div className="w-[120px] flex flex-row items-center">
                <RenderIf isTrue={completed}>
                    <button className=" bg-teal-700 text-white rounded-md w-full py-2"
                        onClick={toggleOpen}>
                        Nhận xét
                    </button>

                    <RenderIf isTrue={isOpen}>
                        <ReviewForm item={item} onClose={toggleOpen} />
                        <BackDrop onClick={toggleOpen} />
                    </RenderIf>

                </RenderIf>
            </div>
        </div>
    )
}

export default ItemOrder
