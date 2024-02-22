import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PartialGuild } from "../../utils/types/guild";
import { z } from "zod";

const stringPath = z.string()

export const addCallback = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    return rep.status(302).redirect(`${stringPath.parse(process.env.APP_URL)}/dashboard/guilds`).send()
}