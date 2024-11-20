'use client'

import Button from "@/app/components/Button"
import ProductImage from "@/app/components/products/ProductImage"
import SetQuantity from "@/app/components/products/SetQuantity"
import useCart from "@/hooks/useCart"
import RenderIf from "@/utils/RenderIf"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Rating } from "@mui/material"
import ProductInfo from "./ProductInfo"
import { FaCartShopping } from "react-icons/fa6";
import { calculateDiscountedPrice, formatDiscountPercent, formatPrice, Horizontal, showToastError, showToastSuccess, truncateText } from "@/utils/util"
import Link from "next/link"
import SetColorProduct from "../components/products/SetColorProduct"
import SetCapacityProduct from "../components/products/SetCapacityProduct"
import SetSizeProduct from "../components/products/SetSizeProduct"
import { CartRequest, DynamicProductType, ProductVariationType } from "@/types/ProductTypes"
import AuthForm from "../components/auth/AuthForm"
import BackDrop from "../components/nav/BackDrop"
import useAxiosAuth from "@/hooks/useAxiosAuth"
import { fetchReviewsAPI } from "@/services/reviewService"
import { FaBagShopping } from "react-icons/fa6";
import handleApiCall from "@/services/handleApiCall"

interface ProductDetailProps {
  product: any,
  currentUser: any
}

