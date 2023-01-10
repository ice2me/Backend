import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
			min: 3,
			max: 65
		},
		email: {
			type: String,
			require: true,
			unique: true
		},
		phone: {
			type: Number,
			require: true,
			unique: true
		},
		password: {
			type: String,
			require: true,
			min: 6,
		},
		shop_name: {
			type: String,
			require: true,
			unique: true,
			min: 3,
			max: 65
		},
		image_logo: {
			type: String,
			unique: false,
			default: ''
		},
		description: {
			type: String,
			max: 500
		},
		shop_link: {
			type: String,
			require: false,
			unique: false,
			min: 3,
			max: 65
		},
		paid_subscription: {
			type: Boolean,
			require: true,
		},
		paid_date: {
			type: String,
			require: true,
		},
		socials_links: {
			type: Object,
			require: false,
			shop_facebook: {
				type: String,
				require: false,
			},
			shop_viber: {
				type: String,
				require: false,
			},
			shop_telegram: {
				type: String,
				require: false,
			},
			shop_instagram: {
				type: String,
				require: false,
			},
		},
		categories: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Categories'
		}],
	},
	{timestamps: true}
)

export default mongoose.model('User', UserSchema)