import Categories from "../models/Categories.js"
import Products from "../models/Products.js"
import User from "../models/User.js"
import { nodeMailer } from "../utils/nodemailer.js"

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
		// res.json({data: {error: {message: 'Error for download category'}}})
		res.json({shop: null})
		// res.redirect('/')
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
export const getAllShops = async (req,
	res) => {
	try {
		const allShops = await User.find()
		const list = allShops.map(item => {
			const newArr = new Object()
			newArr.shop_name = item.shop_name
			newArr.description = item.description
			newArr.image_logo = item.image_logo
			return newArr
		})
		const arr = [...list]

		res.json({
			arrShopsList: arr
		})

	} catch (e) {
		res.json({error: {message: 'Error download shops list'}})
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
			shop_name,
			city,
			address,
			comment_message,

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
				shop_name,
				city,
				address,
				comment_message,
			})

			res.json({message: 'Your order has been transferred to the seller, he will contact you shortly.'})
		}
	} catch (e) {
		res.json({error: {message: 'Error send form'}})
	}
}