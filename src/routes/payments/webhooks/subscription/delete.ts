import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { customerModel } from "../../../../database/schemas/customerSchema";
const stringPath = z.string()

export const SubscriptionDelete = async (app: FastifyInstance, req: any, rep: FastifyReply, event: any) => {
    try {
        const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
            apiVersion: "2023-10-16",
        })
    
        const EventData = event.data.object
        const Customer: any = await Stripe.customers.retrieve(EventData.customer)
    
        if ( Customer ) {
            await customerModel.findOneAndUpdate({ "email": `${Customer.email}` }, {
                $set: {
                    "subscription.active": "0",
                    "subscription.ID": null,
                    "subscription.expires_at": null,
                    "subscription.vipType": null
                }
            })
        } else {
            return rep.status(500).send("Cannot find customer")
        }
    
        return rep.status(200).send("ok")
    } catch(err) {
        return rep.status(500).send(`${err}`)
    }
}