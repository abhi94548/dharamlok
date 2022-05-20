const mongoose = require('mongoose');


const balVidyaSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String
	},
	description : {
		required: false,
		type: String
	},
	keyInsight : {
		required: false,
		type: String,
	},
    cost : {
		required: false,
		type: String
	},
	type : {
		required: false,
		type: String
	},
	bannerImageUrl : {
		required: false,
		type: String,
	},
	relatedImageUrl : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'BalVidya'})


module.exports = mongoose.model('BalVidya',balVidyaSchema)
