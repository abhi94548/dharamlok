const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String,
		default:''
	},
	address : {
		required: false,
		type: String,
        default:''
	},
	buisnessName : {
		required: false,
		type: String,
		default:''
	},
	profileImageUrl : {
		required: false,
		type: String,
		default: '1653326870689.png'
	},
	gstNo : {
		required: false,
		type: String,
		default:''
	},
	bankName : {
		required: false,
		type: String,
		default:''
	},
	IFSC : {
		required: false,
		type: String,
		default:''
	},
	accountNo :{
		required: true,
		type: String,
        default:''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Service Provider Details'},)

module.exports = mongoose.model('Service Provider Details',serviceProviderSchema)
