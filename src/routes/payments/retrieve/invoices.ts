import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { InvoiceType } from "../../../utils/types/invoices";
const stringPath = z.string()

export const invoices = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })

    try {
        const { updatedUserData: userData } = req.session.get("data")

        const StripeInvoices = await Stripe.invoices.search({ query: `customer:"${userData.customerId}"` }).then(obj => obj.data)

        let invoices: InvoiceType[] = []

        if (StripeInvoices.length > 0) {
            StripeInvoices.map(obj => {
                invoices.push({
                    id: obj.id,
                    created: obj.created,
                    hosted_invoice_url: obj.hosted_invoice_url,
                    invoice_pdf: obj.invoice_pdf,
                    lines: stringPath.parse(obj.lines.data[0].description),
                    paid: obj.paid,
                    status: stringPath.parse(obj.status),
                    total: obj.total
                })
            })
        }


        console.log(invoices)

        return rep.status(200).send(invoices)
    } catch (err) {
        return rep.status(504).send(err)
    }
}