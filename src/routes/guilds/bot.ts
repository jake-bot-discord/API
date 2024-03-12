import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest, errorCodes } from "fastify";
import { PartialGuild } from "../../utils/types/guild";

export const bot = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    try {
        const { data } = await axios.get<PartialGuild[]>(`https://discord.com/api/users/@me/guilds`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        })

        if ( data ) {
            return rep.status(200).send(data)
        } else {
            return rep.status(500).send("Cannot get bot guilds")
        }
    } catch(err) {
        console.log(err)
        return rep.status(500).send(err)
    }
}