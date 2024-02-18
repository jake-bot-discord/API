import { guildModel } from "../database/schemas/guildSchema"

export const guildController = async (guildData: any) => {
    const updatedGuildData = await guildModel.findOneAndUpdate({ _id: guildData.id }, {
        $set: {
            "name": guildData.name,
            "owner": guildData.owner,
            "locale": guildData.region,
            "systemChannel": guildData.system_channel_id,
            "premiumTier": guildData.premium_tier ,
            "images.icon": guildData.icon, 
            "images.banner": guildData.banner,
        }
    }, { returnNewDocument: true, upsert: true, returnDocument: "after" })

    return updatedGuildData 
}