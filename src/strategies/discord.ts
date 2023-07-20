import passport from "passport"
import { Profile, Strategy } from "passport-discord"
import { VerifyCallback } from "passport-oauth2"
import { userModel } from "../database/schemas/userSchema"

passport.serializeUser((user: any, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userModel.findById({_id: id})

        return user ? done(null, user) : done(null, null)
    } catch(err) {
        console.log(err)

        return done(err, null)
    }
})

passport.use(
    new Strategy({
        clientID: `${process.env.DISCORD_BOT_ID}`,
        clientSecret: `${process.env.DISCORD_BOT_SECRET}`,
        callbackURL: `${process.env.DISCORD_REDIRECT_URI}`,
        scope: ['identify', 'email', 'guilds']
    }, async (
        accessToken: String,
        refreshToken: String,
        profile: Profile,
        done: VerifyCallback
    ) => {
        const { id, username, email, avatar } = profile

        try {
            const existingUserData = await userModel.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        "accessToken": accessToken,
                        "avatar": avatar,
                        "refreshToken": refreshToken,
                        "name": username,
                        "email": email
                    }
                },
                {
                    new: true
                }
            )

            if (existingUserData) return done(null, existingUserData)

            const newUserData = new userModel({
                _id: id,
                email: email,
                accessToken: accessToken,
                refreshToken: refreshToken,
                avatar: avatar
            })

            const savedNewUser = await newUserData.save()

            return done(null, savedNewUser)
        } catch(err: any) {
            console.log(err)
            return done(err, undefined)
        }
    })
)