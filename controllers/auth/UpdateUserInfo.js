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
			pay_package,
			style_shop,
			open_shop,
			qr_code,
			calculate_total_cost
		} = req.body

		const isUser = await User.findById(id)
		isUser.image_logo = image_logo
		isUser.description = description
		isUser.shop_link = shop_link
		isUser.paid_subscription = paid_subscription
		isUser.socials_links = {...socials_links}
		isUser.pay_package = pay_package
		isUser.style_shop = {...style_shop}
		isUser.open_shop = open_shop
		isUser.qr_code = {...qr_code}
		isUser.calculate_total_cost = calculate_total_cost

		await isUser.save()
		res.json({
			isUser,
			message: 'Оновлення інформації про користувача вдало завершено'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Помилка оновлення інформації користувача, спробуйте пізніше'}})
	}
}
