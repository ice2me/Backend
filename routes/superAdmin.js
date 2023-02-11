import { Router } from "express"
import { getAllShopsList } from "../controllers/super-admin/getAllShopsList.js"
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

router.get('/list', checkAuth, getAllShopsList)

export default router