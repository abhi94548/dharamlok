const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	title : {
		required: false,
		type: String
	},
	description : {
		required: false,
		type: String,
	},
    place : {
		required: false,
		type: String,
	},
    type : {
		required: false,
		type: String,
	},
    bannerImageUrl : {
		required: false,
		type: String,
	},
    relatedImageUrl : {
		required: false,
		type: String,
	},
	approved:{
		required: false,
		type: Number,
		default:0
	},
	locationUrl : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'events'})


module.exports = mongoose.model('events',eventSchema)
