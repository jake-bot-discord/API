import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
    date: {type: Number},
    status: {type: String, default: "functional"},
    _id: {type: String, acquired: true, default: "maintenance"},
})

export default mongoose.model("bot_configs", maintenanceSchema)