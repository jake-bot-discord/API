import { FastifyReply } from "fastify"

export const sessionMiddleware = async ( req: any, rep: FastifyReply, done: () => void ) => {
    const session  = req.session.get("data")

    if ( session ) {
        done()
    } else {
        return rep.status(401).send("User must be logged in")
    }
}