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
    paymentsData: {
        customer: {
            name: { type: String, default: null },
            id: { type: String, default: null },
            surname: { type: String, default: null },
            birthDate: { type: String, default: null },
            cpf: { type: String, default: null },
            phone: {type: String, default: null}
        },
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
    },
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

