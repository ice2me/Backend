import User from "../../models/User.js"
import jwt from "jsonwebtoken"

export const getMe = async (req,
	res) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			return res.json({
				error:
					{
						message: 'this user does not exist'
					}
			})
		}

		const token = jwt.sign({
				id: user._id,
			}, process.env.JWT_SECRET,
			{expiresIn: '30d'},
		)

		res.json({
			user,
			token
		})

	} catch (e) {
		res.json({
			error:
				{
					message: 'this user does not exist'
				}
		})
	}
}