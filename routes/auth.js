import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import { login } from "../controllers/auth/Login.js"
import { register } from "../controllers/auth/RegistrationUser.js"
import { updateUser } from "../controllers/auth/UpdateUserInfo.js"
import { deleteUser } from "../controllers/auth/DeleteUser.js"
import { getMe } from "../controllers/auth/GetMe.js"
import { registerShop } from "../controllers/auth/RegistrationShop.js"

const router = new Router()

//Register and login
router.post('/register', register)
router.post('/register-shop',checkAuth, registerShop)
router.patch('/update', checkAuth, updateUser)
router.post('/login', login)
router.delete('/delete',checkAuth, deleteUser)
router.get('/me', checkAuth, getMe)


export default router