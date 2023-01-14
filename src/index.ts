import Express from "express";
import "dotenv/config"
import "colors"

export const app = Express()

app.use(Express.json())

try {
    app.listen(process.env.PORT, () => {
        console.clear()
        console.log("[SISTEMA]".blue, `API online na porta ${process.env.PORT} 🚀`)
    })
} catch (err) {
    console.log("[SISTEMA]".red, "Houve um erro ao iniciar a API! \n", err)
}

import "./routes/router"