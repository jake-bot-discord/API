import { FastifyInstance, FastifyReply } from "fastify";
import stripe from "stripe"
import { z } from "zod";
import { customerModel } from "../../database/schemas/customerSchema";
import vipsJson from "../../mocks/vips.json"
const stringPath = z.string()

// http://localhost:8080/payments/checkout?vip=1&mode=subscription&userId=466808982330277910&time=1

export const checkout = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const Stripe = new stripe(stringPath.parse(process.env.STRIPE_SECRET_TOKEN), {
        apiVersion: "2023-10-16",
    })

    const userId = req.query.userId
    const purchaseMode = req.query.mode
    const selectedVipId: any = req.query.vip
    const duration = req.query.time    
    const vipsArray = Object.entries(vipsJson)
    const selectedVip = vipsArray.find(obj => obj[0] == selectedVipId)

    const user = await customerModel.findById({_id: userId})
    
    if ( selectedVip && user ) {
        const stripeConfig = {
            line_items: [{
                price: purchaseMode == "subscription" ? selectedVip[1].stripe.signature : selectedVip[1].stripe.single,
                quantity: duration
            }],
    
            client_reference_id: user._id,
            
            ...(!user.customerId ? { customer_email: user.email } : { customer: user.customerId }),
            
            allow_promotion_codes: true,
            billing_address_collection: "required",
    
            phone_number_collection: {
                enabled: true
            },
    
            consent_collection: {
                terms_of_service: "required",
            },
            mode: purchaseMode == "subscription" ? "subscription" : "payment",
    
            success_url: `${process.env.BASE_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}&discordId=${user._id}&vip=${selectedVipId}&type=${purchaseMode == "signature" ? "subscription" : "payment"}`,
            cancel_url: `${process.env.APP_URL}/planos`
        }

        const session = await Stripe.checkout.sessions.create(stripeConfig as any)

        if ( session ) {
            return rep.status(302).redirect(session.url as string).send()
        } else {
            return rep.status(500).send("Internal error")
        }
    }

    return rep.status(500).send("Internal error")
}