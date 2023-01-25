import axios from "axios";
import { discloud } from "discloud.app"

export async function HostTurnOn(req: any, res: any) {
    const hostStatus = await discloud.apps.status(`${process.env.DISCLOUD_BOT_ID}`)

    if (hostStatus.container == "Online") {
        return res.status(502).send("O Jake ja está online.")
    }

    try {
        discloud.apps.start(`${process.env.DISCLOUD_BOT_ID}`)
            .then(() => {
                res.status(200).send("O Jake foi iniciado com sucesso!")
            })
    } catch(err) {
        return res.status(500).send("Houve um erro ao iniciar o Jake")
    }
}

export async function HostTurnOff(req: any, res: any) {
    const hostStatus = await discloud.apps.status(`${process.env.DISCLOUD_BOT_ID}`)

    if (hostStatus.container == "Offline") {
        return res.status(502).send("O Jake ja está ofline.")
    }

    try {
        discloud.apps.stop(`${process.env.DISCLOUD_BOT_ID}`)
            .then(() => {
                res.status(200).send("O Jake foi desligado com sucesso!")
            })
    } catch(err) {
        return res.status(500).send("Houve um erro ao desligar o Jake")
    }
}