import { app } from "../index";
import { readFileSync } from "fs"
import { formater } from "../util/formater";
import { APIAttachment, APIEmbed, Attachment, AttachmentBuilder, AttachmentPayload, BufferResolvable, JSONEncodable, WebhookClient } from "discord.js";
import { Stream } from "node:stream";

app.get('/', (req, res) => {
    res.status(200)
    res.send("Hello world!")
});

app.route('/itemdata')
    .get((req, res) => {
        if (req.headers.authorization !== process.env.ITEMS_PASSWORD)
            return res.status(401).send('Acesso negado!')

        const data = JSON.parse(readFileSync('./src/default/seeds.json').toString())

        return res.status(200).send(data)
    });

app.post('/sharderror', (req, res) => {
    // if (req.headers.authorization !== process.env.WEBHOOKS_PASSWORD)
    //     return res.status(401).send('Acesso negado!')

    return formater(req.body, res)
})

