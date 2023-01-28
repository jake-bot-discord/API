const { editMetricsData } = require("./editData")
import { client } from "../functions/discordClient"
import fs from "node:fs"
const metricsJson = require("./metrics.json")
const cron = require("node-cron")
import metricModel from "../database/schemas/metricSchema"

export async function Metrics() {
    console.log("[ANALYTICS]".blue, "Iniciando as metricas")

    //iniciando o coletor de dados
    setInterval(async () => {
        await editMetricsData()
    }, 1000 * 60 * 60)

    const defaultRelatoryData = {
        "date": 0,
        "totalGuilds": 0,
        "totalUsers": 0,
        "metrics": [
        ]
    }

    const task = cron.schedule(
        '0 0 * * * *',
        async () => {
            let metricsData = JSON.parse(JSON.stringify(metricsJson))

            metricsData["date"] = Date.now()
            metricsData["totalGuilds"] = client.guilds.cache.size,
            metricsData["totalUsers"] = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

            const metric = await metricModel.create(metricsData)

            await fs.writeFileSync("./src/default/relatory.json", JSON.stringify(defaultRelatoryData));
        },
        {
            scheduled: true,
            timezone: "America/Sao_Paulo"
        }
    )

    await task.start()
}

module.exports = { Metrics }