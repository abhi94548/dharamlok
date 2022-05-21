const serviceModel = require('../models/addServiceModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addService : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let service = new addServiceModel({
                        userId : user.id,
                        services : req.body.services,
                        type : req.body.type,
                        place : req.body.place,
                        price: req.body.price,
                        imageUrl : req.body.imageUrl,
                    })
                    service.save();
                    res.status(200).json({success : true,message: service})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myService : function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const service = await addServiceModel.find({userId : user.id});
                    res.status(200).json({success : true, message: service})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}