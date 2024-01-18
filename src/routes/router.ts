import { app } from "../index";
import { formater } from "../util/formater";
import { HostTurnOff, HostTurnOn } from "./host";

app.get('/', (req, res) => {
    res.status(200)
    res.send("Hello world!")
});

app.post('/sharderror', (req, res) => {
    return formater(req.body, res)
})

app.post('/host/ligar', (req, res) => {
    return HostTurnOn(req, res)
})

app.post('/host/desligar', (req, res) => {
    return HostTurnOff(req, res)
})