import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "passport";
import "./src/utils/passport.js"
import cookieSession from "cookie-session";
import expressSession from 'express-session';
import pgSession from "connect-pg-simple";
import {dirname, join} from "path"
import { fileURLToPath } from "url"
import {router as authRoute} from "./src/routes/registerRoute.js"
import {router as taskRoute} from "./src/routes/taskRoute.js"
import {router as eventRoute} from "./src/routes/eventRoute.js"
import {router as habitRoute} from "./src/routes/habitRoute.js"
import {router as todoRoute} from "./src/routes/todoRoute.js"
import { notFound } from "./src/errors/notFoundError.js"
import { errorHandler } from "./src/errors/errorHandler.js"
import pool from "./src/database/db.js"
const _dirname  = dirname(fileURLToPath(import.meta.url))
app.use(express.json())
const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true
    }
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(morgan())
app.use(
    expressSession({
        // store:new (pgSession(expressSession))({
        //     pool:pool
        // }),
        secret:process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie:{secure: false}, //set true on https
        maxAge:parseInt(process.env.MAX_AGE)
    })
)
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.PORT || 5000
app.use(cookieParser())

app.use("/api/register", authRoute)
app.use("/api/task", taskRoute)
app.use("/api/event", eventRoute)
app.use("/api/habit", habitRoute)
app.use("/api/todo", todoRoute)


app.use(notFound)
app.use(errorHandler)
const start = async () => {
    await console.log(pool.options)
    app.listen(port, () => {
        console.log(`app is listening to port ${port}`)
    })
}
start()