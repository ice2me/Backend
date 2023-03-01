import { Router } from "express"
import {
	getAllShops,
	getCategoriesForLink,
	getProductClient,
	postBasketFormClient
} from "../controllers/clientOrder.js";
import {
	searchProduct,
	searchProductTag
} from "../searchProduct.js";

const router = new Router()

router.get('/:link', getCategoriesForLink)
router.get('/:link/:id', getProductClient)
router.post('/order', postBasketFormClient)

router.post('/:all-shops', getAllShops)

// search product
router.post('/search', searchProduct)
router.post('/search_tag', searchProductTag)

export default router