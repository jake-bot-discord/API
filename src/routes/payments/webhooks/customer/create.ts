import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { customerModel } from "../../../../database/schemas/customerSchema";
const stringPath = z.string()

export const CustomerCreate = async (app: FastifyInstance, req: any, rep: FastifyReply, event: any) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })

    const customerEmail = event.data.object.email
    const customerId = event.data.object.id
    const customer: any = await Stripe.customers.retrieve(customerId)

    try {
        await customerModel.findOneAndUpdate({ "email": `${customerEmail}` }, {
            $set: {
                "customerId": customerId,
                "address.country": customer.address.country,
                "address.state": customer.address.state,
                "address.city": customer.address.city,
                "address.zipCode": customer.address.postal_code,
                "address.addressLine_1": customer.address.line1,
                "address.addressLine_2": customer.address.line2,
                "phone": customer.phone,
                "name": customer.name
            }
        })

        return rep.status(200).send("ok")
    } catch (err) {
        return rep.status(500).send(`${err}`)
    }
}