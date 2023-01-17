import express, { json } from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'

import authRoute from './routes/auth.js'
import categoriesRoute from './routes/categories.js'
import clientOrder from "./routes/clientOrder.js"


const PORT = process.env.PORT || 8080

//Middleware
const index = express()
index.use(cors())
dotenv.config()
index.use(express.json())
index.use(json({ limit: '50mb' }))
index.use('/api/auth', authRoute)
index.use('/api/categories', categoriesRoute)
index.use('/api/link', clientOrder)
async function start() {
	try {
		await mongoose.set("strictQuery", false)
		await mongoose.connect(process.env.MONGO_URL)
		index.listen(PORT, () => console.log('server started ' + PORT))
	} catch (e) {
		console.log(e)
	}
}

console.log("start")
start()