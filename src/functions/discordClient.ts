import {Client, GatewayIntentBits, Events} from "discord.js"

export const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, client => {
    console.log("[DISCORD]".red, `Conectado ao discord com o bot ${client.user.username}`)
})

client.login(process.env.DISCORD_BOT_TOKEN)