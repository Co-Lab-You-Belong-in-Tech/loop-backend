import pool from "../database/db.js"
import { NotFoundError } from "../errors/customError.js"

const addTask = async (req,res,next) => {
    const task = await pool.query('INSERT INTO task (task_title,description,estimated_time,category_color,category_type,new_category,task_priority) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *')
    if(!task.rows.length) return next(new NotFoundError("Task not added"))
    res.status(201).json({task})
}
const updateTask = async (req,res,next) => {
        const {taskId} = req.params
        const {task_title,description,estimated_time,category_color,category_type,new_category,task_priority} = req.body
        const task = await pool.query('UPDATE task SET task_title = $1,description = $2,estimated_time = $3,category_color = $4,category_type = $5,new_category =$6,task_priority =$7 WHERE taskId = $8 RETURNING *',[task_title,description,estimated_time,category_color,category_type,new_category,task_priority,taskId])
        if(!task.rows.length) return next(new NotFoundError("Task not added"))
        res.status(201).json({task})
}

const getAllTask = async (req,res,next) => {
    const task = await pool.query("SELECT * FROM task")
    if(!task.rows.length) return next(new NotFoundError("There are no task"))
    res.status(200).json({task})
}
const getTask  = async (req,res,next) => {
    const {taskId} = req.params
    const task = await pool.query('SELECT FROM task WHERE task_id = $1',[taskId])
    if(!task.rows.length) return next(new NotFoundError("There is no task"))
    res.status(200).json({task})
}

const deleteTask =  async (req,res,next) => {
    const {taskId} = req.params
    const task = await pool.query('DELETE FROM task WHERE task_id = $1',[taskId])
    if(!task.rows.length) return next(new NotFoundError("There is no task"))
    res.status(200).json({data:`Task with id:${taskId} has been deleted`})
}

const deleteAllTask =  async (req,res,next) => {
    const task = await pool.query('DELETE * FROM task')
    if(!task.rows.length) return next(new NotFoundError("There is no task"))
    res.status(200).json({data:`Tasks have been deleted`})
}

export default{
    addTask,
    updateTask,
    getAllTask,
    getTask,
    deleteTask,
    deleteAllTask
}