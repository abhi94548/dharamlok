const mongoose = require('mongoose');
const moment = require('moment');

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
	createdAt:{
		type: Date,
		default: moment(Date.now()).format('MM/DD/YYYY')
	},
},{collection : 'comments'})

module.exports = mongoose.model('comments',commentSchema)
