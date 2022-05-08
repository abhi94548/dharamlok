const mongoose = require('mongoose');

const addPhotoSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	title : {
		required: true,
		type: String
	},
	imageUrl : {
		required: false,
		type: Number,
	},
},{collection : 'Photos'})

module.exports = mongoose.model('Photos',addPhotoSchema)
