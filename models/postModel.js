const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	description : {
		required: false,
		type: String
	},
	imageLink : {
		required: false,
		type: String,
	},
	videoLink : {
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
