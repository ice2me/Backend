import mongoose from 'mongoose'

const CategoriesSchema = new mongoose.Schema(
	{
		category_name: {
			type: String,
			required: false
		},
		category_image: {
			type: String,
			required: false
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		category_list: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CategoryList'
		}],
	},
	{timestamps: true},
)
export default mongoose.model('Categories', CategoriesSchema)