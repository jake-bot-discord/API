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
    married: {
        with: { type: String, default: null },
        marryDate: { type: Number, default: 0 },
        stats: { type: Boolean, default: false }
    },
    warns: {
        preferencesMessage: { type: Boolean, default: false }
    },
    preferences: {
        paymentWarn: { type: Boolean, default: false },
    }
})

export const userModel = mongoose.model("users", userSchema)

