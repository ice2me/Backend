import nodemailer from 'nodemailer'

export const nodeMailer = (
	{
		shop_email,
		items,
		phone,
		username,
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
				process.env.EMAIL_MY
			], //получатель
			subject: "Order",
			text: "Order client",
			html: `
				<h1>Замовлення для <span style="background-color: rgba(247,206,0, 0.3)">${shop_name}</span>
				</h1>
				<h3>Контакти клієнта <br>
					Імь'я: <span style="background-color: rgba(247,206,0, 0.3)">${username}</span> <br>
					Телефон: <span style="background-color: rgba(247,206,0, 0.3)">${phone}</span> <br>
					Електронна адреса: <span style="background-color: rgba(247,206,0, 0.3)">${user_email ? user_email : ''}</span> <br>
					Місто: <span style="background-color: rgba(247,206,0, 0.3)">${city ? city : ''}</span> <br>
					Адреса: <span style="background-color: rgba(247,206,0, 0.3)">${address ? address : ''}</span> <br>
				</h3>
				<p style='width: 300px;'>
					Коментар: <span style="background-color: rgba(247,206,0, 0.5);">${comment_message}</span> <br>
				</p>
				<table style="font-size: 14px;">
					${items?.map(item => (
				`
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: rgba(255,127,80, 0.3)'>
											Назва товару:
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: rgba(50,205,50, 0.3)'>
											${item?.name_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: rgba(255,127,80, 0.3)'>
											Ціна:
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: rgba(50,205,50, 0.3)'>
											 ${item?.price_product} ${item?.currency_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: rgba(255,127,80, 0.3)'>
											Кількість продукту: 
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: rgba(50,205,50, 0.3)'>
											${item?.count} ${item?.unit_product}
										</td>
									</tr>
								`
			))}
				</table>
				`
		})
		nodemailer.getTestMessageUrl(info)
	}

	main().catch(console.error)
}
