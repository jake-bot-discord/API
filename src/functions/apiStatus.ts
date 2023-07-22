import { EmbedBuilder, WebhookClient } from "discord.js";

export const apiStatusOn = () => {
    const webhookClient = new WebhookClient({ url: `${process.env.APISTATUS_WEBHOOK}` });

    const readyApiEmbed = new EmbedBuilder()
        .setColor("#ffc400")
        .setTitle(`API iniciada!`)
        .setDescription(`A API do Jake foi iniciada com sucesso!`)
        .addFields(
            {
                name: "<:JakeRelogio:1027332951932928170> Horario",
                value: `↳ <t:${Math.floor(Date.now() / 1000)}:R>`,
            },

        )
        .setThumbnail("https://jakecdn.discloud.app/images/bot/satelite.png")
        .setFooter({ text: "API Jake-Bot", iconURL: "https://jakecdn.discloud.app/images/bot/satelite.png" })


    webhookClient.send({
        username: "Monitor - API",
        avatarURL: "https://jakecdn.discloud.app/images/bot/satelite.png",
        embeds: [readyApiEmbed.toJSON()]
    })
}