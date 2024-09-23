
import { CartRequest } from "@/types/ProductTypes";
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number,
    cartTotalAmount: number,
    paymentIntent: string | null,
    cartProducts: CartRequest[] | null,
    handleClearCart: () => void,
    handleAddProductToCart: (product: CartRequest) => void
    handleRemoveProductFromCart: (product: CartRequest) => void
    handleCartProductQtyIncrease: (product: CartRequest) => void
    handleCartProductQtyDecrease: (product: CartRequest) => void
    handleSetPaymentIntent: (val: string | null) => void
}


export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any;
}


export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    // const [cartProducts, setCartProducts] = useState<CartRequest[] | null>(null)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)




    // useEffect(() => {
    //     const getTotals = () => {
    //         if (cartProducts) {
    //             const { total, qty } = cartProducts?.reduce((acc: any, product) => {
    //                 const itemTotal = product.price_new * product.buyQuantity
    //                 acc.qty += product.buyQuantity
    //                 acc.total += itemTotal
    //                 return acc
    //             }, {
    //                 total: 0,
    //                 qty: 0,
    //             })
    //             setCartTotalQty(qty)
    //             setCartTotalAmount(total)
    //         }
    //     };

    //     getTotals();
    // }, [cartProducts])

    // const handleSetPaymentIntent = useCallback((val: string | null) => {
    //     setPaymentIntent(val)
    //     localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
    // }, [paymentIntent])

        const handleAddProductToCart = useCallback((product: CartRequest) => {
            setCartProducts((prev: any) => {
                let updateCart;

                if (prev) {
                    updateCart = [...prev, product]
                } else {
                    updateCart = [product]
                }
                localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
                return updateCart;
            });
            setCartTotalQty((prevQty) => prevQty + product.buyQuantity);
            toast.success('Product added to cart')
        }, [])

    // const handleRemoveProductFromCart = useCallback((product: CartRequest) => {
    //     if (cartProducts) {
    //         const filteredProducts = cartProducts.filter((item) => {
    //             return item.id !== product.id
    //         })

    //         setCartProducts(filteredProducts)

    //         localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
    //         toast.success('Product removed successfully')
    //     }
    // }, [cartProducts])

    // const handleCartProductQtyIncrease = useCallback((product: CartRequest) => {
    //     if (product.buyQuantity === 99) {
    //         toast.error('Ooop! Maximum quantity reached')
    //         return
    //     }
    //     if (cartProducts) {
    //         // const updatedProducts = cartProducts.map((item) => {
    //         //     if (item.id === product.id) {
    //         //         return {...item, quantity: item.quantity + 1 }
    //         //     }
    //         //     return item
    //         // })
    //         // setCartProducts(updatedProducts)
    //         // localStorage.setItem('eShopCartItems', JSON.stringify(updatedProducts));
    //         // setCartTotalQty((prevTotal) => prevTotal + 1)
    //         let updatedCart = [...cartProducts];

    //         const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

    //         if (existingIndex > -1) {

    //             updatedCart[existingIndex].buyQuantity = ++updatedCart[existingIndex].buyQuantity
    //             setCartProducts(updatedCart)
    //             localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    //         } else {
    //             toast.error('Product not found in cart')
    //         }
    //     }
    // }, [cartProducts])

    // const handleCartProductQtyDecrease = useCallback((product: CartRequest) => {
    //     if (product.buyQuantity === 1) {
    //         toast.error('Ooop! Min reached')
    //         return
    //     }
    //     if (cartProducts) {
    //         let updatedCart = [...cartProducts];
    //         const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

    //         if (existingIndex > -1) {

    //             updatedCart[existingIndex].buyQuantity = --updatedCart[existingIndex].buyQuantity
    //             setCartProducts(updatedCart)
    //             localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));



    //         } else {
    //             toast.error('Product not found in cart')
    //         }
    //     }
    // }, [cartProducts])

    // const handleClearCart = useCallback(() => {
    //     setCartProducts(null)
    //     setCartTotalQty(0)
    //     localStorage.setItem('eShopCartItems', JSON.stringify(null));
    // }, [])

    const value = {
        cartTotalQty,
        cartProducts,
        cartTotalAmount,
        paymentIntent,
        handleAddProductToCart,
        // handleSetPaymentIntent,
        // handleClearCart,
        // handleRemoveProductFromCart,
        // handleCartProductQtyIncrease,
        // handleCartProductQtyDecrease

    }
    return (
        <CartContext.Provider value={value} {...props} />
    )
}

// Hàm useCallback trong React được sử dụng để tối ưu hóa hiệu suất của các hàm trong các thành phần (components) bằng cách giữ lại cùng một hàm giữa các lần render của thành phần, trừ khi một số phụ thuộc cụ thể thay đổi. Đây là một hook quan trọng giúp tránh việc tạo ra các hàm mới không cần thiết trong quá trình render lại.

const useCart = () => {

    const context = useContext(CartContext)
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context
}

export default useCart


