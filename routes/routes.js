const userModel = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require('express');
const upload = require('../middleware/upload');
const uploadVideo = require('../middleware/uploadVideo');
const postModel = require('../models/postModel');

const router = express.Router()

module.exports = router;

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



//Get post
router.post('/getmyposts', async (req, res) => {
    jwt.verify(req.headers.token, 'bootspider', function(err, decode) {
      	if (err) throw err;
      	res.send(decode.id);
    });
})



//Upload Photos
router.post('/uploadphoto',upload.single("file"), async (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', function(err, user){
        	if (err) throw err;
			const imgUrl = `${req.file.filename}`;
            res.status(200).json({success : true,message: imgUrl})
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

//Upload Photos
router.post('/uploadvideo',uploadVideo.single("video"), async (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', function(err, user){
        	if (err) throw err;
			const videoUrl = `${req.video.filename}`;
            res.status(200).json({success : true,message: videoUrl})
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

//Get by ID Method
router.post('/uploadpost',async (req, res) => {
    try{
    	jwt.verify(req.headers.token, 'bootspider', function(err, user){
        	if (err) throw err;
			let post = new postModel({
				userId : user.id,
				description : req.body.description,
				imageLink : req.body.imageUrl,
				videoUrl : req.body.videoUrl,
				postType : req.body.postType
			})
			post.save();
            res.status(200).json({success : true,message: "Post uploaded successfully"})
		});
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
