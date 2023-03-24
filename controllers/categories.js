import Categories from "../models/Categories.js"
import User from "../models/User.js"
import Products from "../models/Products.js"
import { dateStr } from "../utils/dateHelper.js";
// import { compareDate } from "../utils/compareDate.js";

export const createCategories = async (req,
	res) => {
	try {
		const {
			category_name,
			category_image
		} = req.body

		if (category_name !== "") {
			const newCategories = new Categories({
				user_id: req.userId,
				category_name,
				category_image
			})
			await newCategories.save()
			await User.findByIdAndUpdate(req.userId, {
				$push: {categories: newCategories}
			})

			res.json(newCategories)
		} else {
			res.json({message: 'Помилка щось пішло не так.'})
		}
	} catch (e) {
		res.json({message: 'Щось пішло не так.'})
	}
}

export const getCategories = async (req,
	res) => {
	try {
		const user = await User.findById(req.userId)
		// const userEnaDatePeriod = user?.end_date_paid_period
		// const tehDate = dateStr(new Date().toISOString(), 1)

		// const resDate = compareDate(tehDate, userEnaDatePeriod)
		// console.log(user.paid_subscription)


		const categoriesTeh = await Promise.all(
			user.categories.map((categories) => {
				return Categories.findById(categories._id)
			}))
		if (!categoriesTeh && user.paid_subscription === true) {
			return res.json({
				categories: [],
				message: 'У вас немає категорій'
			})
		}
		// if (!resDate) {
		// 	return res.json({payment: resDate})
		// }
		if (user.paid_subscription === true) {
			const categories = categoriesTeh.reverse()
			res.json({categories})
		} else {
			res.json({
				categories: [],
				message: {
					text: 'Треба сплатити за тарифами вашого пакету, щоб оновити роботу сервісу.' +
						' В коментарі вкажіть ваш email.',
					link: 'https://send.monobank.ua/jar/9ZNQ1g4Gz5'
				}
			})
		}

	} catch (e) {
		res.json({message: 'Щось пішло не так.'})
	}
}

export const updateCategoryName = async (
	req,
	res) => {
	try {
		const {
			category_name,
			category_image
		} = req.body
		if (category_name !== "") {
			const isCategoryName = await Categories.findById(req.params.id)
			isCategoryName.category_name = category_name
			isCategoryName.category_image = category_image

			await isCategoryName.save()

			res.json({
				isCategoryName,
				message: 'Оновлення назви категорії вдало завершено'
			})
		} else {
			res.json('Помилка оновлення назви категорії')
		}

	} catch (e) {
		res.json(e, {error: {message: 'Помилка оновлення назви категорії'}})
	}
}

export const deleteCategory = async (
	req,
	res) => {
	try {

		const data = await Categories.findByIdAndDelete(req.params.id)

		await Promise.all(
			data.category_list.map(item => {
				return Products.findByIdAndDelete(item._id)
			})
		)

		await User.findByIdAndUpdate(data.user_id, {
			$pull: {categories: req.params.id}
		})
		res.json({
			data,
			message: `Ви видалили категорію ${data.category_name}`
		})

	} catch (e) {
		res.json(e, {error: {message: 'Помилка видалення категорії, спробуйте пізніше'}})
	}
}