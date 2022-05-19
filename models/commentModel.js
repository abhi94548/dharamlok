const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	userName : {
		required: true,
		type: String
	},
	
	userImage : {
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
	approved:{
		required: false,
		type: Number,
		default:0
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'comments'})


module.exports = mongoose.model('comments',commentSchema)
