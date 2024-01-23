import pool from "../database/db.js"
import { NotFoundError } from "../errors/customError.js"

const addTodo = async (req,res,next) => {
    const {todo_title,task_priority,notes} = req.body
    console.log("body",req.body)
    console.log("query",pool.query)
    const todo = await pool.query('INSERT INTO todos (todo_title,task_priority,notes) VALUES ($1,$2,$3) RETURNING *',[todo_title,task_priority,notes])
    if(!todo.rows.length) return next(new NotFoundError("todo not added"))
    res.status(201).json({data:todo.rows})
}

const updateTodo = async (req,res,next) => {
        const {todoId} = req.params
        const {todo_title,task_priority,notes} = req.body
        const todo = await pool.query('UPDATE todos SET todo_title = $1,task_priority = $2,notes = $3 WHERE todo_id = $4 RETURNING *',[todo_title,task_priority,notes,todoId])
        console.log("event",todo.rows)
        if(!todo.rows.length) return next(new NotFoundError("todo not updated"))
        res.status(201).json({data:todo.rows})
}

const getAllTodo = async (req,res,next) => {
    const todo = await pool.query("SELECT * FROM todos")
    if(!todo.rows.length) return next(new NotFoundError("There are no event"))
    res.status(200).json({data:todo.rows})
}
const getTodo  = async (req,res,next) => {
    const {todoId} = req.params
    const todo = await pool.query('SELECT * FROM todos WHERE event_id = $1',[todoId])
    console.log("event",todo.rows)
    if(!todo.rows.length) return next(new NotFoundError("There is no todo"))
    res.status(200).json({data:todo.rows})
}

const deleteTodo =  async (req,res,next) => {
    const {todoId} = req.params
    const todo = await pool.query('DELETE FROM todos WHERE event_id = $1',[todoId])
    if(!todo.rowCount === 0) return next(new NotFoundError("There is no task"))
    res.status(200).json({data:`Todo with id:${todo} has been deleted`})
}

const deleteAllTodo =  async (req,res,next) => {
    const todo = await pool.query('DELETE FROM events')
    if(!todo.rowCount === 0) return next(new NotFoundError("There is no todo"))
    res.status(200).json({data:`todos have been deleted`})
}

export default{
    addTodo,
    updateTodo,
    getAllTodo,
    getTodo,
    deleteTodo,
    deleteAllTodo
}