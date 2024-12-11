'use client'

import useCurrentUser from '@/actions/useCurrentUser '
import useAxiosAuth from '@/hooks/useAxiosAuth'
import useCheckoutData from '@/hooks/useCheckoutData'
import handleApiCall from '@/services/handleApiCall'
import RenderIf from '@/utils/RenderIf'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { IoBagCheckOutline } from "react-icons/io5"
import Button from '../components/common/Button'
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
import PaymentClient from './payment/PaymentClient'

interface Props {
    method: string | null;
}
const CheckoutClient: React.FC<Props> = ({ method }) => {

    const router = useRouter();
    const currentUser = useCurrentUser();
    const {
        cartProducts,
        address,
        wallet,
        loading,
        totalAmount,
        setUpdateDefaultAddress,
    } = useCheckoutData(currentUser);


    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState<string | null>('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CASH_ON_DELIVERY");
    const [isCreateOrder, setIsCreateOrder] = useState(false);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("FAST");
    const axiosAuth = useAxiosAuth();
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const feeShip = useMemo(() => {
        return selectedShippingMethod === "FAST"
            ? 30000
            : selectedShippingMethod === "EXPRESS"
                ? 50000
                : 15000;
    }, [selectedShippingMethod]);



    const handleCheckout = async () => {
        if (selectedPaymentMethod === 'CREDIT_CARD') {
            router.push('/checkout?method=payment');
        } else if (selectedPaymentMethod === 'CASH_ON_DELIVERY') {

            const resData = await handleApiCall(axiosAuth.post('/order/create', {
                feeShip: 30000,
                totalPrice: totalAmount + feeShip,
                orderProducts: cartProducts,
                note,
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
                feeShip: feeShip,
                totalPrice: totalAmount + feeShip,
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
    console.log("method", method);


    if (method === 'payment') {
        return (
            <div className='w-full flex items-center justify-center py-10'>
                <div className='w-[50%]'>
                    <PaymentClient note={note} feeShip={feeShip} listProductCarts={cartProducts} totalPrice={totalAmount} />
                </div>
            </div>
        )
    }

    return (
        <div className="text-slate-700">
            <AddressInfo address={address} onChangeAddress={() => setIsOpen(true)} />
            <hr className='my-3' />
            <div
                className="grid grid-cols-5 text-sm font-semibold gap-4 pb-2 items-center mt-8 px-8 py-4 
               bg-gray-100 rounded-md shadow-md border border-gray-200"
            >
                <div className="col-span-2 justify-self-start text-gray-700 uppercase">Sản Phẩm</div>
                <div className="justify-self-center text-gray-700 uppercase">Đơn Giá</div>
                <div className="justify-self-center text-gray-700 uppercase">Số Lượng</div>
                <div className="justify-self-end text-gray-700 uppercase">Số Tiền</div>
            </div>

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
                setNote={setNote}
                totalAmount={totalAmount}
                shippingFee={feeShip}


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

