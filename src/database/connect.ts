import mongoose from "mongoose"

mongoose.connect(`${process.env.MONGOOSE_DATABASE_URL}`).then(() => console.log("[DATABASE]".green, "Database conectada"))