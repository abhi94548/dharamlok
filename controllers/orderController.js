const Razorpay = require('razorpay');
const productModel = require('../models/productModel');
const jwt = require("jsonwebtoken");


const razorpayInstance = new Razorpay({
    key_id: "rzp_live_FXjOhgXoALsSB6",
    key_secret: "3RJqLFFGZGwqLO2zwtM4tzD5"
});


module.exports = {
    createOrder : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const product = await productModel.findOne({_id : req.body.productId}).select("price");
                    var amount = product.price;
                    res.status(200).json({success : true, message: product.price})
                    // const currency = 'INR'
                    // razorpayInstance.orders.create({amount, currency}, 
                    // (error, order)=>{
                    //     if(!err)
                    //         res.status(200).json({success : true, message: order})
                    //     else
                    //         res.status(400).json({success : false,message: error.message});
                    //     }
                    // )
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}
