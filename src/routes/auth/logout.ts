import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


export const logout = (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const sessionData = req.session.get("data")

    if ( sessionData ) {
        req.session.delete()

        return rep.status(200).send("User successfully logged out")
    } else {
        return rep.status(404).send("Session not found")
    }
}