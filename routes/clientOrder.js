import { Router } from "express"
import {
	getAllShops,
	getCategoriesForLink,
	getProductClient,
	postBasketFormClient
} from "../controllers/clientOrder.js";

const router = new Router()

router.get('/:link', getCategoriesForLink)
router.get('/:link/:id', getProductClient)
router.post('/order', postBasketFormClient)

router.post('/:all-shops', getAllShops)

export default router