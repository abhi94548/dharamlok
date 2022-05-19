const userModel = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require('express');
const uploadVideo = require('../middleware/uploadVideo');
const postModel = require('../models/postModel');
const comment = require('../models/commentModel');
const multer = require("multer");
const commentModel = require('../models/commentModel');
const biographyModel = require('../models/biographyModel');
const addPhotoModel = require('../models/addPhotoModel');
const addVideoModel = require('../models/addVideoModel');
const likeModal = require('../models/likeModel');
const eventModel = require('../models/eventModel');
const addServiceModel = require('../models/addServiceModel');
const productModel = require('../models/productModel');
const path = require('path');
const e = require('cors');

const router = express.Router();

module.exports = router;

var storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null,'assets')
	},
	filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
	}
});

const upload = multer({
	storage: storage
}) 

//Sign Up
router.post('/signup',
	async (req, res) => {
     try {
	 const {
            	name,
		phone,
            	email,
            	password,
		userType
           } = req.body;
	let user = await userModel.findOne({
                email
        });
	if (user) {
                return res.status(400).json({
                    success : false, message: "user already exists"
                });
         }
	user =  new userModel({
        	name,
       		phone,
        	email,
			password,
			userType
         })
	const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
	const payload = {
              id: user.id
            };

         jwt.sign(
                payload,
                "bootspider", {
                    expiresIn: '10d'
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
			    success: true, message : 
			    [{
			       token : token,
			       name  : user.name,
			       email : user.email,
			       phoneNumber : user.phone,
		               userType : user.userType,
			    }]
                    });
                }
        );
    }
    catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

