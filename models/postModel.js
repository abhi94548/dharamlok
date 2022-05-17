const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

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
		required: false,
		type: String,
		default:''
	},
	videoUrl : {
		required: false,
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
	isLiked : {
		required: false,
		type: Boolean,
		default: false
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'posts'})

postSchema.plugin(mongooseDateFormat)

module.exports = mongoose.model('posts',postSchema)
