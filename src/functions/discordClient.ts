import {Client, GatewayIntentBits, Events} from "discord.js"

export const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, client => {})

client.login(process.env.DISCORD_BOT_TOKEN)