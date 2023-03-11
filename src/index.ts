import { apiStatusOn } from "./functions/apiStatus";
import { discloudVerifier } from "./functions/discloudStatus";
import { discloud } from "discloud.app"
import Express from "express";
import "dotenv/config"
import "colors"

export const app = Express()

app.use(Express.json())

discloud.login(process.env.DISCLOUD_API_TOKEN)

try {
    app.listen(process.env.PORT, () => {
        console.clear()

        console.log("✔".green, `API online na porta ${process.env.PORT} 🚀`)

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

        Metrics()
            .catch(err => {
                console.log("❌".red, "Houve um erro ao iniciar as métricas do Jake")
                console.log("\n")
                console.log(err)
                return
            })
            .then(() => console.log("✔".green, "Metricas iniciadas com sucesso"))
    })
} catch (err) {
    console.log("i".red, "Houve um erro ao iniciar a API! \n", err)
}

import "./routes/router"
import { Metrics } from "./analytics";

//enviando mensagem de aviso
apiStatusOn()