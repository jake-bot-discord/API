import mongoose from "mongoose"

mongoose.connect(`${process.env.MONGOOSE_DATABASE_URL}`)

mongoose.set('strictQuery', false)