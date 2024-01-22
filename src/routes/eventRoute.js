import express from "express"
const router = express.Router()
import { trycatchHandler } from "../utils/trycatchHandler.js"
import eventController from "../controllers/eventController.js"

router.post("/add", trycatchHandler(eventController.addEvent))
router.get("/", trycatchHandler(eventController.getAllEvent))
router.delete("/", trycatchHandler(eventController.deleteAllEvent))
router.put("/:eventId", trycatchHandler(eventController.updateEvent))
router.delete("/:eventId", trycatchHandler(eventController.deleteEvent))
router.get("/:eventId", trycatchHandler(eventController.getEvent))

export {router}