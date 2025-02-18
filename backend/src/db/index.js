import mongoose from "mongoose"
import {DB_NAME} from "../utils/constant.js"

export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongodb connected DB host !! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Mongodb connection failed ${error.message}`)
    }
}