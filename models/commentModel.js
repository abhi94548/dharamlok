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
		default: moment(Date.now()).format('MM/DD/YYYY')
	},
},{collection : 'comments'})


commentSchema.plugin(mongooseDateFormat)

module.exports = mongoose.model('comments',commentSchema)
