import mongoose from "mongoose"

mongoose.set('strictQuery', false)

mongoose.connect(`${process.env.DATABASE_URL}`)
