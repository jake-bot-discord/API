import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { login } from "./login";
import { callback } from "./callback";
import { session } from "./session";

export const auth = (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
   app.get("/login", (req: FastifyRequest, rep: FastifyReply) => login(app, req, rep))

   app.get("/callback", (req: any, rep: FastifyReply) => callback(app, req, rep))

   app.get("/session", (req: any, rep: FastifyReply) => session(app, req, rep))

    done()
}