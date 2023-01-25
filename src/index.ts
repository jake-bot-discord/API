import { discloudVerifier } from "./functions/discloudStatus";
import { discloud } from "discloud.app"
import Express from "express";
import "dotenv/config"
import "colors"

export const app = Express()

app.use(Express.json())

discloud.login(process.env.DISCLOUD_API_TOKEN).then(() => console.log("[DISCLOUD]".blue, "Conectado a discloud"))

try {
    app.listen(process.env.PORT, () => {
        console.clear()
        console.log("[SISTEMA]".blue, `API online na porta ${process.env.PORT} 🚀`)
        discloudVerifier()
        import("./functions/discordClient")
    })
} catch (err) {
    console.log("[SISTEMA]".red, "Houve um erro ao iniciar a API! \n", err)
}

import "./routes/router"
