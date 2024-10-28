


import useCart from "@/hooks/useCart"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { formatPrice } from "@/utils/util"
import Heading from "@/app/components/Heading"
import Button from "@/app/components/Button"
import handleApiCall from "@/services/handleApiCall"
import useAxiosAuth from "@/hooks/useAxiosAuth"

interface CheckoutFormProps {
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void
}

const PaymentForm: React.FC<CheckoutFormProps> = ({
    clientSecret,
    handleSetPaymentSuccess
}) => {
    const { paymentIntent,handleSetPaymentIntent } = useCart()
    const axios = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)
    const elements = useElements()
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0')
    const listProductCarts = JSON.parse(localStorage.getItem('listProductCarts') || '[]')
    const stripe = useStripe()

    const{} = useCart()

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }
        handleSetPaymentSuccess(false)
    }, [stripe, clientSecret, handleSetPaymentSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true); // Bắt đầu quá trình thanh toán

        try {
            const result = await stripe.confirmPayment({
                elements,
                redirect: 'if_required',
            });

            if (result.error) {
                toast.error(result.error.message || "Payment failed");
            } else {



                // Gọi API tạo đơn hàng
                const resData = await handleApiCall(axios.post('/order/create', {
                    feeShip: 30000,
                    totalPrice: parseInt(totalPrice) + 1, // Dòng này có thể cần điều chỉnh
                    orderProducts: listProductCarts,
                    payment: {
                        paymentMethod: 'CREDIT_CARD',
                        paymentStatus: 'COMPLETED',
                    }
                }));
                console.log("resData", resData);


                if (resData) {
                    console.log("create order success", resData);
                    toast.success('Thanh toán thành công');
                    handleSetPaymentSuccess(true);
                    handleSetPaymentIntent(null);
                    console.log("paymentIntent", paymentIntent);
                    
                }
            }
        } catch (error) {
            toast.error("An error occurred during payment.");
            console.error(error);
        } finally {
            setIsLoading(false); // Dừng quá trình loading
        }
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Nhập thông tin thẻ" />
            </div>
            <AddressElement
                options={{
                    mode: "shipping",
                    allowedCountries: ["VN"],
                }}
            />

            <h2 className="font-semibold mt-4 mb-2">Thông tin thanh toán</h2>

            <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />

            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Tổng: {formatPrice(totalPrice)}
            </div>

            <Button
                label={isLoading ? "Processing..." : "Thanh toán"}
                disabled={isLoading || !stripe || !elements}
                onClick={() => { }}
            />
        </form>
    )
}

export default PaymentForm;

