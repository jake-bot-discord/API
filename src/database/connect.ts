import mongoose from "mongoose"

mongoose.set('strictQuery', false)

mongoose.connect(`${process.env.MONGOOSE_DATABASE_URL}`)
