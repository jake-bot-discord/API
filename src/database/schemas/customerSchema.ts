import mongoose from "mongoose";

export interface customerModel {
    _id: String
    customerId: String,
    email: String,
    name: String,
    avatar: String
    accessToken: String,
    refreshToken: String
}

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, acquired: true },
    createdAt: { type: String, acquired: true },
    updatedAt: { type: String, acquired: true },
    status: { type: String, acquired: true },
    price: { type: String, acquired: true}
})

const customerSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    name: { type: String, default: null },
    customerId: { type: String, default: null },
    birthDate: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    banned: { type: Boolean, default: false },

    staff: {
        member: { type: Boolean, default: false },
        level: { type: String, default: "0" }
    },

    discord: {
        userId: { type: String, acquired: true },
        userName: { type: String, acquired: true },
        nickName: { type: String, acquired: true },
        images: {
            avatar: { type: String, default: null },
            banner: { type: String, default: null },
        },
        colors: {
            accentColor: { type: String, default: null },
            bannerColor: { type: String, default: null }
        },
        publicFlags: { type: String, default: null },
        premiumType: { type: String, default: null },
        mfaEnable: { type: Boolean, default: false },
        accessToken: { type: String, default: null },
        refreshToken: { type: String, default: null }
    },

    paymentsData: {
        address: {
            country: { type: String, default: null },
            state: { type: String, default: null },
            city: { type: String, default: null },
            zipCode: { type: String, default: null },
            addressLine_1: { type: String, default: null },
            addressLine_2: { type: String, default: null },
        },
    },

    preferences: {
        joinSupportGuild: { type: String, default: "show" }
    },

    subscription: {
        active: { type: Boolean, default: false },
        ID: { type: String, default: null },
        expires_at: { type: String, default: null }
    },

    billing: { type: Array, items: transactionSchema, uniqueItems: true }
})

export const customerModel = mongoose.model("customers", customerSchema)

