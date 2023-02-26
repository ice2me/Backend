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
			res.json({message: 'Error something went wrong.'})
		}
	} catch (e) {
		res.json({message: 'Something went wrong.'})
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
			return res.json({message: 'Your are don`t have categories'})
		}
		const categories = categoriesTeh.reverse()
		res.json({categories})
	} catch (e) {
		res.json({message: 'Something went wrong.'})
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
				message: 'Update Category name completed'
			})
		} else {
			res.json('Error for update Category name')
		}

	} catch (e) {
		res.json(e, {error: {message: 'Error for update Category name'}})
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
			message: `You deleted category ${data.category_name}`
		})

	} catch (e) {
		res.json(e, {error: {message: 'Error for delete category'}})
	}
}