const audioModel = require('../models/audioModel');
const audioCategoryoModel = require('../models/audioCategory');
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
                    audio.save();
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
            const audio =  await audioModel.find({}).sort([['_id', -1]]);
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
                    audio =  await audioModel.findOneAndUpdate({_id : req.body.id}, 
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
    },
    addCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let audioCat = new audioCategoryoModel({
                        userId : user.id,
                        name : req.body.name,
                    })
                    audioCat.save();
                    res.status(200).json({success : true,message: audioCat})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var audioCat = await audioCategoryoModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: audioCat})
    },
    deleteCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                audioCategoryoModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Category Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateAudioCategory : function(req, res){
        let audCat;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    audCat =  await audioCategoryoModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            name : req.body.name,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: audCat})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}