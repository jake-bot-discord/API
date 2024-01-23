import { FastifyInstance, FastifyReply } from "fastify";

export const session = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const sessionData = req.session.get("data")
    console.log(sessionData)

    if (!sessionData) {
        rep.status(404).send("Session not found")
    } else {
        rep.status(200).send(sessionData)
    }
}