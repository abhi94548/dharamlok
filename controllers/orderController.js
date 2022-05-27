const Razorpay = require('razorpay');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const balVidyaModel = require('../models/balVidyaModel');
const eventModel = require('../models/eventModel');
const customerModel = require('../models/customerModel');
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
                        async (error, order)=> {
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    id : req.body.id,
                                    amount : amount,
                                    customerId : req.body.customerId,
                                    quantity : req.body.quantity
                                })
                                orderSave.save();
                                await customerModel.findOneAndUpdate({_id : req.body.customerId, userId : user.id}, 
                                    {
                                        orderId : order.id
                                    },{
                                    new: true
                                });
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
                                    id : req.body.id,
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
                                    id : req.body.id,
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
                                paymentId : paymentId,
                                paymentStatus : 1
                            },{
                            new: true
                        });
                        const customer =  await customerModel.find({orderId : orderId, userId : user.id});
                        res.status(200).json({success : true, order: orders, customer : customer, customer : customer})
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
    },
    myOrders : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myOrders =  await orderModel.find({userId : user.id}).sort([['_id', -1]]);
                    res.status(200).json({success : true,message: myOrders})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    orderDetailById : function(req, res){
        var customerDetail,productDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myOrders =  await orderModel.findOne({_id : req.body.id});
                    if(myOrders != null){
                        customerDetail =  await customerModel.findOne({_id : myOrders.customerId});
                        productDetails =  await productModel.findOne({id : myOrders.id});
                    }
                    res.status(200).json({success : true, order: myOrders, customer : customerDetail, product : productDetails})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    orderPending : function(req, res){
        var customer,product;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var orders =  await orderModel.find({approved : 0});
                    if(orders.length > 0){
                        customer =  await customerModel.findOne({_id : orders.customerId});
                        product =  await productModel.findOne({id : orders.id});
                    }
                    res.status(200).json({success : true, order: orders, customer : customer, product : product})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    orderApproved : function(req, res){
        var cust,prod;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var orderDetail =  await orderModel.find({approved : 1});
                    if(orderDetail.length > 0){
                        cust =  await customerModel.find({_id : orderDetail.customerId});
                        prod =  await productModel.find({id : orderDetail.id});
                    }
                    res.status(200).json({success : true, order: orderDetail, customer : cust, product : prod})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    approveOrder : function(req, res){
        var customerDetail,productDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var orders =  await orderModel.findOneAndUpdate({orderId : req.body.id, userId : user.id}, 
                        {
                            approved : 1
                        },{
                        new: true
                    });
                    if(orders != null){
                        customerDetail =  await customerModel.findOne({_id : orders.customerId});
                        productDetails =  await productModel.findOne({id : orders.id});
                    }
                    res.status(200).json({success : true, order: orders, customer : customerDetail, product : productDetails})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
    
}
