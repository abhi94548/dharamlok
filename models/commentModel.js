const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

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
		default: Date.now()
	},
},{collection : 'comments'})


commentSchema.plugin(mongooseDateFormat.Date)

module.exports = mongoose.model('comments',commentSchema)
