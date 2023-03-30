import express, { json } from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import categoriesRoute from './routes/categories.js'
import clientOrder from "./routes/clientOrder.js"
import superAdmin from "./routes/superAdmin.js"
// import TelegramBot from 'node-telegram-bot-api'
// import User from "./models/User.js";

const PORT = process.env.PORT || 8080

//Middleware
const index = express()
index.use(cors())
dotenv.config()
index.use(express.json())
index.use(json({limit: '50mb'}))
index.use('/api/auth', authRoute)
index.use('/api/categories', categoriesRoute)
index.use('/api/client/', clientOrder)
index.use('/api/super-admin/', superAdmin)

// const token = process.env.TELEGRAM_BOT_TOKEN
// const bot = new TelegramBot(token, {polling: true})

async function start() {

	try {
		await mongoose.set("strictQuery", false)
		await mongoose.connect(process.env.MONGO_URL)
		index.listen(PORT, () => console.log('server started ' + PORT))

	} catch (e) {
		console.log(e)
	}
}

start()

// --------------------------------Telegram Bot-------------------------------------------------
// bot.onText(/\/echo (.+)/, (msg, match) => {
// 	const chatId = msg.chat.id
// 	const resp = match[1]
// 	bot.sendMessage(chatId, resp)
// });
//
// const builderHTMLShopInfo = (name, description) => {
// 	return `<strong>Open: ${name}</strong>
// 						<a href=https://client.theke.com.ua/${name}>${name}</a>
// 						<p>${description}</p>`
// }
//
// bot.on('message', async (msg) => {
// 	const chatId = msg.chat.id
// 	const text = msg.text
// 	const allShops = await User.find()
// 	// const shopNamesArr = allShops?.map(item => item?.shop_name)
// 	// const searchShopName = shopNamesArr?.filter(item => item === text)
// 	// console.log('------------------ shop names', shopNamesArr)
// 	if (text === ('hi' || 'hello')) await bot.sendMessage(chatId, `hello, ${msg.from.first_name} I am Theke bot and you nee enter command /start for look all shops list`)
//
// 	if (text === ('/start' || 'start')) {
// 		const html = `<pre>Show All Shops Theke:</pre>`
// 		await bot.sendMessage(chatId, html, {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: allShops.map(item => [{
// 						text: `${item.shop_name}`,
// 						web_app: {url: `https://client.theke.com.ua/${item.shop_name}`}
// 				}])
// 			}
// 		})
// 	}
// })
// ----------------------------------------------------------------------------------------
