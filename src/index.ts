import { apiStatusOn } from "./functions/apiStatus";
import { discloudVerifier } from "./functions/discloudStatus";
import { discloud } from "discloud.app"
import { globalMiddleWare } from "./util/middleware";
import passport from "passport"
import session from "express-session"
import cors from "cors"
import Express from "express";
import store from "connect-mongo";
import "dotenv/config"
import "colors"

require("./strategies/discord")

require("dotenv").config()

export const app = Express()

app.use(Express.json())

app.use(Express.urlencoded())

app.use(cors({
    origin: [`${process.env.DEFAULT_URL}`],
    credentials: true
}))

app.use(
    session({
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 2
        },
        store: store.create({
            mongoUrl: process.env.MONGOOSE_DATABASE_URL
        })
    })
)

app.use(passport.initialize())

app.use(passport.session())

app.use(globalMiddleWare)

app.use(Express.static('public'))

discloud.login(process.env.DISCLOUD_API_TOKEN)

try {
    app.listen(process.env.PORT, () => {
        console.clear()
        
        console.log("✔".green, `API online na porta ${process.env.PORT} 🚀`)
                
        //descomentar quando for enviado para a discloud
        discloudVerifier()
            .catch(err => {
                console.log("❌".red, "Houve um erro ao iniciado o verificador de status do Jake")
                console.log("\n")
                console.log(err)
                return
            })
            .then(() => console.log("✔".green, `Verificador de status do Jake iniciado`))

        import("./functions/discordClient")
            .catch(err => {
                console.log("❌".red, "Houve um erro ao conectar com o discord")
                console.log("\n")
                console.log(err)
                return
            })
            .then(() => console.log("✔".green, `API conectada ao discord com sucesso`))

        import("./database/connect")
            .catch(err => {
                console.log("❌".red, "Houve um erro ao conectar com a database")
                console.log("\n")
                console.log(err)
                return
            })
            .then(() => console.log("✔".green, `API conectada a database com sucesso`))
    })
} catch (err) {
    console.log("i".red, "Houve um erro ao iniciar a API! \n", err)
}

import "./routes/router"

//enviando mensagem de aviso
apiStatusOn()