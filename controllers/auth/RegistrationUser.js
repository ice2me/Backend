import User from "../../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { nodeMailerRegistration } from "../../utils/nodeMailerRegistration.js";

export const register = async (
	req,
	res) => {
	try {
		const {
			email,
			phone,
			password,
			password_confirm
		} = req.body
		const isEmail = await User.findOne({email})
		const isPhone = await User.findOne({phone})

		if (!!isEmail) {
			return res.json({
				error:
					{
						email: 'Ця адреса електронної пошти вже існує'
					}
			})
		}
		if (!!isPhone) {
			return res.json({
				error:
					{
						phone: 'Цей телефон вже існує'
					}
			})
		}

//hash password

		if (password_confirm !== password) {
			return res.json({
				error:
					{
						password: 'Ці паролі не однакові'
					}
			})
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)
// save user
		const newUser = new User({
			email,
			phone,
			password: hash,

		})
//jwt add
		const token = jwt.sign({
				id: newUser._id,
			}, process.env.JWT_SECRET,
			{expiresIn: '30d'},
		)

		await newUser.save()

		nodeMailerRegistration({email})

		res.json({
			token,
			newUser,
			message: 'Реєстрація користувача успішна'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Помилка реєстрації, спробуйте ще раз пізніше :('}})
	}
}