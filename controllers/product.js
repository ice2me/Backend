import Categories from "../models/Categories.js"
import Products from "../models/Products.js"

export const createProduct = async (req,
	res) => {
	try {
		const {category_id} = req.body
		const idCategory = await Categories.findById(category_id)
		const newItems = new Products({...req.body})
		await newItems.save()

		try {
			await Categories.findByIdAndUpdate(idCategory, {
				$push: {category_list: newItems._id}
			})
		} catch (e) {
			res.json({message: 'Щось пішло не так.'})
		}

		res.json({
			newItems,
			message: 'Створення продукту успішно завершено'
		})
	} catch (e) {
		res.json({message: 'Щось пішло не так, спробуйте пізніше'})
	}
}

export const getProduct = async (req,
	res) => {
	try {
		const categoryList = await Categories.findById(req.params.id)
		const itemsTeh = await Promise.all(
			categoryList.category_list.map((item) => {
				return Products.findById(item._id)
			}))

		if (!itemsTeh) {
			return res.json({message: 'У вас немає товарів'})
		}

		let items = [...itemsTeh].sort((a, b) => a.available_product - b.available_product).reverse()

		res.json(items)
	} catch (e) {
		res.json({message: 'Щось пішло не так, спробуйте пізніше'})
	}
}

export const updateProduct = async (
	req,
	res) => {
	try {
		const {
			image_product,
			name_product,
			description_product,
			unit_product,
			price_product,
			currency_product,
			available_product,
			category_id
		} = req.body

		const isCategoryProduct = await Products.findById(category_id)

		isCategoryProduct.image_product = image_product
		isCategoryProduct.name_product = name_product
		isCategoryProduct.description_product = description_product
		isCategoryProduct.unit_product = unit_product
		isCategoryProduct.price_product = price_product
		isCategoryProduct.currency_product = currency_product
		isCategoryProduct.available_product = available_product

		await isCategoryProduct.save()

		res.json({
			isCategoryProduct,
			message: 'Оновлення інформації про продукт вдало завершено'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Помилка оновлення продукту, спробуйте пізніше'}})
	}
}

export const updateAvailableCheckedProduct = async (
	req,
	res) => {
	try {
		const {
			available_product
		} = req.body
		const isAvailableProduct = await Products.findById(req.params.id)

		isAvailableProduct.available_product = available_product

		await isAvailableProduct.save()

		res.json({
			isAvailableProduct,
			message: 'Оновити доступний статус'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Помилка оновлення статусу продукту, спробуйте пізніше'}})
	}
}

export const deleteProduct = async (
	req,
	res) => {
	try {

		const data = await Products.findByIdAndDelete(req.params.id)

		await Categories.findByIdAndUpdate(data.category_id, {
			$pull: {category_list: req.params.id}
		})

		res.json({
			data,
			message: `Ви видалили картку товару ${data.name_product}`
		})

	} catch (e) {
		res.json(e, {error: {message: 'Помилка видаення картки товару, спробуйте пізніше'}})
	}
}
