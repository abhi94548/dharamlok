const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	bannerImageUrl : {
		required: false,
		type: String
	},
	city : {
		required: false,
		type: String,
	},
	description : {
		required: false,
		type: String,
	},
	location : {
		required: false,
		type: String,
	},
	name : {
		required: false,
		type: String,
	},
	relatedImageUrl : {
		required: false,
		type: String,
	},
	state : {
		required: false,
		type: String,
	},
	category : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'temple'},)

module.exports = mongoose.model('temple',templeSchema)
