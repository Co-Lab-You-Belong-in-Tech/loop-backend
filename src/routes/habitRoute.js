import express from "express"
const router = express.Router()
import { trycatchHandler } from "../utils/trycatchHandler.js"
import habitController from "../controllers/habitController.js"

router.post("/add", trycatchHandler(habitController.addHabit))
router.get("/", trycatchHandler(habitController.getAllHabit))
router.delete("/", trycatchHandler(habitController.deleteAllHabit))
router.put("/:habitId", trycatchHandler(habitController.updateHabit))
router.delete("/:habitId", trycatchHandler(habitController.deleteHabit))
router.get("/:habitId", trycatchHandler(habitController.getHabit))

export {router}