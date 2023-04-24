import nodemailer from 'nodemailer'

export const nodeMailerRegistration = (
	{
		email,
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
				`${email}`,
				process.env.EMAIL_MY
			], //получатель
			subject: "Registration on Theke.com.ua",
			text: "Registration on Theke.com.ua",
			html: `
				<h2>
					Дякуємо за реєстрацію на Theke.com.ua за допомогою електронної пошти <span style="background-color: rgba(247,206,0, 0.3)">${email} </span>
				</h2>
				<h3>
					Theke це Онлайн-вітрина Вашого магазину.
				</h3>
				`
		})

		nodemailer.getTestMessageUrl(info)
	}

	main().catch(console.error)
}
