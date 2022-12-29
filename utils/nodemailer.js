import nodemailer from 'nodemailer'

export const nodeMailer = ({
	email,
	order
}) => {
	async function main() {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let testAccount = await nodemailer.createTestAccount()

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass, // generated ethereal password
			},
		})

		// send mail with defined transport object
		let info = await transporter.sendMail({
				from: '"Fred Foo 👻" <ice2me1989dev.gmail.com>', // sender address
				// to: {email}, // list of receivers
				to: 'ice2me1989.gmail.com', // list of receivers
				subject: "Order", // Subject line
				text: "Order client", // plain text body
				html: order?.map(order => (`<p>
						<p>${email}</p>
						<img
							src=${order?.image_product}
							alt="image"
						/>
						<h3>${order?.name_product}</h3>
						<p>${order?.description_product}</p>
						<span> Price: <b> ${order?.price_product} ${order?.currency_product}</b></span>
						<span>Unit product: <b>${order?.unit_product}</b></span>
						<span>Total Price: <b>${order?.price_product} ${order?.currency_product}</b></span>
					</p>`
				)), // html body
			})
		;

		console.log("Message sent: %s", info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}

	main().catch(console.error)
}
