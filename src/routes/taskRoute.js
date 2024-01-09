import express from "express"
const router = express.Router()
import { trycatchHandler } from "../utils/trycatchHandler.js"
import addTaskController from "../controllers/taskController.js"

router.post("/add", trycatchHandler(addTaskController.addTask))
router.get("/", trycatchHandler(addTaskController.getAllTask))
router.delete("/", trycatchHandler(addTaskController.deleteAllTask))
router.put("/:taskId", trycatchHandler(addTaskController.updateTask))
router.delete("/:taskId", trycatchHandler(addTaskController.deleteTask))
router.get("/:taskId", trycatchHandler(addTaskController.getTask))

export {router}