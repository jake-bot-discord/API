import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { checkout } from "./checkout";
import { success } from "./success";
import { webhooks } from "./webhooks";

export const payments = (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    app.get("/checkout", (req: FastifyRequest, rep: FastifyReply) => checkout(app, req, rep))
    app.get("/success", (req: FastifyRequest, rep: FastifyReply) => success(app, req, rep))
    
    app.register(webhooks, { prefix: "/webhooks"})
    
    done()
}