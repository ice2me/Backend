import nodemailer from 'nodemailer'

export const nodeMailer = (
	{
		shop_email,
		items,
		phone,
		username,
		totalAmount,
		shop_name,
		city,
		address,
		comment_message,
		user_email
	}
) => {
	async function main() {
		let transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_MY, // generated ethereal user
				pass: process.env.EMAIL_PASS, // generated ethereal password
			},
		})
		let info = await transporter.sendMail({
			from: process.env.EMAIL_MY,
			to: [
				`${shop_email}`,
				// `${user_email}`
			], //получатель
			subject: "Order",
			text: "Order client",
			html: `
				<h1>Order for / Замовлення для <span style="background-color: rgba(247,206,0, 0.3)">${shop_name}</span>
				</h1>
				<h3>Client contact / Контакти клієнта <br>
					Name / Імь'я: <span style="background-color: rgba(247,206,0, 0.3)">${username}</span> <br>
					Phone / Телефон: <span style="background-color: rgba(247,206,0, 0.3)">${phone}</span> <br>
					Email / Електронна адреса: <span style="background-color: rgba(247,206,0, 0.3)">${user_email}</span> <br>
					City / Місто: <span style="background-color: rgba(247,206,0, 0.3)">${city}</span> <br>
					Address / Адреса: <span style="background-color: rgba(247,206,0, 0.3)">${address}</span> <br>
				</h3>
				<p style='width: 300px;'>
					Comment Message / Коментар: <span style="background-color: rgba(247,206,0, 0.5);">${comment_message}</span> <br>
				</p>
				<table style="font-size: 14px;">
					${items?.map(item => (
				`
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: rgba(255,127,80, 0.3)'>
											Name product / Назва товару:
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: rgba(50,205,50, 0.3)'>
											${item?.name_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: rgba(255,127,80, 0.3)'>
											Price / Ціна:
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: rgba(50,205,50, 0.3)'>
											 ${item?.price_product} ${item?.currency_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: rgba(255,127,80, 0.3)'>
											Unit product / Кількість продукту: 
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: rgba(50,205,50, 0.3)'>
											${item?.count} ${item?.unit_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: rgba(255,127,80, 0.3)'>
											Total Price / Загальна сума за продукт:
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: rgba(50,205,50, 0.3)'>
											${item?.total_price} ${item?.currency_product}
										</td>
									</tr>
								`
			))}
				</table>
				<h3>Total Amount / Загальна сума замовлення: <span style="background-color: rgba(247,206,0, 0.5); font-size: 22px">${totalAmount}₴</span>
				</h3>
				`
		})

		console.log("Message sent: %s", info.messageId)

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
		nodemailer.getTestMessageUrl(info)
	}

	main().catch(console.error)
}
