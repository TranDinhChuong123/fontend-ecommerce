import { CartRemoveRequest, CartRequest, CartType } from "@/types/ProductTypes";
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import useAxiosAuth from "./useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";

type CartContextType = {
    handleAddProductToCart: (product: CartRequest) => boolean,
    handleRemoveProductsFromCart: (product: CartRemoveRequest) => boolean,
    cart: CartType | null,
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartContextProvider = (props: any) => {

    const axiosAuth = useAxiosAuth();
    const handleAddProductToCart = useCallback(async (cartRequest: CartRequest): Promise<boolean> => {
        const response = await handleApiCall(axiosAuth.post("/cart/add-or-update", cartRequest));
        if (!response) {
            return false;
        }
        return true;

    }, [axiosAuth]);

    const handleRemoveProductsFromCart = useCallback(async (cartRemoveRequest: CartRemoveRequest): Promise<boolean> => {
        const response = await handleApiCall(axiosAuth.post("/cart/remove", cartRemoveRequest));
        if (!response) {
            return false;
        }
        return true;
    }, [axiosAuth]);

    const value = {
        handleAddProductToCart,
        handleRemoveProductsFromCart
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
