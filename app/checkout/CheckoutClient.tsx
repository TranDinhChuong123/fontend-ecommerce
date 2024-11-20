// 'use client'

// import useAxiosAuth from '@/hooks/useAxiosAuth'
// import handleApiCall from '@/services/handleApiCall'
// import { AddressType, ProductCart } from '@/types/ProductTypes'
// import RenderIf from '@/utils/RenderIf'
// import { calculateDiscountedPrice } from '@/utils/util'
// import { useRouter } from 'next/navigation'
// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { IoBagCheckOutline } from "react-icons/io5"
// import Button from '../components/Button'
// import AddressInfo from '../components/checkout/AddressInfo'
// import CartSummary from '../components/checkout/CartSummary'
// import EmptyCart from '../components/checkout/EmptyCart'
// import ListAddress from '../components/checkout/ListAddress'
// import OrderSuccess from '../components/checkout/OrderSuccess'
// import PaymentMethods from '../components/checkout/PaymentMethods'
// import ProductList from '../components/checkout/ProductList'
// import ShippingMethods from '../components/checkout/ShippingMethods'
// import LoadingComponent from '../components/common/LoadingComponent'
// import BackDrop from '../components/nav/BackDrop'

// interface CartClientProps {
//     currentUser: any,
// }



// const CheckoutClient: React.FC<CartClientProps> = ({ currentUser }) => {

//     const [selectedItems, setSelectedItems] = useState<string[]>([]);
//     const router = useRouter()
//     const axiosAuth = useAxiosAuth();
//     const [cartProducts, setCartProducts] = useState<ProductCart[] | []>([])
//     const [address, setAddress] = useState<AddressType | null>(null)
//     const [loading, setLoading] = useState(true);
//     const [wallet, setWallet] = useState(0);
//     const [updateDefaultAddress, setUpdateDefaultAddress] = useState(false);
//     const [isOpen, setIsOpen] = useState(false)
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CASH_ON_DELIVERY');
//     const [isCreateOrder, setIsCreateOrder] = useState(false);
//     const toggleOpen = useCallback(() => {
//         setIsOpen((prev) => !prev)
//     }, [])

//     useEffect(() => {
//         const getCart = async () => {
//             if (!currentUser) {
//                 setCartProducts([]);
//                 setLoading(false)
//                 return;
//             }
//             const response = await handleApiCall(axiosAuth.get(`/cart/userId`));
//             if (response && response.data) {
//                 const listProductCarts = response.data.cartProducts
//                     .filter((item: ProductCart) => item.isChecked === true)
//                 setCartProducts(listProductCarts);


//             } else {
//                 setCartProducts([]);
//             }
//             setLoading(false);

//         };
//         getCart();

//         const getWalletUser = async () => {
//             const response = await handleApiCall(axiosAuth.get(`/user/wallet`));
//             if (response && response.data) {
//                 setWallet(response.data);
//             } else {
//                 console.log("error wallet");
//             }

//         }
//         getWalletUser();

//     }, [currentUser, axiosAuth]);
//     localStorage.setItem('listProductCarts', JSON.stringify(cartProducts));

//     useEffect(() => {
//         const getAddressesByUser = async () => {
//             if (!currentUser) {
//                 return;
//             }
//             const response = await handleApiCall(axiosAuth.get(`/user/addresses`));
//             console.log("response", response);

//             if (response && response.data) {
//                 const address = response.data.find((item: AddressType) => item.state === true)
//                 setAddress(address);
//                 setUpdateDefaultAddress(false);
//             } else {
//                 setAddress(null);
//             }
//         };
//         getAddressesByUser();
//     }, [currentUser, axiosAuth, updateDefaultAddress]);

//     const totalAmount = useMemo(() => {
//         return cartProducts.filter(p => p.isChecked).reduce(
//             (acc, item) => acc + calculateDiscountedPrice(item.price, item.discountPercent) * item.buyQuantity,
//             0
//         ) || 0
//             ;
//     }, [cartProducts]);

