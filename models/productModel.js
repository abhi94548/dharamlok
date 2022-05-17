const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');


const productSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	title : {
		required: true,
		type: String
	},
	description : {
		required: true,
		type: String,
	},
    price : {
		required: true,
		type: String,
	},
    imageUrl : {
		required: false,
		type: String,
	},
	pricePerUnit : {
		required: true,
		type: String,
	},
    category : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'products'})

productSchema.plugin(mongooseDateFormat)

module.exports = mongoose.model('products',productSchema)
