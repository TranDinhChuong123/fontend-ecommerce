import axiosAuth from "@/hooks/useAxiosAuth";
import { CartRequest } from "@/types/ProductTypes";

export const fetchAddProductToCartAPI = async (cartRequest: CartRequest) => {
    const { data } = await axiosAuth().post('/cart', cartRequest);
    return data;
}

export const fetchRemoveProductFromCartAPI = async (cartRequest: CartRequest) => {
    const { data } = await axiosAuth().post('/cart/remove', cartRequest);
    return data;
}

export const fetchUpdateProductQuantityAPI = async (cartRequest: CartRequest) => {
    const { data } = await axiosAuth().post('/cart/update-quantity', cartRequest);
    return data;
}

export const fetchFindCartByUserIdAPI = async (userId: string) => {
    const { data } = await axiosAuth().get(`/cart/${userId}`);
    return data;
}

export const fetchDeleteCartByUserIdAPI = async (userId: string) => {
    const { data } = await axiosAuth().delete(`/cart/delete/${userId}`);
    return data;
}




