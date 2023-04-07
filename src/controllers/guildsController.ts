import { Request, Response } from "express";
import { getBotGuildsService, getUserGuildsService } from "../services/guildsService";
import { userModel } from "../database/schemas/userSchema";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as userModel

    try {
        const { data } = await getBotGuildsService()

        const { data: userGuilds } = await getUserGuildsService(user.id)
        
        res.send({
            botGuilds: data,
            userGuilds: userGuilds
        })
    } catch(err) {
        console.log(err)
        
        res.status(400).send("Error")
    }
}