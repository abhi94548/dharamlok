const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
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
},{collection : 'Booking'})

module.exports = mongoose.model('Booking',bookingSchema)
