import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { handler } from "./webhooks/index";

export const webhooks = async (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    app.post("/", (req: FastifyRequest, rep: FastifyReply) => handler(app, req, rep))
}