import 'dotenv/config'
import express from "express"
import connectToDB from './db';
import { boolean } from 'zod';
import cors from "cors"
import morgan from "morgan"
import { ok } from './utils/envelope';
import { notFound } from "./middleware/notFound"
import { errorHandler } from './middleware/errorHandler';




async function mainEntryFunction() {
    await connectToDB()
    const app = express()
    const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
        .split(",").map(origin => origin.trim()).filter(boolean)

    app.use(
        cors({
            origin: corsOrigins,
            credentials: true
        })
    )

    app.use(express.json())
    app.use(morgan("dev"))
    app.get("/health", (_req, res) => {
        res.status(200).json(ok({ message: "server is healthy/running" }))
    })

    app.use(notFound)
    app.use(errorHandler)

    const port: number = Number(process.env.PORT || 5000)

    app.listen(port, () => {
        console.log("server is now listening to port", port)
    })
}

mainEntryFunction().catch(err => {
    console.log("failed to start", err)
    process.exit(1)
})