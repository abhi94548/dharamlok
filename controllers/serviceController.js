const serviceModel = require('../models/addServiceModel');
const serviceCategoryModel = require('../models/serviceCategoryModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addService : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let service = new serviceModel({
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
                    const service = await serviceModel.find({userId : req.body.id}).sort([['_id', -1]]);
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
            const service =  await serviceModel.find({category : req.body.category}).sort([['_id', -1]]);
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
        let service;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    service =  await serviceModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            services : req.body.services,
                            type : req.body.type,
                            place : req.body.place,
                            price: req.body.price,
                            imageUrl : req.body.imageUrl,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: service})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    addCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let serviceCat = new serviceCategoryModel({
                        userId : user.id,
                        name : req.body.name,
                    })
                    serviceCat.save();
                    res.status(200).json({success : true,message: serviceCat})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var serviceCat = await serviceCategoryModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: serviceCat})
    },
    deleteCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                serviceCategoryModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Service Category Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}