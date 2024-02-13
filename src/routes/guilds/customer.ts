import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PartialGuild } from "../../utils/types/guild";

export const customer = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    try {
        const { updatedUserData: userData} = req.session.get("data")

        const { data } = await axios.get<PartialGuild[]>(`https://discord.com/api/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${userData.discord.accessToken}`
            }
        })

        if ( data ) {
            return rep.status(200).send(data)
        } else {
            return rep.status(500).send("Cannot get bot guilds")
        }
    } catch(err) {
        return rep.status(500).send("Cannot get bot guilds")
    }
}