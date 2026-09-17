
import mongoose from "mongoose";
const connectToDB = async () => {
    const MONGO_URL = process.env.DB_URL_MONGODB

    try {
        if (!MONGO_URL) throw new Error("Mongo url is undefined")
        const db = await mongoose.connect(MONGO_URL)
        console.log("mongodb connected successfully");

    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}

export default connectToDB
