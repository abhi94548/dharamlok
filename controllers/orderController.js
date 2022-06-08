const Razorpay = require('razorpay');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const balVidyaModel = require('../models/balVidyaModel');
const eventModel = require('../models/eventModel');
const customerModel = require('../models/customerModel');
const bookingModel = require('../models/bookingModel');
const serviceModel = require('../models/addServiceModel');
const userModel = require('../models/user');
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
                        const product = await productModel.findOne({_id : req.body.id}).select("price").select("title").select('userId');
                        var amount = product.price * 100 * req.body.quantity;
                        var title = product.title
                        productUserId = product.userId
                        const currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        async (error, order)=> {
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    id : req.body.id,
                                    amount : amount,
                                    title : title,
                                    customerId : req.body.customerId,
                                    quantity : req.body.quantity,
                                    providerId : productUserId,
                                    type : 'product'
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
                    else if(orderType == 2){
                        const event = await eventModel.findOne({_id : req.body.id}).select("cost").select('title');
                        var amount = event.cost * 100 * req.body.quantity;
                        var title = event.title
                        const currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        (error, order)=>{
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    id : req.body.id,
                                    title : title,
                                    amount : amount,
                                    customerId : req.body.customerId,
                                    type : 'event'
                                })
                                orderSave.save();
                                res.status(200).json({success : true, message: order})
                            }
                            else
                                res.status(400).json({success : false,message: error.message});
                            }
                        )
                    }
                    else if(orderType == 3){
                        const service = await service.findOne({_id : req.body.id}).select("price").select("services").select('userId');
                        var amount = service.price * 100 * req.body.quantity;
                        var services = service.services
                        var serviceProviderUserId = service.userId
                        const currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        (error, order)=>{
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    id : req.body.id,
                                    title : services,
                                    amount : amount,
                                    customerId : req.body.customerId,
                                    type : 'service',
                                    providerId : serviceProviderUserId
                                })
                                orderSave.save();
                                res.status(200).json({success : true, message: service})
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
    getServiceOrderDetails : function(req, res){
        var productDetails,customerDetail,serviceProviderDetail;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var serviceOrder =  await orderModel.find({providerId : user.id}).sort([['_id', -1]]);
                    for(var x = 0; x < serviceOrder.length ; x++){
                        customerDetail =  await customerModel.findOne({_id : serviceOrder[x].customerId});
                        productDetails =  await productModel.findOne({_id : serviceOrder[x].id});
                        providerDetail =  await userModel.findOne({_id : serviceOrder[x].providerId}).select("name").select("email").select("phone")
                        .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('active')
                        .sort([['_id', -1]]);;
                        serviceOrder[x].customer = customerDetail;
                        serviceOrder[x].product = productDetails;
                        serviceOrder[x].providerDetail = providerDetail;
                    }
                    res.status(200).json({success : true,message: serviceOrder})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllOrder : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var orders =  await orderModel.find({}).sort([['_id', -1]]);
                    res.status(200).json({success : true,message: orders})
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
        var productDetails,customerDetail,serviceProviderDetail;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myOrders =  await orderModel.find({userId : user.id}).sort([['_id', -1]]);
                    if(myOrders.length > 0){
                        for(var x = 0; x < myOrders.length ; x++){
                            customerDetail =  await customerModel.findOne({_id : myOrders[x].customerId});
                            productDetails =  await productModel.findOne({_id : myOrders[x].id});
                            serviceProviderDetail =  await userModel.findOne({_id : myOrders[x].providerId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('active')
                            .sort([['_id', -1]]);;
                            myOrders[x].customer = customerDetail;
                            myOrders[x].product = productDetails;
                            myOrders[x].providerDetail = serviceProviderDetail;
                        }
                    }
                    res.status(200).json({success : true, message: myOrders})
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
                    var myOrders =  await orderModel.findOne({_id : req.body.id}).lean();
                    if(myOrders != null){
                        customerDetail =  await customerModel.findOne({_id : myOrders.customerId});
                        productDetails =  await productModel.findOne({id : myOrders.id});
                        myOrders.customer = customerDetail;
                        myOrders.product = productDetails;
                    }
                    res.status(200).json({success : true, message: myOrders})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    orderPending : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var customer,product;
                    var orders =  await orderModel.find({approved : 0}).lean();
                    if(orders.length > 0){
                        for(var x = 0; x < orders.length ; x++){
                            customer =  await customerModel.findOne({_id : orders[x].customerId});
                            product =  await productModel.findOne({id : orders[x].id});
                            orders[x].customer = customer;
                            orders[x].product = product;
                        }
                    }
                    res.status(200).json({success : true, message: orders})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    allOrders : function(req, res){
        
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var cust,prod;
                    var orderDetail =  await orderModel.find({}).lean();
                    if(orderDetail.length > 0){
                        for(var x = 0; x < orderDetail.length ; x++){
                            cust =  await customerModel.findOne({_id : orderDetail[x].customerId});
                            prod =  await productModel.findOne({id : orderDetail[x].id});
                            orderDetail[x].customer = cust;
                            orderDetail[x].product = prod;
                        }
                    }
                    res.status(200).json({success : true, message: orderDetail})
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
                    var orders =  await orderModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            approved : req.body.status
                        },{
                        new: true
                    }).lean();
                    if(orders.length > 0){
                        customerDetail =  await customerModel.findOne({_id : orders.customerId});
                        productDetails =  await productModel.findOne({id : orders.id});
                        orders.customer = customerDetail;
                        orders.product = productDetails;
                    }
                    res.status(200).json({success : true, message: orders})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getDetailsCount : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myOrders =  await orderModel.find({userId : user.id}).sort([['_id', -1]]);
                    var service = await serviceModel.find({userId : user.id}).sort([['_id', -1]]);
                    var booking =  await bookingModel.find({userId : user.id}).sort([['_id', -1]]);
                    res.status(200).json({success : true, orders : myOrders.length , service : service.length , booking : booking.length})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}
