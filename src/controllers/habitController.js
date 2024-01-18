import pool from "../database/db.js"
import { NotFoundError } from "../errors/customError.js"

const addHabit = async (req,res,next) => {
    const {habit_title, habit_icon, repeats_on, start_date, reminder_toggle, reminder_time} = req.body
    console.log("body",req.body)
    console.log("query",pool.query)
    const habit = await pool.query('INSERT INTO habits (habit_title, habit_icon, repeats_on, start_date, reminder_toggle, reminder_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[habit_title, habit_icon, repeats_on, start_date, reminder_toggle, reminder_time])
    if(!habit.rows.length) return next(new NotFoundError("habit not added"))
    res.status(201).json({data:habit.rows})
}

const updateHabit = async (req,res,next) => {
        const {habitId} = req.params
        const {habit_title, habit_icon, repeats_on, start_date, reminder_toggle, reminder_time} = req.body
        const habit = await pool.query('UPDATE events SET habit_title = $1,habit_icon = $2,repeats_on = $3,start_date = $4,reminder_toggle = $5,reminder_time =$6 WHERE habit_id = $7 RETURNING *',[habit_title, habit_icon, repeats_on, start_date, reminder_toggle, reminder_time,habitId])
        console.log("event",habit.rows)
        if(!habit.rows.length) return next(new NotFoundError("Habit not updated"))
        res.status(201).json({data:habit.rows})
}

const getAllHabit = async (req,res,next) => {
    const habit = await pool.query("SELECT * FROM habits")
    if(!habit.rows.length) return next(new NotFoundError("There are no event"))
    res.status(200).json({data:habit.rows})
}
const getHabit  = async (req,res,next) => {
    const {habitId} = req.params
    const habit = await pool.query('SELECT * FROM habits WHERE habit_id = $1',[habitId])
    console.log("event",habit.rows)
    if(!habit.rows.length) return next(new NotFoundError("There is no habit"))
    res.status(200).json({data:habit.rows})
}

const deleteHabit =  async (req,res,next) => {
    const {habitId} = req.params
    const habit = await pool.query('DELETE FROM habits WHERE habit_id = $1',[habitId])
    if(!habit.rowCount === 0) return next(new NotFoundError("There is no habit"))
    res.status(200).json({data:`Habit with id:${event} has been deleted`})
}

const deleteAllHabit =  async (req,res,next) => {
    const habit = await pool.query('DELETE FROM habits')
    if(!habit.rowCount === 0) return next(new NotFoundError("There is no habit"))
    res.status(200).json({data:`Habits have been deleted`})
}

export default{
    addHabit,
    updateHabit,
    getAllHabit,
    getHabit,
    deleteHabit,
    deleteAllHabit
}