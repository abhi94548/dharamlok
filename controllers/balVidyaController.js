const balVidyaModel = require('../models/balVidyaModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createBalVidya : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let balVidya = new balVidyaModel({
                        userId : user.id,
                        name : req.body.name,
                        description : req.body.description,
                        keyInsight : req.body.keyInsight,
                        cost: req.body.cost,
                        type : req.body.type,
                        bannerImageUrl : req.body.bannerImageUrl,
                        relatedImageUrl: req.body.relatedImageUrl,
                    })
                    balVidya.save();
                    res.status(200).json({success : true,message: balVidya})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllBalVidya : function(req, res){
       //do something
    },
    deleteBalVidya : function(req, res){
       //do something
    },
    updateBalVidya : function(req, res){
        //do something
     }
}