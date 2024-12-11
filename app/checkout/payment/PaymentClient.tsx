'use client'

import useCart from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from "./PaymentForm"
import Button from "../../components/common/Button"
import handleApiCall from "@/services/handleApiCall"
import useAxiosAuth from "@/hooks/useAxiosAuth"
import LoadingComponent from "@/app/components/common/LoadingComponent"
import OrderSuccess from "@/app/components/checkout/OrderSuccess"

interface PaymentClientProps {
    listProductCarts: any,
    totalPrice: number
    feeShip: number
    note: string | null
}

const PaymentClient: React.FC<PaymentClientProps> = ({ listProductCarts, totalPrice, feeShip, note }) => {
    const axiosAuth = useAxiosAuth();
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
    const router = useRouter()
    const { paymentIntent, handleSetPaymentIntent } = useCart()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)


    useEffect(() => {


        setLoading(true)
        setError(false)
        const getClientSecret = async () => {
            const response = await handleApiCall(axiosAuth.post('/payment/create-payment-intent', {
                feeShip,
                totalPrice: totalPrice,
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
                    <PaymentForm
                        note={note}
                        feeShip={feeShip}
                        totalPrice={totalPrice}
                        listProductCarts={listProductCarts}
                        clientSecret={clientSecret}
                        handleSetPaymentSuccess={handleSetPaymentSuccess}
                    />
                </Elements>
            )}

            {loading && <LoadingComponent />}
            {error && <div className="w-full h-full flex justify-center items-center">
                <p>Something went wrong</p>
            </div>}

            {paymentSuccess && !loading && <OrderSuccess />}



        </div>
    )
}

export default PaymentClient

