import mongoose from "mongoose";

export interface userModel {
    id: String,
    email: String,
    name: String,
    avatar: String
    accessToken: String,
    refreshToken: String
}

const userSchema = new mongoose.Schema({
    _id: { type: String, acquired: true },
    email: { type: String, acquired: true },
    name: { type: String, acquired: true },
    accessToken: { type: String, acquired: true },
    avatar: { type: String, default: null },
    refreshToken: { type: String, acquired: true },
    married: {
        with: { type: String, default: null },
        marryDate: { type: Number, default: 0 },
        stats: { type: Boolean, default: false }
    },
    vip: {
        style: { type: String, default: null },
        time: { type: Number, default: 0 },
        active: { type: Boolean, default: false }
    },
    warns: {
        preferencesMessage: { type: Boolean, default: false }
    },
    preferences: {
        paymentWarn: { type: Boolean, default: false },
    }
})

export const userModel = mongoose.model("users", userSchema)

