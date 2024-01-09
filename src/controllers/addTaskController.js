import pool from "../database/db.js"
import { NotFoundError } from "../errors/customError.js"

const addTask = async (req,res,next) => {
const task = await pool.query('INSERT INTO add_task (task_title,description,estimated_time,category_color,category_type,new_category,task_priority) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *')
if(!task.rows.length) return next(new NotFoundError("Task not added"))
res.status(201).json({task})
}

export default{
    addTask
}