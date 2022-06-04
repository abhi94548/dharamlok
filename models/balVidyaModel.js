const mongoose = require('mongoose');


const balVidyaSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String,
		unique: true
	},
	description : {
		required: false,
		type: String,
	},
	category : {
		required: false,
		type: String,
	},
	type : {
		required: false,
		type: String,
		default:''
	},
	PDFuploadUrl : {
		required: false,
		type: String,
		default: ''
	},
	thumbNailImageUrl : {
		required: false,
		type: String,
		default: ''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'BalVidya'})


module.exports = mongoose.model('BalVidya',balVidyaSchema)
