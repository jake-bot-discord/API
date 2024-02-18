import { build } from "./app"
import { z } from "zod"
import "colors"

require("dotenv").config()

const portSchema = z.coerce.number()

const app = build({ logger: false });

app.listen(portSchema.parse(process.env.PORT) || 8080, "0.0.0.0", (err, address) => {
    console.clear()
    console.log("⏰".green, "Iniciando os processos da API")

    if (err) {
        console.log("❌".red, "Houve um erro ao tentar iniciar a API")
        console.log(err)
        process.exit(1)
    } else {
        console.log("✔".green, `API iniciada com sucesso na porta ${process.env.PORT || 8080}!`)
    }
})