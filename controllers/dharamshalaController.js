const dharamshalaModel = require('../models/dharamshalaModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createDharamshala : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let dharamshala = new dharamshalaModel({
                        userId : user.id,
                        bannerImageUrl : req.body.bannerImageUrl,
                        city : req.body.city,
                        description : req.body.description,
                        location: req.body.location,
                        name : req.body.name,
                        relatedImageUrl : req.body.relatedImageUrl,
                        state: req.body.state,
                    })
                    dharamshala.save();
                    res.status(200).json({success : true,message: dharamshala})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllDharamshala  : async function(req, res) {
        try{
            const dharamshala =  await dharamshalaModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: dharamshala})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getDharamshalaById : async function(req, res) {
        try{
            const dshala =  await dharamshalaModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: dshala})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteDharamshala  : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                dharamshalaModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Dharamshala Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateDharamshala : function(req, res){
        let dharamshala;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    dharamshala =  await dharamshalaModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            bannerImageUrl : req.body.bannerImageUrl,
                            city : req.body.city,
                            description : req.body.description,
                            location: req.body.location,
                            name : req.body.name,
                            relatedImageUrl : req.body.relatedImageUrl,
                            state: req.body.state,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: dharamshala})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}