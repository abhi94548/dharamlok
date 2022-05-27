const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	name : {
		required: true,
		type: String
	},
	phone : {
		required: true,
		type: String,
		unique: true
	},
	email : {
		required: true,
		type: String,
	},
	address : {
		required: false,
		type: String,
		default:''
	},
	city : {
		required: false,
		type: String,
		default:''
	},
	country : {
		required: false,
		type: String,
		default:''
	},
	pincode : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'comments'})

module.exports = mongoose.model('Customers',customerSchema)
