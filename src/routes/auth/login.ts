import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const stringPath = z.coerce.string()

export const login = (app: FastifyInstance, req: FastifyRequest, rep: FastifyReply) => {
    return rep.redirect(stringPath.parse(process.env.DISCORD_URL))
}