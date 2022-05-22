const Razorpay = require('razorpay');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
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
                    const product = await productModel.findOne({_id : req.body.productId}).select("price");
                    var amount = product.price;
                    const currency = 'INR'
                    await razorpayInstance.orders.create({amount, currency}, 
                    (error, order)=>{
                        if(!err){
                            let orderSave = new orderModel({
                                userId : user.id,
                                orderId : order.id,
                                productId : req.body.productId,
                                amount : product.price
                            })
                            orderSave.save();
                            res.status(200).json({success : true, message: order})
                        }
                        else
                            res.status(400).json({success : false,message: error.message});
                        }
                    )
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
                        res.status(200).json({success : true, message: "Payment Successful"})
                    }
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteOrder : function (res, req){
        result = await postModel.deleteMany();
        res.status(200).json({success : true, message: result})
    }
}
