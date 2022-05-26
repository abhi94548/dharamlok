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
    },
    getAllService : async function(req, res) {
        try{
            const service =  await serviceModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: service})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getServiceById : async function(req, res) {
        try{
            const service =  await serviceModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: service})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteService : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                serviceModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'EBook Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateService : function(req, res){
        let Service;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    Service =  await eBookModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            services : req.body.services,
                            type : req.body.type,
                            place : req.body.place,
                            price: req.body.price,
                            imageUrl : req.body.imageUrl,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: Service})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    }
}