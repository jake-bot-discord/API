import mongoose from "mongoose";
import { string } from "zod";

export interface membersObj {
    quantity: String,
    dateOfRegister: String
}

const guildSchema = new mongoose.Schema({
    _id: String,
    name: String,
    owner: String,
    locale: String,
    systemChannel: String,
    premiumTier: String,
    images: {
        icon: String,
        banner: String
    },
    permissionRoles: {
        ban: Array,
        unban: Array,
        kick: Array,
        mute: Array,
    },
    logs: {
        ban: { active: Boolean, chatId: String },
        unBan: { active: Boolean, chatId: String },
        kick: { active: Boolean, chatId: String },
        mute: { active: Boolean, chatId: String },
        chatCreate: { active: Boolean, chatId: String },
        chatDelete: { active: Boolean, chatId: String },
    },
    banConfigs: {
        privateMessages: Boolean,
        handBan: Boolean,
    },
    members: Array
})

export const guildModel = mongoose.model("guilds", guildSchema)

