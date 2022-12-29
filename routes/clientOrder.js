import { Router } from "express"
import {
	getCategoriesForLink,
	getProductClient,
	postBasketFormClient
} from "../controllers/clientOrder.js";

const router = new Router()

router.get('/:link', getCategoriesForLink)
router.get('/:link/:id', getProductClient)
router.post('/order', postBasketFormClient)

export default router