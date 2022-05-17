const mongoose = require('mongoose');

const biographySchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	description : {
		required: false,
		type: String
	},
	profileImageUrl : {
		required: false,
		type: String,
	},
	coverImageUrl : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
	},
},{collection : 'biography'})

module.exports = mongoose.model('biography',biographySchema)
