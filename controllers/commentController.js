const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");


module.exports = {
    commentPost : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var userDetails = await userModel.findOne({_id : user.id}).select("name").select("profileImageUrl");
                    let comment = new commentModel({
                        userId : user.id,
                        userName: userDetails.name,
                        userImage : userDetails.profileImageUrl,
                        postId : req.body.postId,
                        comment : req.body.comment,
                    })
                    comment.save();
                    let id = req.body.postId
                    postModel.findOneAndUpdate({_id : id }, {$inc : {comment : 1}}, {new : true}, function(error, response){
                        if (error) res.status(200).json({success : false ,message: 'Something went wrong'});
                        else res.status(200).json({success : true,message: comment})
                    });
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllComment : async function(req, res) {
        let comment;
        try{
            comment =  await  commentModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true, message: comment})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getPostComment : async function(req, res){
        try{
            const comments = await commentModel.find({postId : req.body.postId, approved : 1}).sort([['createdAt', -1]]);
            res.status(200).json({success : true,message: comments})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    commentStatus : function(req, res){ 
        let comment;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    comment =  await  commentModel.findOneAndUpdate({_id : req.body.commentId}, {approved : req.body.approve},{
                        new: true
                    });
                res.status(200).json({success : true, message: comment})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}