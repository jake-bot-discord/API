import axios from "axios"
import { EmbedBuilder, WebhookClient } from "discord.js"

export let hostStatus: any

export async function discloudVerifier() {
    console.log("[STATUS]".blue, `Iniciando api de status na porta ${process.env.PORT} 🚀`)

    setInterval(async () => {
        const discloudStatus = await axios.get("https://api.discloud.app/v2/app/1674608474006/status",
            {
                headers: {
                    "api-token": process.env.DISCLOUD_API_TOKEN
                }
            }
        ).catch(() => {})

        hostStatus = discloudStatus

        const webhookClient = new WebhookClient({
            url: `${process.env.STATUSCHAT_WEBHOOK}`
        })

        if (discloudStatus?.data.apps.container == "Online") {
            const statusEmbed = new EmbedBuilder()
                .setColor("#66cd00")
                .setTitle("O Jake está online e a todo vapor!")
                .setDescription("Atualmente o Jake está online e a todo vapor! Caso tenha algum problema, reporte-o em <#974474382154010644>")
                .addFields(
                    {
                        name: "<:JakeRelogio:1027332951932928170> Atualizado:",
                        value: `↳ <t:${Math.floor(Date.now() / 1000)}:R>`,
                        inline: true
                    },
                    {
                        name: "<:JakeDescricao:995541712543957082> Status:",
                        value: `↳ Operante`,
                        inline: true
                    }
                )
                .setThumbnail("https://jakebot.com.br/images/api/satelite.png")
                .setFooter({
                    text: "Jake Bot",
                    iconURL: "https://jakebot.com.br/images/iconJake.png"
                })

            await webhookClient.editMessage(`${process.env.STATUS_MESSAGE_ID}`, {
                content: "<:JakeSirene:995848952312254536> O status do Jake é atualizado a cada 30 segundos, você pode se informar sobre ele neste chat! \n\n ||@everyone|@here||",
                embeds: [statusEmbed.toJSON()]
            })

        } else {
            const statusEmbed = new EmbedBuilder()
                .setColor("#e03131")
                .setTitle("O Jake está ocupado no momento!")
                .setDescription("Atualmente o Jake está ocupado arrumando a casa e se preparando para atende-los! Caso tenha algum problema, reporte-o em <#974474382154010644>")
                .addFields(
                    {
                        name: "<:JakeRelogio:1027332951932928170> Atualizado:",
                        value: `↳ <t:${Math.floor(Date.now() / 1000)}:R>`,
                        inline: true
                    },
                    {
                        name: "<:JakeDescricao:995541712543957082> Status:",
                        value: `↳ Em manutenção`,
                        inline: true
                    }
                )
                .setThumbnail("https://jakebot.com.br/images/api/satelite.png")
                .setFooter({
                    text: "Jake Bot",
                    iconURL: "https://jakebot.com.br/images/iconJake.png"
                })

            await webhookClient.editMessage(`${process.env.STATUS_MESSAGE_ID}`, {
                content: "<:JakeSirene:995848952312254536> O status do Jake é atualizado a cada 30 segundos, você pode se informar sobre ele neste chat! \n\n ||@everyone|@here||",
                embeds: [statusEmbed.toJSON()]
            })
        }
    }, 1000 * 30)
}