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

const customerSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    name: { type: String, default: null },
    customerId: { type: String, default: null },
    birthDate: { type: String, default: null },
    cpf: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },

    discord: {
        userId: { type: String, acquired: true },
        userName: { type: String, acquired: true },
        nickName: { type: String, acquired: true },
        avatar: { type: String, default: null },
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

        subscription: {
            id: { type: String, default: null },
        }
    }
})

export const customerModel = mongoose.model("customers", customerSchema)

