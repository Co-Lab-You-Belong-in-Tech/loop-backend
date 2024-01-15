import express from "express"
const router = express.Router()
import { trycatchHandler } from "../utils/trycatchHandler.js"
import eventController from "../controllers/eventController.js"

router.post("/add", trycatchHandler(eventController.addEvent))
router.get("/", trycatchHandler(eventController.getAllEvent))
router.delete("/", trycatchHandler(eventController.deleteAllEvent))
router.put("/:taskId", trycatchHandler(eventController.updateEvent))
router.delete("/:taskId", trycatchHandler(eventController.deleteEvent))
router.get("/:taskId", trycatchHandler(eventController.getEvent))

export {router}