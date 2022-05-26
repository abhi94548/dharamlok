const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
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
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'EBook'})

module.exports = mongoose.model('EBook',ebookSchema)
