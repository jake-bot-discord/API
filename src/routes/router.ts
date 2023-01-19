import { app } from "../index";
import { formater } from "../util/formater";
import { itemdata } from "./itemdata";

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

// app.route('/host')
//     .post((req, res) => {
//         if (req.headers.authorization !== process.env.WEBHOOKS_PASSWORD)
//             return res.status(401).send('Acesso negado!')

        
//     })
