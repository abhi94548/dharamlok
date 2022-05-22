const jwt = require("jsonwebtoken");
const express = require('express');
const multer = require("multer");
const serviceController = require('../controllers/serviceController');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const eventController = require('../controllers/eventController');
const balVidyaController = require('../controllers/balVidyaController');
const dharshanController = require('../controllers/dharshanController');
const orderController = require('../controllers/orderController');
const path = require('path');

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

//////////////////Authentication Route///////////////
router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);


//////////////////User Route///////////////

router.route('/userdetails').post(userController.userDetails);
router.route('/mydetails').get(userController.myDetails);
router.route('/updatebiography').post(userController.updateBiography);
router.route('/mybiography').get(userController.myBiography);
router.route('/myphotos').get(userController.myPhotos);
router.route('/myvideos').get(userController.myVideos);
router.route('/addphoto').post(userController.addPhoto);
router.route('/addvideo').post(userController.addVideo);
router.route('/getphoto').post(userController.getPhoto)
router.route('/getvideo').post(userController.getVideo)

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

//////////////////Post Route///////////////

router.route('/uploadpost').post(postController.uploadPost);
router.route('/getmypost').get(postController.getMyPost);
router.route('/getallpost').get(postController.getAllPost);
router.route('/likepost').post(postController.likePost);
router.route('/unlikepost').post(postController.unlikePost);
router.route('/viewpost').post(postController.viewPost);
router.route('/mostliked').get(postController.mostLikedPost);

//////////////////Service Route///////////////
router.route('/addservice').post(serviceController.addService);
router.route('/myservice').get(serviceController.myService);

//////////////////Product Route///////////////
router.route('/addproduct').post(productController.addProduct);
router.route('/productdetail').post(productController.productDetail);
router.route('/getallproduct').get(productController.getAllProduct);


//////////////////Comment Route///////////////

router.route('/commentpost').post(commentController.commentPost);
router.route('/commentstatus').post(commentController.commentStatus);
router.route('/getallcomment').get(commentController.getAllComment);
router.route('/getcomment').post(commentController.getPostComment);

//////////////////Event Route///////////////

router.route('/addevent').post(eventController.addEvent);
router.route('/myevents').get(eventController.myEvents);
router.route('/getevents').get(eventController.getEvents);
router.route('/getallevents').get(eventController.getAllEvents);
router.route('/geteventdetail').post(eventController.getEventDetail);
router.route('/eventstatus').post(eventController.eventStatus);

//////////////////Bal Vidya Route///////////////


router.route('/createbalvidya').post(balVidyaController.createBalVidya); 
router.route('/getallbalvidya').get(balVidyaController.getAllBalVidya);
router.route('/deletebalvidya').post(balVidyaController.deleteBalVidya);
router.route('/updatebalvidya').post(balVidyaController.updateBalVidya);
router.route('/getbalvidya').post(balVidyaController.getBalVidyaById);

//////////////////Dharshan Route///////////////

router.route('/createdharshan').post(dharshanController.createDharshan);
router.route('/getalldharshan').get(dharshanController.getAllDharshan);
router.route('/deletedharshan').post(dharshanController.deleteDharshan);
router.route('/updatedharshan').post(dharshanController.updateDharshan);
router.route('/getdharshan').post(dharshanController.getDharshanById);



////////////////Order Route////////////////////
router.route('/createorder').post(orderController.createOrder);
router.route('/verifyorder').post(orderController.verifyOrder);
