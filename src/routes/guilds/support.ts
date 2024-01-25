import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const support = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const { updatedUserData: data} =  req.session.get("data")

    if (!data) {
        return rep.status(404).send("Session not found")
    }

    try {
        const res = await axios.put(`https://discord.com/api/guilds/814906838940123157/members/${data.discord.userId}`, {
                access_token: data.discord.accessToken,
            },
            {            
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                }
            }
        )

        if (res.status = 204) {
            return rep.status(200).send("ok")
        } else {
            return rep.status(500).send("Internal error")
        }
        
    } catch (err) {
        return rep.status(500).send("Internal error")
    }
}