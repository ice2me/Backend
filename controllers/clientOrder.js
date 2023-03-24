import Categories from "../models/Categories.js"
import Products from "../models/Products.js"
import User from "../models/User.js"
import { nodeMailer } from "../utils/nodemailer.js"
import { nodeMailerWithTotalCost } from "../utils/nodeMailerWithTotalCost.js"
import { telegramSendMessage } from "../utils/telegramSendMessage.js";

export const getCategoriesForLink = async (req,
	res) => {
	try {
		const shop = await User.findOne({shop_name: req.params.link})
		const categoriesTeh = await Promise.all(
			shop.categories.map((categories) => {
				return Categories.findById(categories._id)
			}))
		const categories = categoriesTeh.reverse()
		if (shop) {
			res.json({
				shop: shop,
				categories: categories
			})
		} else {
			res.redirect('/')
		}

	} catch (e) {
		res.json({shop: null})
	}
}
export const getProductClient = async (req,
	res) => {
	try {
		const categoryList = await Categories.findById(req.params.id)
		const itemsTeh = await Promise.all(
			categoryList.category_list.map((item) => {
				return Products.findById(item._id)
			}))

		if (!itemsTeh) {
			return res.json({message: 'У вас немає продуктів'})
		}

		let items = [...itemsTeh].sort((a, b) => a.available_product - b.available_product).reverse()

		res.json({
			items: items
		})
	} catch (e) {
		res.json({error: {message: 'Помилка завантаження продуктів, спробуйте пізніше'}})
	}
}
export const getAllShops = async (req,
	res) => {
	try {
		const allShops = await User.find()

		const list = allShops.map(item => {
			const newArr = new Object()
			newArr.shop_name = item.shop_name
			newArr.description = item.description
			newArr.image_logo = item.image_logo
			newArr.open_shop = item.open_shop
			newArr.variant_trading = item.variant_trading
			return newArr
		})

		const openShopFiltered = list.filter(item => item.open_shop === true)
		const arr = [...openShopFiltered]

		res.json({
			arrShopsList: arr
		})

	} catch (e) {
		res.json({error: {message: 'Помилка завантаження списку магазинів'}})
	}
}
export const postBasketFormClient = async (req,
	res) => {
	try {
		const {
			shop_id,
			shop_email,
			user_email,
			phone,
			username,
			items,
			shop_name,
			city,
			address,
			comment_message,
			calculate_total_cost,
		} = req.body
		const shop = !!await User.findById(shop_id)
		const totalAmount = items?.map(item => item?.total_price).reduce((prevValue, curValue) => prevValue + curValue, 0)

		if (shop && !calculate_total_cost) {
			nodeMailer({
				shop_email,
				items,
				phone,
				username,
				shop_name,
				city,
				address,
				comment_message,
				user_email,
			})
			await telegramSendMessage({
				shop_email,
				items,
				phone,
				username,
				shop_name,
				city,
				address,
				comment_message,
				user_email,
				shop_id
			})

			res.json({message: "Ваше замовлення передано продавцю, він зв'яжеться з вами найближчим часом💙💛"})
		} else {
			nodeMailerWithTotalCost({
				shop_email,
				items,
				phone,
				username,
				totalAmount,
				shop_name,
				city,
				address,
				comment_message,
				user_email,
			})
			await telegramSendMessage({
				shop_email,
				items,
				phone,
				username,
				totalAmount,
				shop_name,
				city,
				address,
				comment_message,
				user_email,
				shop_id
			})

			res.json({message: "Ваше замовлення передано продавцю, він зв'яжеться з вами найближчим часом 💙💛"})
		}



	} catch (e) {
		res.json({error: {message: 'Помилка надсилання форми'}})
	}
}