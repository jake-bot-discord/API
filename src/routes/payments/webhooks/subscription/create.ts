import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { customerModel } from "../../../../database/schemas/customerSchema";
import VipsJson from "../../../../mocks/vips.json"
const stringPath = z.string()

export const SubscriptionCreate = async (app: FastifyInstance, req: any, rep: FastifyReply, event: any) => {
    try {
        const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
            apiVersion: "2023-10-16",
        })
    
        const vipsArray = Object.entries(VipsJson)
    
        const EventData = event.data.object
    
        const Customer: any = await Stripe.customers.retrieve(EventData.customer)
        const SignaturePlan = EventData.plan.nickname.split(" ")[4]
        const Plan = vipsArray.find(vipObj => vipObj[1].name == SignaturePlan)
    
        if ( Plan ) {
            await customerModel.findOneAndUpdate({ "email": `${Customer.email}` }, {
                $set: {
                    "subscription.active": "1",
                    "subscription.ID": EventData.id,
                    "subscription.expires_at": EventData.current_period_end,
                    "subscription.vipType": `${Plan[0]}`
                }
            })
        } else {
            return rep.status(500).send("Cannot find selected plan")
        }
        
        return rep.status(200).send("Ok")
    } catch(err) {
        return rep.status(500).send(`${err}`)
    }
}