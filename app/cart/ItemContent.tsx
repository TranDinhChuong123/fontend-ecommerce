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
    currentUserId: string,
    selectedItems: string[];
    handleItemSelect: (productId: string) => void;
}

const ItemContent: React.FC<ItemContentProps> = ({ item, currentUserId, selectedItems, handleItemSelect }) => {
    const {
        handleAddProductToCart,
    } = useCart()
    const handleQtyChange = useCallback((buyQuantity: number) => {
        handleAddProductToCart({
            userId: currentUserId,
            productCart: {
                productId: item.productId,
                selectedVariationId: item.selectedVariationId,
                buyQuantity: - item.buyQuantity + buyQuantity
            }
        })
        console.log(- item.buyQuantity + buyQuantity);
    }, [item.buyQuantity])




    return (
        <div className="grid grid-cols-5 text-sm gap-4
     border-slate-200 py-4 items-center">

            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 items-center">
                <input
                    type="checkbox"
                    className="w-[16px] h-[16px]"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                />


                <Link href={`/${item.slug}?spid=${item.productId}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.urlImage} alt={item.id} fill className="object-contain" />
                    </div>
                </Link>

                <div className="flex flex-col justify-between gap-5">
                    <Link href={`/${item.slug}?spid=${item.productId}`}>
                        {truncateText(item.name)}
                    </Link>

                    <div>{item.color}</div>
                </div>

            </div>

            <div className="justify-self-center ">{formatPrice(calculateDiscountedPrice(item.price, item.discountPercent))}</div>

            <div className="justify-self-center">
                <SetQuantityCart
                    cartCounter={true}
                    productCart={item}
                    handleQtyChange={handleQtyChange}
                    handleQtyDecrease={() => handleAddProductToCart({
                        userId: currentUserId,
                        productCart: {
                            productId: item.productId,
                            selectedVariationId: item.selectedVariationId,
                            buyQuantity: item.buyQuantity - 1 - item.buyQuantity
                        }
                    })}
                    handleQtyIncrease={() => handleAddProductToCart({
                        userId: currentUserId,
                        productCart: {
                            productId: item.productId,
                            selectedVariationId: item.selectedVariationId,
                            buyQuantity: item.buyQuantity + 1 - item.buyQuantity
                        }
                    })}
                />
            </div>
            <div className="justify-self-end font-semibold">
                {formatPrice(calculateDiscountedPrice(item.price, item.discountPercent))}
            </div>
        </div>
    )
}

export default ItemContent
