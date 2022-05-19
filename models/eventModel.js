const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

const eventSchema = new mongoose.Schema({
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
    place : {
		required: true,
		type: String,
	},
    type : {
		required: true,
		type: String,
	},
    bannerImageUrl : {
		required: true,
		type: String,
	},
    relatedImageUrl : {
		required: true,
		type: String,
	},
	approved:{
		required: false,
		type: Number,
		default:0
	},
	locationUrl : {
		required: true,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'events'})

eventSchema.plugin(mongooseDateFormat)

module.exports = mongoose.model('events',eventSchema)
