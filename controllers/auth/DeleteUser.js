import User from "../../models/User.js"
import Products from "../../models/Products.js"

export const deleteUser = async (req,
	res) => {
	try {
		const user = await User.findById(req.userId)

		const itemsTeh = await Promise.all(
			user?.category_list.map((item) => {
				console.log(Products)
				// return Products.deleteMany(item._id)
			}))
		console.log(itemsTeh)
		res.json({
			message: 'Видалення користувача прошло успішно'
		})
	} catch (e) {
		res.json({
			error:
				{
					message: 'Цього користувача не існує'
				}
		})
	}
}