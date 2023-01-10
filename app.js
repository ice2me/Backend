import express, { json } from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'

import authRoute from './routes/auth.js'
import categoriesRoute from './routes/categories.js'
import clientOrder from "./routes/clientOrder.js"


const PORT = process.env.PORT || 5000

//Middleware
const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())
app.use(json({ limit: '50mb' }))
app.use('/api/auth', authRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/link', clientOrder)


async function start() {
	try {
		await mongoose.set("strictQuery", false)
		await mongoose.connect(process.env.DB_URL)
		app.listen(PORT, () => console.log('server started ' + PORT))
	} catch (e) {
		console.log("Server error:", e.message)
		process.exit(1)
	}
}

start()