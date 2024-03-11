import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { customerModel } from "../../database/schemas/customerSchema";
import vipsJson from "../../mocks/vips.json"
const stringPath = z.string()

export const success = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })

    const checkoutSessionId = req.query.session_id
    const checkoutSession = await Stripe.checkout.sessions.retrieve(checkoutSessionId)
    const stripeCustomer: any = await Stripe.customers.retrieve(stringPath.parse(checkoutSession.customer))
    const userId = req.query.discordId

    console.log(checkoutSession)
    
    if ( checkoutSessionId && checkoutSession && stripeCustomer && userId ) {
        const userData = await customerModel.findByIdAndUpdate({_id: userId}, {
            $set: {
                "name": stripeCustomer.name,
                "phone": stripeCustomer.phone,
                "customerId": stripeCustomer.id,
                "paymentsData.address.country": stripeCustomer.address.country,
                "paymentsData.address.state": stripeCustomer.address.state,
                "paymentsData.address.city": stripeCustomer.address.city,
                "paymentsData.address.zipCode": stripeCustomer.address.postal_code,
                "paymentsData.address.addressLine_1": stripeCustomer.address.line1,
                "paymentsData.address.addressLine_2": stripeCustomer.address.line2,
            }
        })

        // if (checkoutSession.payment_status == "paid") {}

        return rep.status(302).redirect(`${process.env.APP_URL}/checkout/complete`).send({stripeCustomer, checkoutSession})
    }

    return rep.status(500).send("internal error")
}