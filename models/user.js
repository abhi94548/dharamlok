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
	},
	userType : {
		required: true,
		type: String,
	},
	profileImageUrl : {
		required: true,
		type: String,
		default: '1653326870689.png'
	},
	description : {
		required: true,
		type: String,
		default:''
	},
	coverImageUrl : {
		required: true,
		type: String,
		default:''
	},
	category : {
		required: true,
		type: String,
		default:''
	},
	password :{
		required: true,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
})

module.exports = mongoose.model('users',userSchema)
