import { useEffect, useState, useMemo, useCallback } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import { AddressType, ProductCart } from "@/types/ProductTypes";
import { calculateDiscountedPrice } from "@/utils/util";

const useCheckoutData = (currentUser: any) => {
    const axiosAuth = useAxiosAuth();
    const [cartProducts, setCartProducts] = useState<ProductCart[] | []>([]);
    const [address, setAddress] = useState<AddressType | null>(null);
    const [wallet, setWallet] = useState(0);
    const [loading, setLoading] = useState(true);
    const [updateDefaultAddress, setUpdateDefaultAddress] = useState(false);

    // Fetch Cart Products
    useEffect(() => {
        const getCart = async () => {
            if (!currentUser) {
                setCartProducts([]);
                setLoading(false);
                return;
            }
            const response = await handleApiCall(axiosAuth.get(`/cart/userId`));
            if (response && response.data) {
                const listProductCarts = response.data.cartProducts.filter(
                    (item: ProductCart) => item.isChecked === true
                );
                setCartProducts(listProductCarts);
            } else {
                setCartProducts([]);
            }
            setLoading(false);
        };
        getCart();
    }, [currentUser, axiosAuth]);

    // Fetch Wallet Info
    useEffect(() => {
        const getWalletUser = async () => {
            const response = await handleApiCall(axiosAuth.get(`/user/wallet`));
            if (response && response.data) {
                setWallet(response.data);
            } else {
                console.log("Error fetching wallet");
            }
        };
        getWalletUser();
    }, [axiosAuth]);

    // Fetch Address Info
    useEffect(() => {
        const getAddressesByUser = async () => {
            if (!currentUser) return;
            const response = await handleApiCall(axiosAuth.get(`/user/addresses`));
            if (response && response.data) {
                const defaultAddress = response.data.find((item: AddressType) => item.state === true);
                setAddress(defaultAddress);
                setUpdateDefaultAddress(false);
            } else {
                setAddress(null);
            }
        };
        getAddressesByUser();
    }, [currentUser, axiosAuth, updateDefaultAddress]);

    // Calculate total amount
    const totalAmount = useMemo(() => {
        return cartProducts.filter((p) => p.isChecked).reduce(
            (acc, item) =>
                acc + calculateDiscountedPrice(item.price, item.discountPercent) * item.buyQuantity,
            0
        );
    }, [cartProducts]);

    return {
        cartProducts,
        address,
        wallet,
        loading,
        totalAmount,
        setUpdateDefaultAddress,
    };
};

export default useCheckoutData;
