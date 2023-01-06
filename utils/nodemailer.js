import nodemailer from 'nodemailer'

export const nodeMailer = (
	{
		shop_email,
		items,
		phone,
		username,
		totalAmount,
		shop_name
	}
) => {
	async function main() {
		let transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_MY, // generated ethereal user
				pass:  process.env.EMAIL_PASS, // generated ethereal password
			},
		})
		let info = await transporter.sendMail({
				from: process.env.EMAIL_MY,
				to: `${shop_email}`, //получатель
				subject: "Order",
				text: "Order client",
				html: `
				<h1>Order for ${shop_name}</h1>
				<h2>Client contact <br>
					Name: ${username} <br>
					Phone: ${phone} <br>
				</h2>
				<table style="font-size: 14px;">
					${items?.map(item => (
								`
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: coral'>
											Name product: 
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: limegreen'>
											${item?.name_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: coral'>
											Price: 
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: limegreen'>
											 ${item?.price_product} ${item?.currency_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: coral'>
											Unit product:  
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: limegreen'>
											${item?.count} ${item?.unit_product}
										</td>
									</tr>
									<tr>
										<th style='width: 100px; white-space: nowrap; padding: 0 10px; text-align: left; background-color: coral'>
											Total Price:  
										</th>
										<td style='width: 250px; padding: 0 10px; background-color: limegreen'>
											${item?.total_price} ${item?.currency_product}
										</td>
									</tr>
								`
							))}
				</table>
				<h3>Total Amount: ${totalAmount}</h3>
				`
			})

		console.log("Message sent: %s", info.messageId)

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
		nodemailer.getTestMessageUrl(info)
	}

	main().catch(console.error)
}
