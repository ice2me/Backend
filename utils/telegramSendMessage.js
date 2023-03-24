import TelegramBot from "node-telegram-bot-api"

export const telegramSendMessage = async (
	shop_email,
	items,
	phone,
	username,
	shop_name,
	city,
	address,
	comment_message,
	user_email,
	shop_id,
	res
) => {
	const token = process.env.TELEGRAM_BOT_TOKEN
	const bot = new TelegramBot(token, {polling: true})
	const id_chat = '-988270318'
	await bot.answerWebAppQuery(shop_id, {
		type: 'article',
		id: id_chat,
		title: 'Order',
		input_message_content: {
			message_text: '11111111111111111111'
		}
	});


	return res.json({message: "Ваше замовлення передано продавцю, він зв'яжеться з вами найближчим часом💙💛"})
}