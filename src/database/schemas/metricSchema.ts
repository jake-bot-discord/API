import mongoose from "mongoose";

const metricSchema = new mongoose.Schema({
    date: Date,
    totalGuilds: Number,
    totalUsers: Number,
    metrics: Array
})

export default mongoose.model("Analytics", metricSchema)