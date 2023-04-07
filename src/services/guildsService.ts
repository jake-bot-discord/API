import axios from "axios";
import { userModel } from "../database/schemas/userSchema";
import { PartialGuild } from "../util/types";

export async function getUserGuildsService(id: String) {
    const user = await userModel.findById({ _id: id })

    if (!user) throw new Error('No user found')

    return axios.get<PartialGuild[]>(`${process.env.DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
}

export async function getBotGuildsService() {
    return axios.get<PartialGuild[]>(`${process.env.DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
    })
}