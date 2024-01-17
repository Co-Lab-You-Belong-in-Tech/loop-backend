import express from "express"
const router = express.Router()
import { trycatchHandler } from "../utils/trycatchHandler.js"
import habitController from "../controllers/habitController.js"

router.post("/add", trycatchHandler(habitController.addHabit))
router.get("/", trycatchHandler(habitController.getAllHabit))
router.delete("/", trycatchHandler(habitController.deleteAllHabit))
router.put("/:taskId", trycatchHandler(habitController.updateHabit))
router.delete("/:taskId", trycatchHandler(habitController.deleteHabit))
router.get("/:taskId", trycatchHandler(habitController.getHabit))

export {router}