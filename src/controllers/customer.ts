import { customerModel } from "../database/schemas/customerSchema"

export const customerController = async (userData: any, discordData: any) => {
    const updatedUserData = await customerModel.findOneAndUpdate({ _id: userData.id }, {
        $set: {
            "email": userData.email,
            "discord.userId": userData.id,
            "discord.userName": userData.username,
            "discord.nickName": userData.global_name,
            "discord.avatar": userData.avatar,
            "discord.publicFlags": userData.public_flags,
            "discord.premiumType": userData.premium_type,
            "discord.mfaEnable": userData.mfa_enable,
            "discord.accessToken": discordData.access_token,
            "discord.refreshToken": discordData.refresh_token
        }
    }, { returnNewDocument: true, upsert: true, returnDocument: "after" })

    return { updatedUserData }
}