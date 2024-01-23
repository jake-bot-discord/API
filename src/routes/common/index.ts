import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"

export const common = async (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    app.get("/ping", async (req: FastifyRequest, rep: FastifyReply) => {
        rep.send("Pong! 🏓")
    })

    done()
}