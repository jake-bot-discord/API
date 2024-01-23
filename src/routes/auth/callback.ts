import axios from "axios";
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { customerController } from "../../controllers/customer";
import { PartialUser } from "../../utils/types/user";

const stringPath = z.string()

type Request = FastifyRequest<{
    Querystring: { code: string },
}>

export const callback = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const { code } = req.query

    if (code) {
        const formData = new URLSearchParams({
            client_id: stringPath.parse(process.env.BOT_ID),
            client_secret: stringPath.parse(process.env.BOT_SECRET),
            grant_type: "authorization_code",
            code: code.toString(),
            redirect_uri: `${process.env.BASE_URL}/auth/callback`
        })

        const { data } = await axios.post(`${process.env.DISCORD_BASE_URL}/oauth2/token`, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        if (data) {
            const { token_type, access_token, expires_in, refresh_token, scope } = data

            const userData = await axios.get<PartialUser>(`${process.env.DISCORD_BASE_URL}/users/@me`, {
                headers: {
                    "Authorization": `${token_type} ${access_token}`
                }
            })

            const customerData = await customerController(userData.data, data)

            console.log(customerData)

            req.session.set("data", customerData)
            req.session.options({maxAge: 1000 * 60 * 60 * 24})

            return rep.status(200).send("Ok")
        } else {
            return rep.status(500).send("Cannot get user data")
        }

    } else {
        return rep.status(404).send("Token not found")
    }
}