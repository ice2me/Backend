import Categories from "../models/Categories.js"
import User from "../models/User.js"
import Products from "../models/Products.js"

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

		const categoriesTeh = await Promise.all(
			user.categories.map((categories) => {
				return Categories.findById(categories._id)
			}))
		if (!categoriesTeh) {
			return res.json({message: 'У вас немає категорій'})
		}
		const categories = categoriesTeh.reverse()
		res.json({categories})
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