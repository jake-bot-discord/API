import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { developers } from "./developers";

export const users = (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {

    app.get("/developers", (req: FastifyRequest, rep: FastifyReply) => developers(app, req, rep))
    
    done()
}   