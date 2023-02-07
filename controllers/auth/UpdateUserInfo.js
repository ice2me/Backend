import User from "../../models/User.js"

export const updateUser = async (
	req,
	res) => {
	try {
		const {
			id,
			image_logo,
			description,
			shop_link,
			socials_links,
			paid_subscription,
			paid_date,
			pay_package,
			style_shop,
			open_shop,
			qr_code,
		} = req.body

		const isUser = await User.findById(id)
		isUser.image_logo = image_logo
		isUser.description = description
		isUser.shop_link = shop_link
		isUser.paid_subscription = paid_subscription
		isUser.socials_links = paid_date
		isUser.socials_links = {...socials_links}
		isUser.pay_package = pay_package
		isUser.style_shop = {...style_shop}
		isUser.open_shop = open_shop
		isUser.qr_code = {...qr_code}

		await isUser.save()
		res.json({
			isUser,
			message: 'Update User info completed'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Error for registration user'}})
	}
}
