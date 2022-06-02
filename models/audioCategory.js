const mongoose = require('mongoose');

const audioCategorySchema = new mongoose.Schema({
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
},{collection : 'Audio Category'})

module.exports = mongoose.model('Audio Category',audioCategorySchema)
