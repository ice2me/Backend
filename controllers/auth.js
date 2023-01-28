// Register User
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Products from "../models/Products.js";

export const register = async (
	req,
	res) => {
	try {
		const {
			username,
			email,
			phone,
			password,
			password_confirm,
			shop_name,
			description,
			shop_link,
			socials_links,
			open_shop
		} = req.body
		const isUsed = await User.findOne({username})
		const isEmail = await User.findOne({email})
		const isPhone = await User.findOne({phone})
		const isShopName = await User.findOne({shop_name})

		if (isUsed) {
			return res.json({
				error: {
					username: 'this user already exists'
				}
			})
		}
		if (isEmail) {
			return res.json({
				error:
					{
						email: 'this email already exists'
					}
			})
		}
		if (isPhone) {
			return res.json({
				error:
					{
						phone: 'this phone already exists'
					}
			})
		}
		if (isShopName) {
			return res.json({
				error:
					{
						shop_name: 'this shop name already exists'
					}
			})
		}

//hash password

		if (password_confirm !== password) {
			return res.json({
				error:
					{
						password: 'this passwords are not equal'
					}
			})
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

// save user
		const newUser = new User({
			username,
			email,
			phone,
			password: hash,
			shop_name,
			description,
			shop_link,
			socials_links,
			paid_subscription: false,
			paid_date: new Date(),
			style_shop: {
				text_color: "",
				background_color: "",
			},
			pay_package: "Standart",
			open_shop,
			qr_code: {
				text_color: "",
				background_color: "",
				typeQr: ""
			}

		})
//jwt add
		const token = jwt.sign({
				id: newUser._id,
			}, process.env.JWT_SECRET,
			{expiresIn: '30d'},
		)

		await newUser.save()

		res.json({
			token,
			newUser,
			message: 'Registration successfully completed'
		})

	} catch (e) {
		res.json(e, {error: {message: 'Error for registration user'}})
	}
}
export const updateUser = async (
	req,
	res) => {
	try {
		const {
			id,
			username,
			phone,
			shop_name,
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

		isUser.username = username
		isUser.phone = phone
		isUser.shop_name = shop_name
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

// Login User
export const login = async (req,
	res) => {
	try {
		const {
			email,
			password
		} = req.body
		const user = await User.findOne({email})
		if (!user) {
			return res.json({error: {message: 'this user does not exist'}})
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			return res.json({error: {message: 'Password not correct...'}})
		}
//jwt add
		const token = jwt.sign({
				id: user._id,
			}, process.env.JWT_SECRET,
			{expiresIn: '30d'},
		)
		res.json({
			token,
			user,
			message: 'Your enter system'
		})

	} catch (e) {
		res.json({error: {message: 'error for login'}})
	}
}

//Get me
export const getMe = async (req,
	res) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			return res.json({
				error:
					{
						message: 'this user does not exist'
					}
			})
		}

		const token = jwt.sign({
				id: user._id,
			}, process.env.JWT_SECRET,
			{expiresIn: '30d'},
		)

		res.json({
			user,
			token
		})

	} catch (e) {
		res.json({
			error:
				{
					message: 'this user does not exist'
				}
		})
	}
}
//Delete user
export const deleteUser = async (req,
	res) => {
	try {
		const user = await User.findById(req.userId)

		const itemsTeh = await Promise.all(
			user.category_list.map((item) => {
				console.log(Products)
				// return Products.deleteMany(item._id)
			}))
		console.log(itemsTeh)
		res.json({
			message: 'Remove User'
		})
	} catch (e) {
		res.json({
			error:
				{
					message: 'this user does not exist'
				}
		})
	}
}