import { Request, Response } from "express"
import ms from "ms"
import maintenanceSchema from "../database/schemas/maintenanceSchema"

export const Maintenance = async (req: Request, res: Response, type: any) => {
    if (type == "get") {
        let maintenanceData = await maintenanceSchema.findById("maintenance")

        if (!maintenanceData) {
            new maintenanceSchema({
                date: Date.now(),
                status: "functional",
                _id: "maintenance",
            }).save().then(async () => {
                maintenanceData = await maintenanceSchema.findById("maintenance")
            })
        }

        res.status(200).send({
            "status:": maintenanceData?.status,
            "date": maintenanceData?.date
        })
    }

    if (type == "post") {
        const setType = req.body.status
        const time: String = req.body.time
        const requestedBy = req.body.requester

        if (!setType) return res.status(400).send("Forneça um metodo valido")

        let maintenanceData = await maintenanceSchema.findById("maintenance")

        if (!maintenanceData) {
            new maintenanceSchema({
                date: Date.now(),
                status: "functional",
                _id: "maintenance",
            }).save().then(async () => {
                maintenanceData = await maintenanceSchema.findById("maintenance")
            })
        }

        if (setType == "on") {
            if (!time) return res.status(400).send("Forneça um tempo valido")

            const maintenanceTime = Math.floor(Date.now() + ms(`${time}`))

            if (maintenanceData?.status == "maintenance") return res.status(400).send("O Jake ja está em manutenção!")

            await maintenanceSchema.findByIdAndUpdate("maintenance", {
                "date": maintenanceTime,
                "status": "maintenance"
            })

            console.log("i".blue, `O jake foi colocado em manutenção via ${requestedBy} durante ${time}`)

            return res.status(200).send(`O Jake foi colocado em manutenção durante ${time}`)
        }

        if (setType == "off") {

            if (maintenanceData?.status == "functional") return res.status(400).send("O Jake não esta em manutenção")

            await maintenanceSchema.findByIdAndUpdate("maintenance", {
                "status": "functional"
            })

            console.log("i".blue, `O jake foi removido do modo de manutenção via ${requestedBy}`)

            return res.status(200).send(`O Jake foi removido do modo de manutenção`)
        }
    }
}