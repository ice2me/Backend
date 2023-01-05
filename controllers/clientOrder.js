import Categories from "../models/Categories.js"
import Products from "../models/Products.js"
import User from "../models/User.js"
import { nodeMailer } from "../utils/nodemailer.js"

export const getCategoriesForLink = async (req,
	res) => {
	try {
		const shop = await User.find({shop_name: req.params.link})
		const categoriesTeh = await Promise.all(
			shop[0].categories.map((categories) => {
				return Categories.findById(categories._id)
			}))
		const categories = categoriesTeh.reverse()

		res.json({
			shop: shop,
			categories: categories
		})
	} catch (e) {
		res.json({error: {message: 'Error for download category'}})
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
			return res.json({message: 'Your are don`t have items'})
		}

		let items = [...itemsTeh].sort((a, b) => a.available_product - b.available_product).reverse()

		res.json({
			items: items
		})
	} catch (e) {
		res.json({error: {message: 'Error download products'}})
	}
}
export const postBasketFormClient = async (req,
	res) => {
	try {
		const {
			shop_id,
			shop_email,
			phone,
			username,
			items,
			shop_name

		} = req.body

		const shop = !!await User.findById(shop_id)
		const totalAmount = items?.map(item => item?.total_price).reduce((prevValue, curValue) => prevValue + curValue, 0)

		if (shop) {
			nodeMailer({
				shop_email,
				items,
				phone,
				username,
				totalAmount,
				shop_name
			})

			res.json({message: 'Your order has been transferred to the seller, he will contact you shortly.'})
		}
	} catch (e) {
		res.json({error: {message: 'Error send form'}})
	}
}