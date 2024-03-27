import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { InvoiceType } from "../../../utils/types/invoices";
const stringPath = z.string()

export const subscription = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })

    try {
        const { updatedUserData: userData } = req.session.get("data")

        console.log(userData)
        
        return rep.status(200).send(userData.subscription)
    } catch (err) {
        return rep.status(504).send(err)
    }
}