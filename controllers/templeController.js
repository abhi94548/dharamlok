const templeModel = require('../models/templeModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addTemple : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let temple = new templeModel({
                        userId : user.id,
                        bannerImageUrl : req.body.bannerImageUrl,
                        city : req.body.city,
                        description : req.body.description,
                        location: req.body.location,
                        name : req.body.name,
                        relatedImageUrl : req.body.relatedImageUrl,
                        state: req.body.state,
                        category: req.body.category,
                    })
                    temple.save();
                    res.status(200).json({success : true,message: temple})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    templeDetailById : async function(req, res){
        var temple = await templeModel.find({_id : req.body.templeId});
        res.status(200).json({success : true,message: temple}) 
    },
    getAllTemple : async function(req, res){
        var temple
        if(req.body.category == ''){
            temple = await templeModel.find({}).sort([['_id', 'desc']]);
        }
        else{
            temple = await templeModel.find({$or : [{ category : req.body.category , city : req.body.city , state : req.body.state}]}).sort([['_id', 'desc']]);
        }
        
        res.status(200).json({success : true,message: temple})
    },
    updateTemple : function(req, res){
        let templeUpdate;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    templeUpdate =  await templeModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            bannerImageUrl : req.body.bannerImageUrl,
                            city : req.body.city,
                            description : req.body.description,
                            location: req.body.location,
                            name : req.body.name,
                            relatedImageUrl : req.body.relatedImageUrl,
                            state: req.body.state,
                            category: req.body.category,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: templeUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteTemple : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                templeModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Temple Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}