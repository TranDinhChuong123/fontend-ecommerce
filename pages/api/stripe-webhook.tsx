
import { buffer } from "micro";

import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const buff = await buffer(req)
    const sig = req.headers['stripe-signature']

    if (!sig) {
        return res.status(400).send('No signature')
    }

    try {
        // Xác thực sự kiện từ Stripe
        const event: Stripe.Event = stripe.webhooks.constructEvent(
            buff,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET! as string
        );
        console.log('Event received:', event);
        // Xử lý sự kiện từ Stripe
        switch (event.type) {
            case 'charge.succeeded':
                // Xử lý sự kiện charge.succeeded
                const charge: any = event.data.object as Stripe.Charge;
                console.log('charge:', charge);

                if (charge) {
                    await prisma?.order.update({
                        where: { paymentIntentId: charge.payment_intent },
                        data: {
                            status: 'succeeded',
                            address: charge.shipping?.address
                        }
                    })
                    console.log('Charge succeeded123:', charge);
                }
                console.log('Charge succeeded:', charge);
                break;
            default:
                console.warn(`Unhandled event type ${event.type}`);
        }

        // Trả về phản hồi thành công
        res.status(200).json({ received: true });
    } catch (err: any) {
        console.error('Webhook Error:', err);
        // Trả về lỗi 400 nếu có lỗi xác thực
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}

export default handler