//Login
router.post('/login',
	async (req, res) => {
     try {
	 const {
            	email,
            	password
           } = req.body;
	let user = await userModel.findOne({
		email
        });
	if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
		if(validPassword){
                	 const payload = {
                    		id: user.id
            		};

         		jwt.sign(
                		payload,
                		"bootspider", {
                    		expiresIn: '10d'
                		},
                	(err, token) => {
                    		if (err) throw err;
                    		res.status(200).json({
                            		success: true, message :
                            			[{	
                               			token : token,
                              			name  : user.name,
                               			email : user.email,
                               			phoneNumber : user.phone,
                               			userType : user.userType,
                            			}]
                    			});
                		}
        		);
		}
		else{
			return res.status(200).json({
                                success : false, message: "Invalid email/password"
                        });
		}
         }
	 else
	     {
		 return res.status(400).json({
			success:false, message:"No user exists"
	     	});
	     }
    }
    catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


//Get User Details
router.post('/userdetails',(req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let userDetail = await userModel.find({_id : req.body.id}).select("name").select("email").select("phone");
				res.status(200).json({success : true,message: userDetail})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.get('/mydetails',(req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let userDetail = await userModel.find({_id : user.id}).select("name").select("email").select("phone");
				res.status(200).json({success : true,message: userDetail})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})



//Upload Photos
router.post('/uploadphoto',upload.single("file"), async (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const imgUrl = `${req.file.filename}`;
				res.status(200).json({success : true,message: imgUrl})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

//Upload Photos
router.post('/uploadvideo',upload.single("video"), async (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const videoUrl = `${req.file.filename}`;
				res.status(200).json({success : true,message: videoUrl})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

//Get by ID Method
router.post('/uploadpost',async (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				var userDetails = await userModel.findOne({_id : user.id}).select("name");
				var biographyDetails = await biographyModel.findOne({id : user.id}).select("profileImageUrl");
				let post = new postModel({
					userId : user.id,
					userName : userDetails.name,
					userImage : biographyDetails.profileImageUrl,
					description : req.body.description,
					imageLink : req.body.imageUrl,
					videoUrl : req.body.videoUrl,
					postType : req.body.postType
				})
				post.save();
				res.status(200).json({success : true,message: post})
		    }
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.get('/getmypost', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const result = await postModel.find({userId : user.id}).sort([['createdAt', -1]]);
				res.status(200).json({success : true,message: result})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.get('/getallpost', (req, res) => {

    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				var i,j = 0
				var result = await postModel.find({}).sort([['createdAt', -1]]);
				var userLikedPosts = await likeModal.find({userId : user.id});
				for (i = 0; i < userLikedPosts.length; i++){
					for (j = 0; j < result.length; j++){
						if(userLikedPosts[i].postId == result[j]._id){
							result[j].isLiked = true
						}
						else{
							result[j].isLiked = false
						}
					}
				}
				res.status(200).json({success : true,message: result}) 
			}  
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.post('/commentpost', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let comment = new commentModel({
					userId : user.id,
					postId : req.body.postId,
					comment : req.body.comment,
				})
				comment.save();
				let id = req.body.postId
				postModel.findOneAndUpdate({_id : id }, {$inc : {comment : 1}}, {new : true}, function(error, response){
					if (error) throw error;
					else res.status(200).json({success : true,message: comment})
				});
		    }
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.post('/getcomment', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			const comments = await commentModel.find({postId : req.body.postId, approved : 1}).sort([['createdAt', -1]]);
			res.status(200).json({success : true,message: comments})
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.post('/likepost', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			let id = req.body.postId
			let like;
			var isLiked = await likeModal.findOne({userId: user.id, postId : id});
            if(!isLiked){
				postModel.findOneAndUpdate({_id : id }, {$inc : {like : 1}}, function(err, response){
					if (err) throw err;
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
})

router.delete('/unlikepost', (req, res) => {
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
})

router.post('/viewpost', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let id = req.body.postId
				const post = await postModel.find({_id : id});
				const comment = await commentModel.find({postId : id});
				res.status(200).json({success : true, post: post , comment : comment})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.get('/mostliked', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const post = await postModel.find({}).sort([['like', -1]]).limit(10);
				res.status(200).json({success : true, post: post })
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.post('/updatebiography', (req, res) => {
	let biography;
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
            else{
				let previousBiography = await biographyModel.findOne({userId : user.id});
				updatedParameter = req.body.updatedParameter;
				if(previousBiography){
					if(updatedParameter == 0){
						biography = await biographyModel.findOneAndUpdate({userId : user.id} ,{description : req.body.description},{
							new: true,
						});
					}
					else if(updatedParameter == 1){
						biography =  await biographyModel.findOneAndUpdate({userId : user.id} ,{profileImageUrl : req.body.profileImageUrl},{
							new: true
						});
					}
					else if(updatedParameter == 2){
						biography =  await biographyModel.findOneAndUpdate({userId : user.id}, {coverImageUrl : req.body.coverImageUrl},{
							new: true
						});
					}
					else if(updatedParameter == 3){
						biography =  await biographyModel.findOneAndUpdate({userId : user.id}, {category : req.body.category},{
							new: true
						});
					}
					
				}
				else{
					biography = new biographyModel({
						userId : user.id,
						name: req.body.name ?? '',
						description : req.body.description ?? '',
						profileImageUrl : req.body.profileImageUrl ?? '',
						coverImageUrl : req.body.coverImageUrl ?? '',
						category : req.body.category ?? '',
					})
					biography.save();
				}
				res.status(200).json({success : true, message: biography})
		    }
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.post('/addphoto', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let addPhoto = new addPhotoModel({
					userId : user.id,
					description : req.body.description,
					title : req.body.title,
					imageUrl : req.body.imageUrl,
				})
				addPhoto.save();
				res.status(200).json({success : true, message: addPhoto})
		    }
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.post('/addvideo', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let addVideo = new addVideoModel({
					userId : user.id,
					title : req.body.title,
					description : req.body.description,
					videoUrl : req.body.videoUrl,
				})
				addVideo.save();
				res.status(200).json({success : true, message: addVideo})
		    }
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.get('/myphotos', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const images = await addPhotoModel.find({userId : user.id}).sort([['createdAt', -1]]);
				res.status(200).json({success : true, message: images})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.post('/getphoto', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const photoDetails = await addPhotoModel.findOne({_id : req.body.id});
				res.status(200).json({success : true, message: photoDetails})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.post('/getvideo', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const videoDetails = await addVideoModel.findOne({_id : req.body.id});
				res.status(200).json({success : true, message: videoDetails})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.get('/myvideos', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const videos = await addVideoModel.find({userId : user.id}).sort([['createdAt', -1]]);
				res.status(200).json({success : true, message: videos})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.get('/mybiography', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const biography = await biographyModel.findOne({userId : user.id}).limit(1);
				res.status(200).json({success : true, message: biography})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.post('/addevent', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let event = new eventModel({
					userId : user.id,
					title : req.body.title,
					description : req.body.description,
					place : req.body.place,
					type: req.body.type,
					bannerImageUrl : req.body.bannerImageUrl,
					relatedImageUrl : req.body.relatedImageUrl,
					location : req.body.location
				})
				event.save();
				res.status(200).json({success : true,message: event})
		    }
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.post('/addservice', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let service = new addServiceModel({
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
})

router.get('/myevents', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const event = await eventModel.find({userId : user.id});
				res.status(200).json({success : true, message: event})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.get('/myservice', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				const service = await addServiceModel.find({userId : user.id});
				res.status(200).json({success : true, message: service})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.post('/addproduct', (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
			else{
				let product = new productModel({
					userId : user.id,
					title : req.body.title,
					type : req.body.type,
					description : req.body.description,
					price: req.body.price,
					imageUrl : req.body.imageUrl,
					pricePerUnit : req.body.pricePerUnit,
					category: req.body.category,
				})
				product.save();
				res.status(200).json({success : true,message: product})
			}
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})


router.post('/approvecomment', (req, res) => {
	let comment;
    try{
    	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
        	if (err) res.status(400).json({success : false,message: err.message});
            else{
				comment =  await  commentModel.findOneAndUpdate({_id : req.body.postId}, {approved : 1},{
					new: true
				});
				res.status(200).json({success : true, message: comment})
		    }
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})





//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
