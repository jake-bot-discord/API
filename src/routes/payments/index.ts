import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { sessionMiddleware } from "../../functions/middleware"
import { checkout } from "./checkout";
import { success } from "./success";

export const payments = (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    // app.addHook('preHandler', (req, rep) => sessionMiddleware(req, rep, done))

    app.get("/checkout", (req: FastifyRequest, rep: FastifyReply) => checkout(app, req, rep))
    app.get("/success", (req: FastifyRequest, rep: FastifyReply) => success(app, req, rep))
    
    done()
}   