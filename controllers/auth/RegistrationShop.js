import User from "../../models/User.js"
import { dateStr } from "../../utils/dateHelper.js";

export const registerShop = async (
	req,
	res) => {
	try {
		const {
			id,
			shop_name,
			description,
			shop_link,
			socials_links,
			open_shop,
			variant_trading,
			calculate_total_cost
		} = req.body

		const isShopName = await User.findOne({shop_name})

		if (!!isShopName) {
			return res.json({
				error:
					{
						shop_name: 'this shop name already exists'
					}
			})

		} else {
			const isUser = await User.findById(id)
			isUser.shop_name = shop_name.trim().replace(/ /ig, '_')
			isUser.description = description
			isUser.shop_link = shop_link
			isUser.socials_links = {...socials_links}
			isUser.open_shop = open_shop
			isUser.calculate_total_cost = calculate_total_cost
			isUser.variant_trading = variant_trading
			isUser.style_shop = {
				text_color: "",
				background_color: "",
			}
			isUser.qr_code = {
				text_color: "",
				background_color: "",
				typeQr: ""
			}
			isUser.paid_subscription = false,
			isUser.register_data = dateStr(new Date().toISOString(), 1),
			isUser.date_payment = dateStr(new Date().toISOString(), 1),
			isUser.end_date_paid_period = dateStr(new Date().toISOString(), 2),
			isUser.pay_package = "Standart"

			await isUser.save()

			res.json({
				isUser,
				message: 'Registration successfully completed'
			})
		}

	} catch (e) {
		res.json(e, {error: {message: 'Error for registration shop'}})
	}
}