const mongoose = require('mongoose');

const dharamshalaSchema = new mongoose.Schema({
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
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Dharamshala'})

module.exports = mongoose.model('Dharamshala',dharamshalaSchema)
