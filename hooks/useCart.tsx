import { CartRemoveRequest, CartRequest, CartType } from "@/types/ProductTypes";
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import useAxiosAuth from "./useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import { getSession, useSession } from "next-auth/react";

type CartContextType = {
    handleAddProductToCart: (product: CartRequest) => boolean,
    handleAddProductBuyNow: (product: CartRequest) => boolean,

    handleRemoveProductsFromCart: (product: CartRemoveRequest) => boolean,
    handleUpdateProductQuantity: (product: any) => boolean,
    handleCartProductsLength: () => any,
    cart: CartType | null,
    cartLength: number;
    paymentIntent: string | null,
    setCartLength: (length: number) => void;
    handleSetPaymentIntent: (val: string | null) => void
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartContextProvider = (props: any) => {
    const [cartLength, setCartLength] = useState<number>(0)
    const axiosAuth = useAxiosAuth();
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val)
        localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
    }, [paymentIntent])


    const handleCartProductsLength = useCallback(async (): Promise<any> => {
        const session = await getSession();
        const resData = await handleApiCall(axiosAuth.get(`/cart/${session?.user.email}/cart-products-length`));
        if (!resData) {
            return 0;
        }
        return resData;

    }, [axiosAuth]);





    const handleAddProductToCart = useCallback(async (cartRequest: CartRequest): Promise<boolean> => {
        const resData = await handleApiCall(axiosAuth.post("/cart/add-or-update", cartRequest));
        if (!resData) {
            return false;
        }
        return true;

    }, [axiosAuth]);

    const handleAddProductBuyNow  = useCallback(async (cartRequest: CartRequest): Promise<boolean> => {
        const resData = await handleApiCall(axiosAuth.post("/cart/buy-now", cartRequest));
        if (!resData) {
            return false;
        }
        return true;

    }, [axiosAuth]);

    const handleUpdateProductQuantity = useCallback(async (cartRequest: any): Promise<boolean> => {
        const ResData = await handleApiCall(axiosAuth.put("/cart/update-quantity", cartRequest));
        if (!ResData) {
            return false;
        }
        return true;
    }, [axiosAuth]);

    const handleRemoveProductsFromCart = useCallback(async (cartRemoveRequest: CartRemoveRequest): Promise<boolean> => {
        const data = await handleApiCall(axiosAuth.delete("/cart/remove", { data: cartRemoveRequest }));
        if (!data) {
            return false;
        }
        return true;
    }, [axiosAuth]);

    const value = {
        paymentIntent,
        cartLength,
        setCartLength,
        handleAddProductBuyNow,
        handleAddProductToCart,
        handleRemoveProductsFromCart,
        handleUpdateProductQuantity,
        handleCartProductsLength,
        handleSetPaymentIntent
    };

    return (
        <CartContext.Provider value={value} {...props} />
    );
}

const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
}

export default useCart;
