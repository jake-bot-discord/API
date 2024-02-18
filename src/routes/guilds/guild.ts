import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PartialGuild } from "../../utils/types/guild";
import { guildModel } from "../../database/schemas/guildSchema";
import { guildController } from "../../controllers/guild";

export const guild = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    try {
        const { headers: reqHeaders } = req

        const { data: guildRes } = await axios.get(`https://discord.com/api/guilds/${reqHeaders.guildid}?with_counts=true`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        })

        const guildData = await guildController(guildRes)

        return rep.status(200).send({database: guildData, discord: guildRes})
    } catch(err) {
        console.log(err)
        return rep.status(500).send("Cannot get guild data")
    }
}