import User from "../../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

		if (isEmail) {
			return res.json({
				error:
					{
						email: 'this email already exists'
					}
			})
		}
		if (isPhone) {
			return res.json({
				error:
					{
						phone: 'this phone already exists'
					}
			})
		}

//hash password

		if (password_confirm !== password) {
			return res.json({
				error:
					{
						password: 'this passwords are not equal'
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

		res.json({
			token,
			newUser,
			message: 'Registration successfully completed'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Error for registration user'}})
	}
}