const mongoose = require('mongoose');


const audioSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	title : {
		required: false,
		type: String
	},
	description : {
		required: false,
		type: String
	},
	category : {
		required: false,
		type: String,
	},
    bannerImageUrl : {
		required: false,
		type: Number,
        default:0
	},
    audioUrl : {
		required: false,
		type: Number,
        default:0
	},  
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Audio'})


module.exports = mongoose.model('Audio',audioSchema)
