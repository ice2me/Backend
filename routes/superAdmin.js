import { Router } from "express"
import {
	getAllShopsList,
	postUpdateShop
} from "../controllers/super-admin/getAllShopsList.js"
import { checkAuth } from "../utils/checkAuth.js"

const router = new Router()

router.get('/list', checkAuth, getAllShopsList)
router.post('/update-shop', checkAuth, postUpdateShop)

export default router