import express from "express"
const router = express.Router()
import { trycatchHandler } from "../utils/trycatchHandler.js"
import todoTaskController from "../controllers/todoController.js"

router.post("/add", trycatchHandler(todoTaskController.addTodo))
router.get("/", trycatchHandler(todoTaskController.getAllTodo))
router.delete("/", trycatchHandler(todoTaskController.deleteAllTodo))
router.put("/:todoId", trycatchHandler(todoTaskController.updateTodo))
router.delete("/:todoId", trycatchHandler(todoTaskController.deleteTodo))
router.get("/:todoId", trycatchHandler(todoTaskController.getTodo))

export {router}