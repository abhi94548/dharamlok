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
                        category : req.body.category,
                        type : req.body.type,
                        PDFuploadUrl : req.body.PDFuploadUrl,
                        thumbNailImageUrl: req.body.thumbNailImageUrl,
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
    getAllBalVidya : async function(req, res) {
        try{
            const bal =  await balVidyaModel.find({name : req.body.name}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: bal})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getBalVidyaById : async function(req, res) {
        try{
            const balVidya =  await balVidyaModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: balVidya})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteBalVidya : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                balVidyaModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Bal Vidya Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBalVidya : function(req, res){
        let balVidya;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    balVidya =  await balVidyaModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            name : req.body.name,
                            description : req.body.description,
                            category : req.body.category,
                            type : req.body.type,
                            PDFuploadUrl : req.body.PDFuploadUrl,
                            thumbNailImageUrl: req.body.thumbNailImageUrl,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: balVidya})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}