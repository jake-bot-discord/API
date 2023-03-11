import { EmbedBuilder, WebhookClient } from "discord.js";

export const apiStatusOn = () => {
    const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1083890487099936829/SJrv1FnjZf1DTJMCm3n4Zzk9rfE8eR0AWHfeidPLX0psPigj76DTgDYcKuGCJ0YV07BG' });

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
        .setThumbnail("https://jake-website-ybabyzinha.vercel.app/images/api/satelite.png")
        .setFooter({ text: "API Jake-Bot", iconURL: "https://jake-website-ybabyzinha.vercel.app/images/api/satelite.png" })


    webhookClient.send({
        username: "Monitor - API",
        avatarURL: "https://jake-website-ybabyzinha.vercel.app/images/api/satelite.png",
        embeds: [readyApiEmbed.toJSON()]
    })
}