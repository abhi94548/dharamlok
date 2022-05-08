const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	postId : {
		required: true,
		type: String
	},
},{collection : 'likes'})

module.exports = mongoose.model('likes',likeSchema)
