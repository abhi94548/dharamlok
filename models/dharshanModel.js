const mongoose = require('mongoose');


const dharshanSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	title : {
		required: true,
		type: String
	},
	description : {
		required: true,
		type: String
	},
	url : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Dharshan'})


module.exports = mongoose.model('Dharshan',dharshanSchema)
