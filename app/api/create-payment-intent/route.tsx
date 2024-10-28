
import Stripe from 'stripe'
import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import handleApiCall from '@/services/handleApiCall'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
})

export async function POST(request: Request) {

    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { payment_intent_id } = body
        console.log('payment_intent_id: ', payment_intent_id);
        const totalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0')
        if (payment_intent_id) {
            const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
            console.log('current_intent: ', current_intent);

            if (current_intent) {
                const updated_intent = await stripe.paymentIntents.update(
                    payment_intent_id,
                    { amount: totalPrice }
                )
                return NextResponse.json({ paymentIntent: updated_intent })

            }

        } else {
            // Nếu không có payment_intent_id, tạo một Payment Intent mới
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalPrice,
                currency: 'vnd',
                automatic_payment_methods: { enabled: true }
            })
            return NextResponse.json({ paymentIntent: paymentIntent })
        }
    } catch (error) {
        // Nếu có lỗi xảy ra, ghi lỗi vào console và trả về lỗi 500
        console.error('Error creating payment intent:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
