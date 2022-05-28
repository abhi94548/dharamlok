const adModel = require('../models/adModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createAd : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let ad = new adModel({
                        userId : user.id,
                        name : req.body.name,
                        description : req.body.description,
                        phone : req.body.phone,
                    })
                    ad.save();
                    res.status(200).json({success : true,message: ad})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllAd : async function(req, res) {
        try{
            const ad =  await adModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: ad})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAdById : async function(req, res) {
        try{
            const ad =  await adModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: ad})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteAd : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                adModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Ad Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateAd : function(req, res){
        let ad;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    ad =  await adModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            name : req.body.name,
                            description : req.body.description,
                            phone : req.body.phone
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: ad})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}