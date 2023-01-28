import metricsJson from "./metrics.json"
import { client } from "../functions/discordClient"
const fs = require("node:fs")

async function editMetricsData() {
    let metricsData = JSON.parse(JSON.stringify(metricsJson))

    const record = {
        "guilds": client.guilds.cache.size,
        "users": client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
        "date": Date.now()
    }

    metricsData["metrics"].push(record)

    fs.writeFileSync("./src/analytics/metrics.json", JSON.stringify(metricsData));
}

module.exports = { editMetricsData }