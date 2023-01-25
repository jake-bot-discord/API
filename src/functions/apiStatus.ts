import { EmbedBuilder, WebhookClient } from "discord.js";

export const apiStatusOn = () => {
    const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1067903741325492254/h-weqvX-cd9UtSMK1XCIfnHFBM842d-D19GH4hs8mQ4mfM5Ix94Zt5Ny0vX0Lz5DB18p' });

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
        .setThumbnail("https://jakebot.com.br/images/api/satelite.png")
        .setFooter({ text: "API Jake-Bot", iconURL: "https://jakebot.com.br/images/api/satelite.png" })


    webhookClient.send({
        username: "Monitor - API",
        avatarURL: "https://jakebot.com.br/images/api/satelite.png",
        embeds: [readyApiEmbed.toJSON()]
    })
}