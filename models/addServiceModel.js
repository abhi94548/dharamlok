const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	services : {
		required: true,
		type: String
	},
	type : {
		required: true,
		type: String,
	},
	description : {
		required: true,
		type: String,
	},
    price : {
		required: true,
		type: String,
	},
    imageUrl : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'services'})


module.exports = mongoose.model('services',serviceSchema)
