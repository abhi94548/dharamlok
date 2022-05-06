const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	postId : {
		required: true,
		type: String
	},
	comment : {
		required: true,
		type: String,
	},
},{collection : 'comments'})

module.exports = mongoose.model('comments',commentSchema)
