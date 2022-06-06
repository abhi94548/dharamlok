const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	homeBanner : {
		required: false,
		type: String,
		default : ''
	},
	dharamGuruBanner : {
		required: false,
		type: String,
		default : ''
	},
	kathavachakBanner : {
		required: false,
		type: String,
		default : ''
	},
	punditBanner : {
		required: false,
		type: String,
		default : ''
	},
	templeBanner : {
		required: false,
		type: String,
		default : ''
	},
	thoughts : {
		required: false,
		type: String,
		default : ''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'HomePage'})

module.exports = mongoose.model('HomePage',homeSchema)
