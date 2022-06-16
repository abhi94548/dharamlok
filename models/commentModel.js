const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	userName : {
		required: false,
		type: String
	},

	userImage : {
		required: false,
		type: String
	},
	
	postId : {
		required: false,
		type: String
	},
	comment : {
		required: false,
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
