'use client'

import Button from "@/app/components/Button"
import ProductImage from "@/app/components/products/ProductImage"
import SetQuantity from "@/app/components/products/SetQuantity"
import useCart from "@/hooks/useCart"
import RenderIf from "@/utils/RenderIf"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { MdCheckCircle } from "react-icons/md"
import { Rating } from "@mui/material"

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import ProductCard from "@/app/components/products/ProductCard"
import ProductInfo from "./ProductInfo"
import { FaCartShopping } from "react-icons/fa6";
import { calculateDiscountedPrice, formatDiscountPercent, formatPrice, truncateText } from "@/utils/util"
import Link from "next/link"
import SetColorProduct from "../components/products/SetColorProduct"
import SetCapacityProduct from "../components/products/SetCapacityProduct"
import SetSizeProduct from "../components/products/SetSizeProduct"

interface ProductDetailProps {
  product: any
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />
}


export type ImageType = {
  color: string;
  urlImage: string;
}

export type ProductVariation = {
  color: string,
  size?: string
  capacity?: string
  price: number,
  discountPercent: number,
  reviews: [],
  soldQuantity: number,
  quantity: number,
}

export type ProductCartType = {
  id: string;
  name: string;
  description: string;
  selectedImg: ImageType;
  category: string;
  brand: string;
  price_new: number;
  buyQuantity: number;
  warranty?: string, // thoi han bao hanh
  selectedVariation: ProductVariation;
  productVariations: ProductVariation[];

}



