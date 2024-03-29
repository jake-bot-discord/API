import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { InvoiceType } from "../../../utils/types/invoices";
import { customerModel } from "../../../database/schemas/customerSchema";
const stringPath = z.string()

export const subscription = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })

    try {
        const { updatedUserData: sessionData } = req.session.get("data")
        
        const user = await customerModel.findById({_id: sessionData._id})

        if( user ) {
            return rep.status(200).send(user.subscription)
        } else {
            return rep.status(504).send("Cannot find customer")
        }
    } catch (err) {
        return rep.status(504).send(err)
    }
}