import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { customerModel } from "../../../../database/schemas/customerSchema";
const stringPath = z.string()

export const CustomerDelete = async (app: FastifyInstance, req: any, rep: FastifyReply, event: any) => {
    const EventData = event.data.object
    const customerEmail = EventData.email

    try {
        await customerModel.findOneAndUpdate({ "email": `${customerEmail}` }, {
            $set: {
                "customerId": null,
                "subscription.active": "0",
                "subscription.ID": null,
                "subscription.expires_at": null,
                "subscription.vipType": null
            }
        })

        return rep.status(200).send("ok")
    } catch (err) {
        return rep.status(500).send(`${err}`)
    }    
}