import { dateStr } from "../../utils/dateHelper.js"
import User from "../../models/User.js"

export const registerShop = async (
	req,
	res) => {
	try {
		const {
			id,
			description,
			shop_link,
			socials_links,
			open_shop,
			calculate_total_cost
		} = req.body

			const isShop = await User.findById(id)
			isShop.description = description
			isShop.shop_link = shop_link
			isShop.socials_links = {...socials_links}
			isShop.open_shop = open_shop
			isShop.calculate_total_cost = calculate_total_cost
			isShop.style_shop = {
				text_color: "",
				background_color: "",
			}
			isShop.qr_code = {
				text_color: "",
				background_color: "",
				typeQr: ""
			}
			isShop.paid_subscription = true,
			isShop.register_data = dateStr(new Date().toISOString(), 1),
			isShop.date_payment = dateStr(new Date().toISOString(), 1),
			isShop.end_date_paid_period = dateStr(new Date().toISOString(), 2),
			isShop.pay_package = "Standart"
			isShop.created_shop = true

			await isShop.save()

			res.json({
				isShop,
				message: 'Реєстрацію магазину/меню успішно завершено'
			})
		// }

	} catch (e) {
		res.json(e, {error: {message: 'Помилка реєстрації магазину/меню'}})
	}
}