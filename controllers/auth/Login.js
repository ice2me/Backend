import User from "../../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { dateStr } from "../../utils/dateHelper.js";

// Login User
export const login = async (req,
	res) => {
	try {
		const {
			email,
			password
		} = req.body

		const user = await User.findOne({email})
		if (!user) {
			return res.json({error: {message: 'Цього користувача не існує'}})
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			return res.json({error: {message: 'Пароль невірний...'}})
		}
//jwt add
		const token = jwt.sign({
				id: user._id,
			}, process.env.JWT_SECRET,
			{expiresIn: '30d'},
		)

		res.json({
			token,
			user,
			message: 'Ви увійшли'
		})

	} catch (e) {
		res.json({error: {message: 'Помилка при спробі увійти, спробуйте пізніше'}})
	}
}