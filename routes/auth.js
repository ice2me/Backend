import { Router } from "express"
import {
	deleteUser,
	getMe,
	login,
	register,
	updateUser
} from "../controllers/auth.js"
import { checkAuth } from "../utils/checkAuth.js"

const router = new Router()

//Register and login
router.post('/register', register)
router.patch('/update', checkAuth, updateUser)
router.post('/login', login)
router.delete('/delete',checkAuth, deleteUser)
router.get('/me', checkAuth, getMe)


export default router