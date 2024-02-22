import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { support } from "./support";
import { bot } from "./bot";
import { customer } from "./customer";
import { guild } from "./guild";
import { sessionMiddleware } from "../../functions/middleware";


export const guilds = (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    app.addHook('preHandler', (req, rep) => sessionMiddleware(req, rep, done))

    app.get("/support", (req: FastifyRequest, rep: FastifyReply) => support(app, req, rep))
    
    app.get("/bot", (req: FastifyRequest, rep: FastifyReply) => bot(app, req, rep))
    
    app.get("/customer", (req: FastifyRequest, rep: FastifyReply) => customer(app, req, rep))

    app.get("/guild", (req: FastifyRequest, rep: FastifyReply) => guild(app, req, rep))

    done()
}   