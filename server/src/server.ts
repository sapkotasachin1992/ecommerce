import dotenv from "dotenv"
import connectToDB from "./db";
dotenv.config()
connectToDB()

import express from "express"
const app = express()



app.listen(8000, () => {
    console.log("node server started successfully")
})
