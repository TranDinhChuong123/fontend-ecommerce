'use client'

import useCart from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from "./PaymentForm"
import Button from "../../components/Button"
import handleApiCall from "@/services/handleApiCall"
import useAxiosAuth from "@/hooks/useAxiosAuth"


const PaymentClient = () => {
    const axiosAuth = useAxiosAuth();
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
    const router = useRouter()
    const { paymentIntent, handleSetPaymentIntent } = useCart()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const listProductCarts = JSON.parse(localStorage.getItem('listProductCarts') || '[]')
    const totalPrice = Number(localStorage.getItem('totalPrice') || '0')


    useEffect(() => {


        setLoading(true)
        setError(false)
        const getClientSecret = async () => {
            const response = await handleApiCall(axiosAuth.post('/payment/create-payment-intent', {
                feeShip: 30000,
                totalPrice: totalPrice + 1,
                PaymentMethod: 'CREDIT_CARD',
                orderProducts: listProductCarts,
                paymentIntentId: paymentIntent
            }));

            if (response) {
                setClientSecret(response.data.clientSecret);
                handleSetPaymentIntent(response.data.id);
                setLoading(false);
            } else {
                setError(true);
                setLoading(false);
            }
        };

        getClientSecret();
    }, [paymentIntent]);



    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    };


    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])

    console.log("paymentSuccess", paymentSuccess);
    console.log("paymentIntent", paymentIntent);
    


    return (
        <div className="w-full">

            {clientSecret && paymentSuccess === false && (
                <Elements options={options} stripe={stripePromise}>
                    <PaymentForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}

            {loading && <div className="w-full h-full flex justify-center items-center">
                <p>Loading...</p>
            </div>}
            {error && <div className="w-full h-full flex justify-center items-center">
                <p>Something went wrong</p>
            </div>}

            {paymentSuccess && <div className="w-full h-full flex justify-center items-center">
                <div>
                    <div className="text-teal-700 text-center py-2">
                        Thanh toán thành công
                    </div>
                    <div className="text-teal-800 text-center">
                        <Button
                            label="Xem đơn hàng"
                            onClick={() => router.push('/user/purchase')}
                        />
                    </div>
                </div>
            </div>}



        </div>
    )
}

export default PaymentClient

