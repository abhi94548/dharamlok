const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String,
		unique: true
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Event Category'})

module.exports = mongoose.model('Event Category',eventSchema)