//     const handleCheckout = async () => {
//         if (selectedPaymentMethod === 'CREDIT_CARD') {
//             localStorage.setItem('totalPrice', (
//                 totalWithShipping
//             ).toString());
//             router.push('/checkout/payment');
//         } else if (selectedPaymentMethod === 'CASH_ON_DELIVERY') {

//             const resData = await handleApiCall(axiosAuth.post('/order/create', {
//                 feeShip: 30000,
//                 totalPrice: totalAmount + 30000,
//                 orderProducts: cartProducts,
//                 payment: {
//                     paymentMethod: 'CASH_ON_DELIVERY',
//                     paymentStatus: 'PENDING',
//                 }
//             }));

//             if (resData) {
//                 setIsCreateOrder(true);
//             } else {
//                 console.log("Lỗi tạo đơn hàng", resData);
//             }
//             console.log("resData", resData);
//         } else if (selectedPaymentMethod === "WALLET") {
//             const resData = await handleApiCall(axiosAuth.post('/order/create', {
//                 feeShip: 30000,
//                 totalPrice: totalAmount + 30000,
//                 orderProducts: cartProducts,
//                 payment: {
//                     paymentMethod: 'WALLET',
//                     paymentStatus: 'COMPLETED',
//                 }
//             }));

//             if (resData) {
//                 setIsCreateOrder(true);
//             } else {
//                 console.log("Lỗi tạo đơn hàng", resData);
//             }
//         };

//     }

//     const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("FAST");

//     // Hàm tính tổng tiền với phí vận chuyển
//     const totalWithShipping = useMemo(() => {
//         const shippingFee =
//             selectedShippingMethod === "FAST"
//                 ? 30000
//                 : selectedShippingMethod === "EXPRESS"
//                     ? 50000
//                     : 15000;

//         return totalAmount + shippingFee;
//     }, [selectedShippingMethod, totalAmount]);


//     if (loading) return <LoadingComponent />;
//     if (!cartProducts || cartProducts.length === 0) return <EmptyCart />;
//     if (isCreateOrder) return <OrderSuccess />;

//     return (
//         <div className="text-slate-700">
//             <AddressInfo address={address} onChangeAddress={() => setIsOpen(true)} />
//             <hr className='my-3' />
//             <ProductList products={cartProducts} />
//             <hr className='my-3' />
//             <PaymentMethods
//                 selectedPaymentMethod={selectedPaymentMethod}
//                 onSelectPaymentMethod={setSelectedPaymentMethod}
//                 wallet={wallet}
//                 totalAmount={totalAmount}
//             />
//             <ShippingMethods
//                 selectedShippingMethod={selectedShippingMethod}
//                 onSelectShippingMethod={setSelectedShippingMethod}
//             />
//             <hr className='my-3' />
//             <CartSummary
//                 totalAmount={totalAmount}
//                 shippingFee={
//                     selectedShippingMethod === "FAST" ? 30000
//                         : selectedShippingMethod === "EXPRESS" ? 50000
//                             : 15000
//                 }
//             />

//             <div className='w-full flex justify-center p-10'>
//                 <div className='w-[50%]'>
//                     <Button
//                         icon={IoBagCheckOutline}
//                         label={'Đặt hàng'}
//                         rounded
//                         styleIcon='text-white'
//                         onClick={handleCheckout}
//                     />
//                 </div>
//             </div>


//             <RenderIf isTrue={isOpen}>
//                 <ListAddress onClose={toggleOpen} updateDefaultAddress={setUpdateDefaultAddress} />
//                 <BackDrop onClick={toggleOpen} />
//             </RenderIf>
//         </div>
//     );
// };

// export default CheckoutClient;

'use client'

