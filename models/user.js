const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
		unique: true
	},
	userType : {
		required: false,
		type: String,
	},
	typeVendor : {
		required: false,
		type: String,
		default:''
	},
	profileImageUrl : {
		required: false,
		type: String,
		default: '1653326870689.png'
	},
	description : {
		required: false,
		type: String,
		default:''
	},
	coverImageUrl : {
		required: false,
		type: String,
		default:''
	},
	category : {
		required: false,
		type: String,
		default:''
	},
	password :{
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
	active :{
		required : false,
		type: Number,
		default:1
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
})

module.exports = mongoose.model('users',userSchema)
