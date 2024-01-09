import express from "express"
const router = express.Router()
import { trycatchHandler } from "../utils/trycatchHandler.js"
import addTaskController from "../controllers/addTaskController.js"

router.post("/", trycatchHandler(addTaskController.addTask))

export {router}