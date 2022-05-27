const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
	},
	orderId : {
		required: false,
		type: String,
	},
    id : {
		required: false,
		type: String,
	},
    amount : {
		required: true,
		type: Number,
	},
    paymentStatus : {
		required: true,
		type: Number,
        default: 0
	},
    createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'PaymentOrder'})

module.exports = mongoose.model('PaymentOrder',orderSchema)
