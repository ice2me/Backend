import User from "../../models/User.js"

export const getAllShopsList = async (req,
	res) => {
	try {
		const allShops = await User.find()
		res.json({shops: allShops})
	} catch (e) {
		res.json({message: 'Something went wrong.'})
	}
}