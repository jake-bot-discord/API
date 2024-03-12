import { FastifyInstance, FastifyReply } from "fastify";
import { succeededPayment } from "../../../controllers/stripe/customer";
import stripe from "stripe"
import { z } from "zod"
import { create } from "./invoices/create";
const stringPath = z.string()

export const handler = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })
    const event = req.body

    console.log(event.type)

    if (event.type) {
        if(event.type == "invoice.created") return create(app, req, rep, event)
    }

    // switch (event.type) {
    //     case 'payment_intent.succeeded': 
    //         const paymentIntent = event.data

    //         const stripeCustomer: any = await Stripe.customers.retrieve(paymentIntent.customer)

    //         console.log(stripeCustomer)
    //     break;
    // }

    return rep.status(200).send("ok")
}