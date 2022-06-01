const audioModel = require('../models/audioModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addAudio : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let audio = new audioModel({
                        userId : user.id,
                        title : req.body.title,
                        description : req.body.description,
                        category : req.body.category,
                        bannerImageUrl : req.body.bannerImageUrl,
                        audioUrl : req.body.audioUrl
                    })
                    dharshan.save();
                    res.status(200).json({success : true,message: audio})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllAudio : async function(req, res) {
        try{
            const audio =  await audioModel.find({}).sort([['createdAt', -1]]);
            res.status(200).json({success : true,message: audio})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getAudioById : async function(req, res) {
        try{
            const audio =  await audioModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: audio})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteAudio : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                audioModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Audio Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateAudio : function(req, res){
        let audio;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    audio =  await dharshanModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            title : req.body.title,
                            description : req.body.description,
                            category : req.body.category,
                            bannerImageUrl : req.bodybannerImageUrl,
                            audioUrl : req.body.audioUrl
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: audio})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    }
}