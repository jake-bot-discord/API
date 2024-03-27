import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod"
import { SubscriptionCreate } from "./subscription/create";
import { SubscriptionUpdate } from "./subscription/update";
import { SubscriptionDelete } from "./subscription/delete";
import { CustomerCreate } from "./customer/create";
import { CustomerDelete } from "./customer/delete";
import { CustomerUpdate } from "./customer/update";
const stringPath = z.string()

export const handler = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const event = req.body

    const eventCase: any = {
        "customer.created": CustomerCreate, 
        "customer.deleted": CustomerDelete, 
        "customer.updated": CustomerUpdate, 
        "customer.subscription.created": SubscriptionCreate,
        "customer.subscription.updated": SubscriptionUpdate,
        "customer.subscription.deleted": SubscriptionDelete,
    }

    if ( event.type ) return eventCase[event.type](app, req, rep, event)

    return rep.status(200).send("ok")
}