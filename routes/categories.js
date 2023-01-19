import { Router } from "express"
import {checkAuth} from "../utils/checkAuth.js"
import {
	createCategories,
	deleteCategory,
	getCategories,
	updateCategoryName,
} from "../controllers/categories.js"
import {
	createProduct,
	deleteProduct,
	getProduct,
	updateAvailableCheckedProduct,
	updateProduct
} from "../controllers/product.js"

const router = new Router()

// categories
router.post('/', checkAuth, createCategories)
router.get('/list', checkAuth, getCategories)
router.patch('/update-name/:id', checkAuth, updateCategoryName)
router.delete('/:id', checkAuth, deleteCategory)

//products
router.post('/product', checkAuth, createProduct)
router.get('/products-list/:id', checkAuth, getProduct)
router.patch('/product/:id', checkAuth, updateProduct)
router.patch('/product-available/:id', checkAuth, updateAvailableCheckedProduct)
router.delete('/product/:id', checkAuth, deleteProduct)

export default router