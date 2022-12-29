import mongoose from 'mongoose'

const ProductsSchema = new mongoose.Schema(
	{
		category_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Categories'
		},
		image_product: {
			type: String,
		},
		name_product: {
			type: String,
			required: true
		},
		description_product: {
			type: String,
			required: false
		},
		unit_product: {
			type: String,
			required: true
		},
		price_product: {
			type: Number,
			required: true
		},
		currency_product: {
			type: String,
			required: true
		},
		available_product: {
			type: Boolean,
			required: true
		}
	},
	{timestamps: true},
)
export default mongoose.model('Products', ProductsSchema)