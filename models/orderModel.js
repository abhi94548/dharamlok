const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
		unique:true,
	},
	orderId : {
		required: true,
		type: String,
	},
    productId : {
		required: true,
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
},{collection : 'Orders'})

module.exports = mongoose.model('Orders',orderSchema)
