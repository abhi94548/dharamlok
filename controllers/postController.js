const postModel = require('../models/postModel');
const biographyModel = require('../models/biographyModel');
const likeModal = require('../models/likeModel');
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const commentModel = require('../models/commentModel');


module.exports = {
    uploadPost : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var userDetails = await userModel.findOne({_id : user.id}).select("name").select("profileImageUrl");
                    let post = new postModel({
                        userId : user.id,
                        userName : userDetails.name,
                        userImage : userDetails.profileImageUrl,
                        description : req.body.description,
                        imageUrl : req.body.imageUrl,
                        videoUrl : req.body.videoUrl,
                        postType : req.body.postType,
                        userType : req.body.userType,
                    })
                    post.save();
                    res.status(200).json({success : true,message: post})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserPost : async function(req, res) {
        try{
            const result = await postModel.find({userId : req.body.id}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: result})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllPost : async function(req, res){
        try{
            //var result = await postModel.find({}).sort([['_id', 'desc']]);
            var result = await commentModel.deleteMany();
            res.status(200).json({success : true,message: result}) 
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    likePost : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                let id = req.body.postId
                let like;
                var isLiked = await likeModal.findOne({userId: user.id, postId : id});
                if(!isLiked){
                    postModel.findOneAndUpdate({_id : id }, {$inc : {like : 1}}, function(err, response){
                        if (err) res.status(400).json({success : false, message: 'Error posting comment'});
                        like = new likeModal({
                            userId : user.id,
                            postId : id,
                        })
                        like.save(); 
                        res.status(200).json({success : true, message: 'Success'})
                    });	
                }
                else{
                    res.status(400).json({success : false, message: 'Already added'})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    unlikePost : function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                let id = req.body.postId
                postModel.findOneAndUpdate({_id : id }, {$inc : {like : -1}}, function(err, response){
                    if (err) throw err;
                    likeModal.findByIdAndDelete({_id : id } , function(errorDelete, response){
                        if (errorDelete) throw errorDelete;
                        else res.status(200).json({success : true, message: 'post unliked'})
                    });
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    viewPost : async function(req, res){
        try{
            let id = req.body.postId
            const post = await postModel.find({_id : id});
            const comment = await commentModel.find({postId : id});
            res.status(200).json({success : true, post: post , comment : comment})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    mostLikedPost : async function(req, res){
        try{
            const post = await postModel.find({}).sort([['like', -1]]).limit(5).skip(10 * req.query.page);
            res.status(200).json({success : true, post: post })
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}