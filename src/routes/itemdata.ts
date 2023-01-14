import { readFileSync } from "node:fs"

export const itemdata = (req: any, res: any) => {
    const documentRequired = req.headers.data
    
    const data = JSON.parse(readFileSync(`./src/default/${documentRequired}.json`).toString())

    return res.status(200).send(data)
}