const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
		unique:true,
	},
	postId : {
		required: true,
		type: String,
		unique: true
	},
},{collection : 'likes'})

module.exports = mongoose.model('likes',likeSchema)
