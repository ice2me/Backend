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
			res.json({message: 'Something went wrong!!'})
		}

		res.json({
			newItems,
			message: 'Product creation completed successfully'
		})
	} catch (e) {
		res.json({message: 'Something went wrong.'})
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
			return res.json({message: 'Your are don`t have items'})
		}

		let items = [...itemsTeh].sort((a, b) => a.available_product - b.available_product).reverse()

		res.json(items)
	} catch (e) {

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
			message: 'Update Product info completed'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Error for update product'}})
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
			message: 'Update Available status'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Error for update product'}})
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
			message: `You deleted product card ${data.name_product}`
		})

	} catch (e) {
		res.json(e, {error: {message: 'Error for update product'}})
	}
}