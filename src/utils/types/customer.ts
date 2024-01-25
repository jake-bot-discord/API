export type customerType = {
    _id: String
    name: String
    customerId: String
    birthDate: String
    cpf: String
    phone: String
    email: String

    discord: {
        userId: String
        userName: String
        nickName: String
        avatar: String
        publicFlags: String
        premiumType: String
        mfaEnable: Boolean
        accessToken: String
        refreshToken: String
    },

    paymentsData: {
        address: {
            country: String
            state: String
            city: String
            zipCode: String
            addressLine_1: String
            addressLine_2: String
        },

        subscription: {
            id: String
        }
    }
}