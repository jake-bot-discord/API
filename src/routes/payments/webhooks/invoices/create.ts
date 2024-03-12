import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { customerModel } from "../../../../database/schemas/customerSchema";
const stringPath = z.string()

export const create = async (app: FastifyInstance, req: any, rep: FastifyReply, event: any) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })

    try {
        const webhookData = event.data.object
    
        const stripeCustomer: any = await Stripe.customers.retrieve(stringPath.parse(webhookData.customer))
        const paymentIntent: any = await Stripe.paymentIntents.retrieve(stringPath.parse(webhookData.payment_intent))
    
        const billingObj = {
            transactionId: `${webhookData.id}`,
            createdAt: `${webhookData.created}`,
            updatedAt: `${Date.now()}`,
            status: `${paymentIntent.status}`,
            price: `${paymentIntent.amount}`
        }
    
        await customerModel.findOneAndUpdate({$or: [{"customerId": `${webhookData.customer}`}, { "email": `${webhookData.customer_email}` }] }, {
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
            },
    
            $push: {
                "billing": billingObj
            }
        })
    
        console.log(paymentIntent)
    
        return rep.status(200).send("ok")
    } catch(err) {
        console.log(err)

        return rep.status(500).send(err)
    }
}