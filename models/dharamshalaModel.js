const mongoose = require('mongoose');

const dharamshalaSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String
	},
	email : {
		required: false,
		type: String,
		unique: true
	},
	country : {
		required: false,
		type: String,
	},
	description : {
		required: false,
		type: String,
		default:''
	},
	date : {
		required: false,
		type: String,
		default:''
	},
	duration : {
		required: false,
		type: Number,
		default:0
	},
	person : {
		required: false,
		type: Number,
		default:0
	},
	phone : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Dharamshala'})

module.exports = mongoose.model('Dharamshala',dharamshalaSchema)
