import { readFileSync } from "node:fs"

export const itemdata = (req: any, res: any) => {
    const documentRequired = req.headers.data
    
    let data
    try {
        data = JSON.parse(readFileSync(`./src/default/${documentRequired}.json`).toString())
    } catch(err) {
        return res.status(404).send("File not found")
    }

    return res.status(200).send(data)
}