const ProductDetails: React.FC<ProductDetailProps> = ({ product, currentUser }) => {
  const router = useRouter();
  const axios = useAxiosAuth();
  const { handleAddProductBuyNow, handleAddProductToCart, setCartLength } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [reviews, setReviews] = useState([])


  // const fetchProductStock = useCallback(async () => {
  //   const response = await handleApiCall(axios.get(`/inventory/${product.id}`));
  //   console.log('response', response);
  // }, [axios, product.id]); 

  // useEffect(() => {
  //   fetchProductStock();
  // }, [fetchProductStock]);



  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviewsAPI(product.id)
      setReviews(data || [])
    }
    getReviews();
  }, [])


  const { handleCartProductsLength } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<DynamicProductType>({
    urlImage: product.images[0].urlImage,
    color: product.images[0].color,
    buyQuantity: 1,
    price_new: calculateDiscountedPrice(product.productVariations[0].price, product.productVariations[0].discountPercent),
    selectedVariation: product.productVariations.find((variation: ProductVariationType) => variation.color === product.images[0].color) || product.productVariations[0],
    productVariations: product.productVariations.filter((variation: ProductVariationType) => variation.color === product.images[0].color),
  });



  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleAddToCart = async () => {
    if (!currentUser) {
      setIsOpen(true)
    } else {
      const cartRequest: CartRequest = {
        userId: currentUser.email,
        cartProduct: {
          productId: product.id,
          selectedVariationId: selectedProduct.selectedVariation.id,
          buyQuantity: selectedProduct.buyQuantity
        }
      }
      const booleanData = await handleAddProductToCart(cartRequest)
      if (!booleanData) {
        showToastError("Số lượng trong kho không đủ")
      } else {
        showToastSuccess("Đã thêm vào Giỏ Hàng");
        const res = await handleCartProductsLength()
        setCartLength(res.data || 0)
      }
    }
  }

  const handleBuyNow = async () => {
    if (!currentUser) {
      setIsOpen(true)
    } else {
      const cartRequest: CartRequest = {
        userId: currentUser.email,
        cartProduct: {
          productId: product.id,
          selectedVariationId: selectedProduct.selectedVariation.id,
          buyQuantity: selectedProduct.buyQuantity
        }
      }
      const booleanData = await handleAddProductBuyNow(cartRequest)

      if (!booleanData) {
        showToastError("Số lượng trong kho không đủ")
      } else {
        showToastSuccess("Đã thêm vào Giỏ Hàng");
        router.push('/cart')
      }

    }
  }


  const handleColorProduct = useCallback((color: string, url: string, productVariations: ProductVariationType[]) => {
    setSelectedProduct((prev) => {

      const selectedVariation = productVariations.find((variation: ProductVariationType) => {
        if (prev.selectedVariation?.size) {
          return variation.size === prev.selectedVariation.size;
        } else if (prev.selectedVariation?.capacity) {
          return variation.capacity === prev.selectedVariation.capacity;
        }
        return false;
      }) || productVariations[0];

      return {
        ...prev,
        color: color,
        urlImage: url,
        price_new: calculateDiscountedPrice(selectedVariation?.price, selectedVariation?.discountPercent),
        selectedVariation: selectedVariation,
        productVariations: productVariations
      }
    });
  }, [selectedProduct.selectedVariation]);


  const handleSelectedVariation = useCallback((productVariation: ProductVariationType) => {
    setSelectedProduct((prev) => {
      return {
        ...prev,
        price_new: calculateDiscountedPrice(productVariation.price, productVariation.discountPercent),
        selectedVariation: productVariation
      }
    })
  }, [selectedProduct.selectedVariation])



  const handleQtyDecrease = useCallback(() => {
    if (selectedProduct.buyQuantity === 1) return;
    setSelectedProduct((prev) => {
      return { ...prev, buyQuantity: prev.buyQuantity - 1 }
    })

  }, [selectedProduct.buyQuantity])
  const handleQtyIncrease = useCallback(() => {
    if (selectedProduct.buyQuantity === 99) return;
    setSelectedProduct((prev) => {
      return { ...prev, buyQuantity: prev.buyQuantity + 1 }
    })
  }, [selectedProduct.buyQuantity])

  const handleQtyChange = useCallback((buyQuantity: number) => {
    setSelectedProduct((prev) => {
      return { ...prev, buyQuantity: buyQuantity }
    })
  }, [selectedProduct.buyQuantity])

  console.log("selectedProduct", selectedProduct);

  return (
    <div className="z-30">
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
          selectedProduct={selectedProduct}
        />

        <div className="flex flex-col gap-3 text-slate-700 text-sm">

          <h2 className="text-2xl font-medium text-slate-700 mb-2">{product.name}</h2>
          <div className="flex items-center gap-4">

            <span className="text-xl font-medium">
              Giá:
            </span>
            <span className="text-xl font-medium text-gray-700">
              {formatPrice(selectedProduct.price_new)}
            </span>
            <span className="text-base font-normal line-through 
            text-[#6b7280]
          ">
              {formatPrice(selectedProduct?.selectedVariation?.price)}
            </span>

            <span className="text-sm font-medium text-[#4f47e6]">
              {formatDiscountPercent(selectedProduct?.selectedVariation?.discountPercent)}
            </span>


          </div>

          <div className="flex items-center gap-2 py-2">


            <span className="text-md font-medium">
              Đánh giá:
            </span>
            <Rating value={5} precision={0.5} readOnly />

            <div>(5)</div>


            <div>Đã Bán {selectedProduct?.selectedVariation?.soldQuantity}</div>


          </div>



          <>
            {/* <p className="flex mb-2 gap-1 text-center text-slate-500">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Thêm vào giỏ hàng</span>
            </p> */}
          </>
          <RenderIf isTrue={product?.brand}>
            <div className="flex items-center gap-2 pb-2 ">
              Nhãn hàng:  <p className="font-medium">{product?.brand}</p>
            </div>
          </RenderIf>




          <>
            <RenderIf isTrue={product.productVariations[0].color}>
              <SetColorProduct
                selectedProduct={selectedProduct}
                product={product}
                handleColorProduct={handleColorProduct}
              />
            </RenderIf>

            <RenderIf isTrue={product.productVariations[0].capacity}>
              <SetCapacityProduct
                selectedProduct={selectedProduct}
                productVariations={selectedProduct.productVariations}
                handleCapacityProduct={handleSelectedVariation}
              />
            </RenderIf>

            <RenderIf isTrue={product.productVariations[0].size && product.productVariations[0].color}>
              <SetSizeProduct
                selectedProduct={selectedProduct}
                productVariations={selectedProduct.productVariations}
                handleSizeProduct={handleSelectedVariation}
              />
            </RenderIf>

            <RenderIf isTrue={product.productVariations[0].size && !product.productVariations[0].color}>
              <SetSizeProduct
                selectedProduct={selectedProduct}
                productVariations={product.productVariations}
                handleSizeProduct={handleSelectedVariation}
              />
            </RenderIf>


            <div className="flex flex-row gap-10">
              <SetQuantity
                selectedProduct={selectedProduct}
                // cartCounter={cartCounter}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyChange={handleQtyChange}
              />
              <div className={selectedProduct?.selectedVariation?.quantity ? "text-teal-400 py-4 font-semibold" : "text-rose-400"}>
                {selectedProduct?.selectedVariation?.quantity ? `${selectedProduct?.selectedVariation?.quantity} sản phẩm có sẳn` : "Hết hàng sản phẩm"}
              </div>
            </div>
            <div className="flex flex-row gap-3 w-[500px]">
              <div className="w-[200px]">
                <Button
                  icon={FaCartShopping}
                  styleIcon="text-slate-700"
                  outline
                  label="Thêm Vào Giỏ Hàng"
                  onClick={handleAddToCart}
                />
              </div>

              <div className="w-[200px]">
                <Button
                  icon={FaBagShopping}
                  styleIcon="text-white"
                  label="Mua ngay"
                  onClick={handleBuyNow}
                />
              </div>

            </div>
          </>
        </div>
        <RenderIf isTrue={isOpen}>
          <BackDrop onClick={toggleOpen} />
          <AuthForm onClose={toggleOpen} />
        </RenderIf>
      </div >

      <ProductInfo
        description={product?.description || ''}
        reviews={reviews}
      />



    </div >
  )
}

export default ProductDetails
