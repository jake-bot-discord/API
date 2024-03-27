import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { invoices } from "./invoices";
import { sessionMiddleware } from "../../../functions/middleware";
import { subscription } from "./subscription";

export const retrieve = async (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    app.addHook('preHandler', (req, rep) => sessionMiddleware(req, rep, done))

    app.get("/invoices", (req: FastifyRequest, rep: FastifyReply) => invoices(app, req, rep))
    app.get("/subscription", (req: FastifyRequest, rep: FastifyReply) => subscription(app, req, rep))
}