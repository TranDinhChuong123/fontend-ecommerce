import Link from "next/link"
import Image from "next/image"
import SetQuantity from "../components/products/SetQuantity"
import useCart from "@/hooks/useCart"
import { calculateDiscountedPrice, formatPrice, truncateText } from "@/utils/util"
import { ProductCart } from "@/types/ProductTypes"
import SetQuantityCart from "../components/cart/SetQuantityCart"
import { useCallback, useState } from "react"
import { Checkbox } from "@mui/material"


interface ItemContentProps {
    item: ProductCart,
    currentUserId: string,
    selectedItems: string[];
    handleItemSelect: (productId: string) => void;
    handleSetIsUpdateQuantity: (isUpdateQuantity: boolean) => void;
}

const ItemContent: React.FC<ItemContentProps> = ({ item, currentUserId, selectedItems, handleItemSelect , handleSetIsUpdateQuantity }) => {
    const {
        handleAddProductToCart,
        handleUpdateProductQuantity
    } = useCart()




    const UpdateProductQuantity = (buyQuantity: number) => {
        handleUpdateProductQuantity({
            userId: currentUserId,
            cartProduct: {
                id: item.id,
                buyQuantity: buyQuantity
            }
        });
        handleSetIsUpdateQuantity(true)
    };

    // Hàm xử lý giảm số lượng sản phẩm
    const handleDecreaseProductQuantity = () => {
        handleAddProductToCart({
            userId: currentUserId,
            cartProduct: {
                productId: item.productId,
                selectedVariationId: item.selectedVariationId,
                buyQuantity: -1
            }
        });
        handleSetIsUpdateQuantity(true)
    };
    // Hàm xử lý tăng số lượng sản phẩm
    const handleIncreaseProductQuantity = () => {
        handleAddProductToCart({
            userId: currentUserId,
            cartProduct: {
                productId: item.productId,
                selectedVariationId: item.selectedVariationId,
                buyQuantity: 1
            }
        });
        handleSetIsUpdateQuantity(true)
    };

    return (
        <div className="grid grid-cols-5 text-sm gap-4
     border-slate-200 py-4 items-center">

            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 items-center">
                <input
                    type="checkbox"
                    className="w-[16px] h-[16px]"
                    checked={item.isChecked}
                    onChange={() => handleItemSelect(item.id)}
                />


                <Link href={`/${item.slug}?spid=${item.productId}`}>
                    <div className="relative w-[100px] aspect-square">
                        <Image src={item.urlImage} alt={item.id} fill className="object-contain" />
                    </div>
                </Link>

                <div className="flex flex-col justify-between gap-5">
                    <Link href={`/${item.slug}?spid=${item.productId}`} className="text-slate-800 font-semibold">
                        {truncateText(item.name)}
                    </Link>

                    <div>Size: {item?.size}</div>
                    <div>Màu: {item.color}</div>
                </div>

            </div>

            <div className="justify-self-center ">{formatPrice(calculateDiscountedPrice(item.price, item.discountPercent))}</div>

            <div className="justify-self-center">
                <SetQuantityCart
                    cartCounter={true}
                    productCart={item}
                    handleQtyChange={UpdateProductQuantity}
                    handleQtyDecrease={handleDecreaseProductQuantity}
                    handleQtyIncrease={handleIncreaseProductQuantity}
                />
            </div>
            <div className="justify-self-end font-semibold">
                {formatPrice(calculateDiscountedPrice(item.price, item.discountPercent)*item.buyQuantity)}
            </div>
        </div>
    )
}

export default ItemContent
