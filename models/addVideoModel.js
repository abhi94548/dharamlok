const mongoose = require('mongoose');

const addVideoSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	title : {
		required: true,
		type: String
	},
	videoUrl : {
		required: false,
		type: Number,
	},
},{collection : 'Videos'})

module.exports = mongoose.model('Videos',addVideoSchema)
