const Razorpay = require('razorpay');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const balVidyaModel = require('../models/balVidyaModel');
const eventModel = require('../models/eventModel');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const razorpayInstance = new Razorpay({
    key_id: "rzp_test_CjE6dleliI5tcb",
    key_secret: "4XgGfyyMkzYHV8QJdXHcCmBt"
});


module.exports = {
    createOrder : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var orderType = req.body.type;
                    if(orderType == 0){
                        const product = await productModel.findOne({_id : req.body.id}).select("price");
                        var amount = product.price * 100 * req.body.quantity;
                        const currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        (error, order)=>{
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    productId : req.body.productId,
                                    amount : amount,
                                    customerId : req.body.customerId
                                })
                                orderSave.save();
                                res.status(200).json({success : true, message: order})
                            }
                            else
                                res.status(400).json({success : false,message: error.message});
                            }
                        )
                    }
                    else if(orderType == 1){
                        const balVidya = await balVidyaModel.findOne({_id : req.body.id}).select("cost");
                        var amount = balVidya.cost * 100 * req.body.quantity;
                        const currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        (error, order)=>{
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    productId : req.body.productId,
                                    amount : amount,
                                    customerId : req.body.customerId
                                })
                                orderSave.save();
                                res.status(200).json({success : true, message: order})
                            }
                            else
                                res.status(400).json({success : false,message: error.message});
                            }
                        )
                    }
                    else if(orderType == 2){
                        const event = await eventModel.findOne({_id : req.body.id}).select("cost");
                        var amount = event.cost * 100 * req.body.quantity;
                        const currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        (error, order)=>{
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    productId : req.body.productId,
                                    amount : amount,
                                    customerId : req.body.customerId
                                })
                                orderSave.save();
                                res.status(200).json({success : true, message: order})
                            }
                            else
                                res.status(400).json({success : false,message: error.message});
                            }
                        )
                    }
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    verifyOrder : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let orderId = req.body.orderId;
                    let paymentId = req.body.paymentId;
                    let signature = req.body.signature;
                    let hmac = crypto.createHmac('sha256', '4XgGfyyMkzYHV8QJdXHcCmBt');
                    hmac.update(orderId + "|" + paymentId);
                    const generated_signature = hmac.digest('hex');
                    if (generated_signature === signature) {
                        var orders =  await orderModel.findOneAndUpdate({orderId : orderId, userId : user.id}, 
                            {
                                paymentId : paymentId
                            },{
                            new: true
                        });
                        res.status(200).json({success : true, message: orders})
                    }
                    else{
                        res.status(400).json({success : false,message: 'Transaction Failed'})
                    }
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteOrder : async function (req, res){
        result = await orderModel.remove();
        res.status(200).json({success : true, message: result})
    }
}
