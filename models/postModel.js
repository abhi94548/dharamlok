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
		required: true,
		type: String,
		default:''
	},
	videoUrl : {
		required: true,
		type: String,
		default:''
	},
	postType : {
		required: true,
		type: String,
	},
	like : {
		required: false,
		type: Number,
		default: 0
	},
	comment : {
		required: false,
		type: Number,
		default:0
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'posts'})

module.exports = mongoose.model('posts',postSchema)
