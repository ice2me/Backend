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
export const postUpdateShop = async (req,
	res) => {
	const {
		id,
		shop_name,
		email,
		phone,
		variant_trading,
		date_payment,
		end_date_paid_period,
		paid_subscription,
		pass
	} = req.body
	try {
		if (pass === process.env.PASS_FOR_UPDATE) {
			const isShop = await User.findById(id)

			isShop.shop_name = shop_name
			isShop.email = email
			isShop.phone = phone
			isShop.variant_trading = variant_trading
			isShop.date_payment = date_payment
			isShop.end_date_paid_period = end_date_paid_period
			isShop.paid_subscription = paid_subscription

			await isShop.save()

			res.json({shops: isShop})
		}else {
			res.json({message: 'Non Password'})
		}

	} catch (e) {
		res.json({message: 'Something went wrong.'})
	}
}

