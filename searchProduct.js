import User from "./models/User.js";
import Categories from "./models/Categories.js";
import Products from "./models/Products.js";
import { compareArrays } from "./utils/compareArrays.js";

export const searchProduct = async (
	req,
	res) => {
	try {
		const searchNameProduct = req.query?.product_name
		const userId = req.query?.user_id
		const isShop = await User.findById(userId)
		const searchedArrProducts = []
		const tehR = []
		const categoriesTeh = await Promise.all(
			isShop?.categories.map((categories) => {
				return Categories.findById(categories._id)
			}))

		let affTehProductList = []
		let allProducts = []
		for (let i = 0; i < categoriesTeh.length; i++) {
			affTehProductList = await Promise.all(
				categoriesTeh[i].category_list.map(item => Products.findById(item))
			)
			affTehProductList.map(item => {
				allProducts.push(item)
			})
		}

		tehR.push(searchNameProduct?.trim().toLocaleLowerCase())

		allProducts.forEach((product) => {
			const productNamesList = []
			productNamesList.push(product?.name_product.trim().toLowerCase())
			if (compareArrays(productNamesList, tehR)) {
				return searchedArrProducts.push(product);
			}
			return searchedArrProducts
		})

		res.json(searchedArrProducts)
	} catch (e) {
		res.json({message: 'Щось пішло не так, спробуйте пізніше'})
	}
}
export const searchProductTag = async (
	req,
	res) => {
	try {
		const searchNameProduct = req.query?.product_name
		const userId = req.query?.user_id
		const isShop = await User.findById(userId)
		const searchedArrProducts = []
		const tehR = []
		const productNamesList = []

		const categoriesTeh = await Promise.all(
			isShop?.categories.map((categories) => {
				return Categories.findById(categories._id)
			}))

		let affTehProductList = []
		let allProducts = []
		for (let i = 0; i < categoriesTeh.length; i++) {
			affTehProductList = await Promise.all(
				categoriesTeh[i].category_list.map(item => Products.findById(item))
			)
			affTehProductList.map(item => {
				allProducts.push(item)
			})
		}

		tehR.push(searchNameProduct?.trim().toLocaleLowerCase())

		allProducts.forEach((product) => {
			const filterAvailable = product.available_product ? product?.name_product.trim().toLowerCase() : ''
			productNamesList.push(filterAvailable)
			if (compareArrays(productNamesList, tehR)) {
				return searchedArrProducts.push(product);
			}
			return searchedArrProducts
		})
    const filteredProductNamesArr = productNamesList.filter(item => item !== '')
		res.json(filteredProductNamesArr)
	} catch (e) {
		res.json({message: 'Щось пішло не так, спробуйте пізніше'})
	}
}

export const searchProductTagAdmin = async (
	req,
	res) => {
	try {
		const searchNameProduct = req.query?.product_name
		const userId = req.query?.user_id
		const isShop = await User.findById(userId)
		const searchedArrProducts = []
		const tehR = []
		const productNamesList = []

		const categoriesTeh = await Promise.all(
			isShop?.categories.map((categories) => {
				return Categories.findById(categories._id)
			}))

		let affTehProductList = []
		let allProducts = []
		for (let i = 0; i < categoriesTeh.length; i++) {
			affTehProductList = await Promise.all(
				categoriesTeh[i].category_list.map(item => Products.findById(item))
			)
			affTehProductList.map(item => {
				allProducts.push(item)
			})
		}

		tehR.push(searchNameProduct?.trim().toLocaleLowerCase())

		allProducts.forEach((product) => {
			const filterAvailable = product?.name_product.trim().toLowerCase()
			productNamesList.push(filterAvailable)
			if (compareArrays(productNamesList, tehR)) {
				return searchedArrProducts.push(product);
			}
			return searchedArrProducts
		})

		res.json(productNamesList)
	} catch (e) {
		res.json({message: 'Щось пішло не так, спробуйте пізніше'})
	}
}