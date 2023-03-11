import { app } from "../index";
import { formater } from "../util/formater";
import { itemdata } from "./itemdata";
import { HostTurnOff, HostTurnOn } from "./host";
import { Maintenance } from "./maintenance";

app.get('/', (req, res) => {
    res.status(200)
    res.send("Hello world!")
});

app.route('/itemdata')
    .get((req, res) => {
        if (req.headers.authorization !== process.env.ITEMS_PASSWORD)
            return res.status(401).send('Acesso negado!')

        return itemdata(req, res)
    });

app.post('/sharderror', (req, res) => {
    if (req.headers.authorization !== process.env.WEBHOOKS_PASSWORD)
        return res.status(401).send('Acesso negado!')

    return formater(req.body, res)
})

app.post('/host/ligar', (req, res) => {
    if (req.headers.authorization !== process.env.HOST_PASSWORD)
        return res.status(401).send('Acesso negado!')

    return HostTurnOn(req, res)
})

app.post('/host/desligar', (req, res) => {
    if (req.headers.authorization !== process.env.HOST_PASSWORD)
        return res.status(401).send('Acesso negado!')

    return HostTurnOff(req, res)
})

app.route('/maintenance')
    .post((req, res) => {
        if (req.headers.authorization !== process.env.MAINTENANCE_PASSWORD)
            return res.status(401).send('Acesso negado!')

        return Maintenance(req, res, "post")
    })
    .get((req, res) => {
        if (req.headers.authorization !== process.env.MAINTENANCE_PASSWORD)
            return res.status(401).send('Acesso negado!')

        return Maintenance(req, res, "get")
    })