import useAxiosAuth from '@/hooks/useAxiosAuth'
import useCheckoutData from '@/hooks/useCheckoutData'
import handleApiCall from '@/services/handleApiCall'
import RenderIf from '@/utils/RenderIf'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { IoBagCheckOutline } from "react-icons/io5"
import Button from '../components/Button'
import AddressInfo from '../components/checkout/AddressInfo'
import CartSummary from '../components/checkout/CartSummary'
import EmptyCart from '../components/checkout/EmptyCart'
import ListAddress from '../components/checkout/ListAddress'
import OrderSuccess from '../components/checkout/OrderSuccess'
import PaymentMethods from '../components/checkout/PaymentMethods'
import ProductList from '../components/checkout/ProductList'
import ShippingMethods from '../components/checkout/ShippingMethods'
import LoadingComponent from '../components/common/LoadingComponent'
import BackDrop from '../components/nav/BackDrop'
import { Truculenta } from 'next/font/google'
const CheckoutClient: React.FC<{ currentUser: any }> = ({ currentUser }) => {
    const router = useRouter();
    const {
        cartProducts,
        address,
        wallet,
        loading,
        totalAmount,
        setUpdateDefaultAddress,
    } = useCheckoutData(currentUser);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CASH_ON_DELIVERY");
    const [isCreateOrder, setIsCreateOrder] = useState(false);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("FAST");
    const axiosAuth = useAxiosAuth();
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const totalWithShipping = useMemo(() => {
        const shippingFee =
            selectedShippingMethod === "FAST"
                ? 30000
                : selectedShippingMethod === "EXPRESS"
                    ? 50000
                    : 15000;
        return totalAmount + shippingFee;
    }, [selectedShippingMethod, totalAmount]);

    const handleCheckout = async () => {
        if (selectedPaymentMethod === 'CREDIT_CARD') {
            localStorage.setItem('totalPrice', (
                totalWithShipping
            ).toString());
            router.push('/checkout/payment');
        } else if (selectedPaymentMethod === 'CASH_ON_DELIVERY') {

            const resData = await handleApiCall(axiosAuth.post('/order/create', {
                feeShip: 30000,
                totalPrice: totalAmount + 30000,
                orderProducts: cartProducts,
                payment: {
                    paymentMethod: 'CASH_ON_DELIVERY',
                    paymentStatus: 'PENDING',
                }
            }));

            if (resData) {
                setIsCreateOrder(true);
            } else {
                console.log("Lỗi tạo đơn hàng", resData);
            }
            console.log("resData", resData);
        } else if (selectedPaymentMethod === "WALLET") {
            const resData = await handleApiCall(axiosAuth.post('/order/create', {
                feeShip: 30000,
                totalPrice: totalAmount + 30000,
                orderProducts: cartProducts,
                payment: {
                    paymentMethod: 'WALLET',
                    paymentStatus: 'COMPLETED',
                }
            }));

            if (resData) {
                setIsCreateOrder(true);
            } else {
                console.log("Lỗi tạo đơn hàng", resData);
            }
        };

    }

    if (loading) return <LoadingComponent />;
    if (!cartProducts || cartProducts.length === 0) return <EmptyCart />;
    if (isCreateOrder) return <OrderSuccess />;

    return (
        <div className="text-slate-700">
            <AddressInfo address={address} onChangeAddress={() => setIsOpen(true)} />
            <hr className='my-3' />
            <ProductList products={cartProducts} />
            <hr className='my-3' />
            <PaymentMethods
                selectedPaymentMethod={selectedPaymentMethod}
                onSelectPaymentMethod={setSelectedPaymentMethod}
                wallet={wallet}
                totalAmount={totalAmount}
            />
            <ShippingMethods
                selectedShippingMethod={selectedShippingMethod}
                onSelectShippingMethod={setSelectedShippingMethod}
            />
            <hr className='my-3' />
            <CartSummary
                totalAmount={totalAmount}
                shippingFee={
                    selectedShippingMethod === "FAST" ? 30000
                        : selectedShippingMethod === "EXPRESS" ? 50000
                            : 15000
                }
            />

            <div className='w-full flex justify-center p-10'>
                <div className='w-[50%]'>
                    <Button
                        icon={IoBagCheckOutline}
                        label={'Đặt hàng'}
                        rounded
                        styleIcon='text-white'
                        onClick={handleCheckout}
                    />
                </div>
            </div>


            <RenderIf isTrue={isOpen}>
                <ListAddress onClose={toggleOpen} updateDefaultAddress={setUpdateDefaultAddress} />
                <BackDrop onClick={toggleOpen} />
            </RenderIf>
        </div>
    );
};

export default CheckoutClient;

