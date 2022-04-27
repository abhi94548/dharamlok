const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	description : {
		required: false,
		type: String
	},
	imageUrl : {
		required: false,
		type: String,
	},
	videoUrl : {
		required: false,
		type: String,
	},
	postType : {
		required: true,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'posts'})

module.exports = mongoose.model('posts',postSchema)
