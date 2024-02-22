import { FastifyInstance, FastifyReply } from "fastify";
import { customerModel } from "../../database/schemas/customerSchema";

export const developers = async (app: FastifyInstance, req: any, rep: FastifyReply) => {
    const developersArray = await customerModel.find({"staff.level": "1"})

    console.log(developersArray)

    if (developersArray.length == 0) {
        return rep.status(404).send("Developers not found")
    }
    
    return rep.status(200).send(developersArray)
}