const ProductDetails: React.FC<ProductDetailProps> = ({ product }) => {

  const router = useRouter();
  const [isProductInCart, setIsProductInCart] = useState(false)
  const { cartTotalQty, cartProducts, handleAddProductToCart } = useCart()

  useEffect(() => {
    setIsProductInCart(false)
    if (cartProducts) {
      const exitingIndex = cartProducts.findIndex((item) => item.id === product.id)
      if (exitingIndex > -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts, product.id])

  // console.log('cartProducts ', cartProducts);
  // console.log("cartTotalQty :", cartTotalQty);
  const [productVariations, setProductVariations] = useState<ProductVariation[]>
    (product.productVariations.filter((variation: ProductVariation) => variation.color === product.images[0].color));

  const [productCart, setProductCart] = useState<ProductCartType>({
    id: product.id,
    name: product.name,
    selectedImg: product.images[0],
    description: product.description,
    category: product.category,
    brand: product.brand,
    buyQuantity: 1,
    price_new: calculateDiscountedPrice(product.productVariations[0].price, product.productVariations[0].discountPercent),
    selectedVariation: product.productVariations.find((variation: ProductVariation) => variation.color === product.images[0].color),
    productVariations: product.productVariations.filter((variation: ProductVariation) => variation.color === product.images[0].color),
  });


  console.log('product.productVariations.find ', product.productVariations.find((variation: ProductVariation) => variation.color === product.images[0].color));
  console.log("productCart :", productCart);


  const handleColorProduct = useCallback((color: string, url: string, productVariations: ProductVariation[]) => {
    setProductCart((prev) => {

      const selectedVariation = productVariations.find((variation: ProductVariation) => {
        if (prev.selectedVariation?.size) {
          return variation.size === prev.selectedVariation.size;
        } else if (prev.selectedVariation?.capacity) {
          return variation.capacity === prev.selectedVariation.capacity;
        }
        return false;
      }) || productVariations[0];

      return {
        ...prev,
        selectedImg: {
          color: color,
          urlImage: url
        },
        price_new: calculateDiscountedPrice(selectedVariation.price, selectedVariation.discountPercent),
        selectedVariation: selectedVariation,
        productVariations: productVariations
      }
    });
  }, [productCart.selectedVariation]);


  const handleSelectedVariation = useCallback((productVariation: ProductVariation) => {
    setProductCart((prev) => {
      return {
        ...prev,
        price_new: calculateDiscountedPrice(productVariation.price, productVariation.discountPercent),
        selectedVariation: productVariation
      }
    })
  }, [productCart.selectedVariation])



  const productRating = productCart.selectedVariation.reviews.length > 0
    ? productCart.selectedVariation.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / productCart.selectedVariation.reviews.length
    : 0; // Nếu không có review, trả về 0

  const handleQtyDecrease = useCallback(() => {
    if (productCart.buyQuantity === 1) return;
    setProductCart((prev) => {
      return { ...prev, buyQuantity: prev.buyQuantity - 1 }
    })

  }, [productCart.buyQuantity])
  const handleQtyIncrease = useCallback(() => {
    if (productCart.buyQuantity === 99) return;
    setProductCart((prev) => {
      return { ...prev, buyQuantity: prev.buyQuantity + 1 }
    })
  }, [productCart.buyQuantity])

  return (
    <div>
      <div className="flex flex-row pb-4 text-slate-700 font-normal rư">
        <Link className="hover:underline" href='/'>Trang chủ</Link>
        <p className="px-1">&gt;</p>
        <Link className="hover:underline" href='/'>{product.category}</Link>
        <p className="px-1">&gt;</p>
        <Link className="hover:underline" href='/'>{product.brand}</Link>
        <p className="px-1">&gt;</p>
        <Link className="hover:underline" href='#'>{truncateText(product.name, 30)}</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8">
        <ProductImage
          handleColorProduct={handleColorProduct}
          product={product}
          selectedProduct={productCart}
        />

        <div className="flex flex-col gap-1 text-slate-700 text-sm">

          <h2 className="text-3xl font-medium text-slate-700 mb-4">{product.name}</h2>
          <div className="flex items-center gap-4">

            <span className="text-xl font-medium">
              Giá:
            </span>
            <span className="text-xl font-medium text-gray-700">
              {formatPrice(productCart.price_new)}
            </span>
            <span className="text-base font-normal line-through 
            text-[#6b7280]
          ">
              {formatPrice(productCart.selectedVariation.price)}
            </span>

            <span className="text-sm font-medium text-[#4f47e6]">
              {formatDiscountPercent(productCart.selectedVariation.discountPercent)}
            </span>


          </div>

          <div className="flex items-center gap-2 py-2">


            <span className="text-md font-medium">
              Đánh giá:
            </span>
            <Rating value={productRating} precision={0.5} readOnly />

            <div>({productCart.selectedVariation.reviews.length})</div>

            <div>Đã Bán {productCart.selectedVariation.soldQuantity}</div>
          </div>

          <Horizontal />
          <RenderIf isTrue={isProductInCart}>
            <>
              <p className="flex mb-2 gap-1 text-center text-slate-500">
                <MdCheckCircle className="text-teal-400" size={20} />
                <span>Thêm vào giỏ hàng</span>
              </p>
            </>
          </RenderIf>


          <>
            <SetColorProduct
              productCart={productCart}
              product={product}
              handleColorProduct={handleColorProduct}
            />


            <Horizontal />

            <RenderIf isTrue={product.productVariations[0].capacity}>
              <SetCapacityProduct
                productCart={productCart}
                productVariations={productCart.productVariations}
                handleCapacityProduct={handleSelectedVariation}
              />
            </RenderIf>

            <RenderIf isTrue={product.productVariations[0].size}>
              <SetSizeProduct
                productCart={productCart}
                productVariations={productCart.productVariations}
                handleSizeProduct={handleSelectedVariation}
              />
            </RenderIf>


            <div className="flex flex-row gap-10">
              <SetQuantity
                productCart={productCart}
                // cartCounter={cartCounter}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease}
              />
              <div className={productCart.selectedVariation.quantity ? "text-teal-400 py-4 font-semibold" : "text-rose-400"}>
                {productCart.selectedVariation.quantity ? `${productCart.selectedVariation.quantity} sản phẩm có sẳn` : "Hết hàng sản phẩm"}
              </div>
            </div>


            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                icon={FaCartShopping}
                styleIcon="text-white"
                rounded
                label="Add to cart"
                onClick={() => handleAddProductToCart(productCart)}
              />
            </div>
          </>
        </div>
      </div >
      <ProductInfo
        description={product?.description || ''}
        reviews={productCart.selectedVariation.reviews}
      />
    </div >
  )
}

export default ProductDetails
