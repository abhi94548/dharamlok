const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

const biographySchema = new mongoose.Schema({
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
		default: Date.now()
	},
},{collection : 'biography'})

biographySchema.plugin(mongooseDateFormat)

module.exports = mongoose.model('biography',biographySchema)
