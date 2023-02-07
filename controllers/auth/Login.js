import User from "../../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
			return res.json({error: {message: 'this user does not exist'}})
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			return res.json({error: {message: 'Password not correct...'}})
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
			message: 'Your enter system'
		})

	} catch (e) {
		res.json({error: {message: 'error for login'}})
	}
}