import pool from "../database/db.js"
import { NotFoundError } from "../errors/customError.js"

const addHabit = async (req,res,next) => {
    const {event_title,category_color,category_type,new_category,start_date,end_date,all_day,start_time,end_time} = req.body
    console.log("body",req.body)
    console.log("query",pool.query)
    const event = await pool.query('INSERT INTO events (event_title,category_color,category_type,new_category,start_date,end_date,all_day,start_time,end_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',[event_title,category_color,category_type,new_category,start_date,end_date,all_day,start_time,end_time])
    if(!event.rows.length) return next(new NotFoundError("event not added"))
    res.status(201).json({data:event.rows})
}

const updateHabit = async (req,res,next) => {
        const {eventId} = req.params
        const {event_title,category_color,category_type,new_category,start_date,end_date,all_day,start_time,end_time} = req.body
        const event = await pool.query('UPDATE events SET event_title = $1,category_color = $2,category_type = $3,new_category = $4,start_date = $5,end_date =$6,all_day =$7,start_time =$8,end_time =$9 WHERE event_id = $10 RETURNING *',[event_title,category_color,category_type,new_category,start_date,end_date,all_day,start_time,end_time,eventId])
        console.log("event",event.rows)
        if(!event.rows.length) return next(new NotFoundError("Event not updated"))
        res.status(201).json({data:event.rows})
}

const getAllHabit = async (req,res,next) => {
    const event = await pool.query("SELECT * FROM events")
    if(!event.rows.length) return next(new NotFoundError("There are no event"))
    res.status(200).json({data:event.rows})
}
const getHabit  = async (req,res,next) => {
    const {eventId} = req.params
    const event = await pool.query('SELECT * FROM events WHERE event_id = $1',[eventId])
    console.log("event",event.rows)
    if(!event.rows.length) return next(new NotFoundError("There is no event"))
    res.status(200).json({data:event.rows})
}

const deleteHabit =  async (req,res,next) => {
    const {eventId} = req.params
    const event = await pool.query('DELETE FROM events WHERE event_id = $1',[eventId])
    if(!event.rowCount === 0) return next(new NotFoundError("There is no task"))
    res.status(200).json({data:`Event with id:${event} has been deleted`})
}

const deleteAllHabit =  async (req,res,next) => {
    const event = await pool.query('DELETE FROM events')
    if(!event.rowCount === 0) return next(new NotFoundError("There is no event"))
    res.status(200).json({data:`events have been deleted`})
}

export default{
    addHabit,
    updateHabit,
    getAllHabit,
    getHabit,
    deleteHabit,
    deleteAllHabit
}