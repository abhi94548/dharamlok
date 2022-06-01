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
const templeController = require('../controllers/templeController');
const eBookController = require('../controllers/ebookController');
const path = require('path');
const ebookController = require("../controllers/ebookController");
const customerController = require("../controllers/customerController");
const dharamshalaController = require("../controllers/dharamshalaController");
const adController = require("../controllers/adController");
const bookingController = require("../controllers/bookingController");

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
router.route('/dharamguru').get(userController.getDharamguru)
router.route('/vendor').post(userController.getTypeVendor)
router.route('/getvendordetail').get(userController.vendorBiography)
router.route('/updatevendorbio').get(userController.updateBiographyVendor)
router.route('/updateserviceprovider').get(userController.updateBiographyServiceProvider)
router.route('/users').get(userController.getallUsers)
router.route('/searchvendor').get(userController.searchByVendorName)

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
router.route('/getservicedetail').get(serviceController.getServiceById);
router.route('/deleteservice').post(serviceController.deleteService);
router.route('/updateservice').post(serviceController.updateService);
router.route('/getallservice').get(serviceController.getAllService);

//////////////////Product Route///////////////
router.route('/addproduct').post(productController.addProduct);
router.route('/productdetail').post(productController.productDetail);
router.route('/getallproduct').get(productController.getAllProduct);
router.route('/myproduct').get(productController.myProduct);
router.route('/updateproduct').post(productController.updateProduct);
router.route('/deleteproduct').post(productController.deleteProduct);
router.route('/addcategory').post(productController.addCategories);
router.route('/getallcategory').get(productController.getAllCategories);
router.route('/deletecategory').post(productController.deleteCategory);
router.route('/search').post(productController.search);
router.route('/searchcategory').post(productController.searchByCategory);
router.route('/searchtype').post(productController.searchByType);



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


//////////////////Booking Route///////////////

router.route('/addbooking').post(bookingController.createBooking);
router.route('/getallbooking').get(bookingController.getAllBooking);
router.route('/deletebooking').post(bookingController.deleteBooking);
router.route('/updatebooking').post(bookingController.updateBooking);
router.route('/getbooking').post(bookingController.getBookingById);
router.route('/mybooking').get(bookingController.myBooking);


//////////////////Dharamshala Route///////////////

router.route('/adddharamshala').post(dharamshalaController.createDharamshala);
router.route('/getalldharamshala').get(dharamshalaController.getAllDharamshala);
router.route('/deletedharamshala').post(dharamshalaController.deleteDharamshala);
router.route('/updatedharamshala').post(dharamshalaController.updateDharamshala);
router.route('/getdharamshala').post(dharamshalaController.getDharamshalaById);

//////////////////Bal Vidya Route///////////////


router.route('/createbalvidya').post(balVidyaController.createBalVidya); 
router.route('/getallbalvidya').get(balVidyaController.getAllBalVidya);
router.route('/deletebalvidya').post(balVidyaController.deleteBalVidya);
router.route('/updatebalvidya').post(balVidyaController.updateBalVidya);
router.route('/getbalvidya').post(balVidyaController.getBalVidyaById);



//////////////////Ad Route///////////////


router.route('/createad').post(adController.createAd); 
router.route('/getallad').get(adController.getAllAd);
router.route('/deletead').post(adController.deleteAd);
router.route('/updatead').post(adController.updateAd);
router.route('/getad').post(adController.getAdById);

//////////////////Dharshan Route///////////////

router.route('/createdharshan').post(dharshanController.createDharshan);
router.route('/getalldharshan').get(dharshanController.getAllDharshan);
router.route('/deletedharshan').post(dharshanController.deleteDharshan);
router.route('/updatedharshan').post(dharshanController.updateDharshan);
router.route('/getdharshan').post(dharshanController.getDharshanById);



////////////////Order Route////////////////////
router.route('/createorder').post(orderController.createOrder);
router.route('/verifyorder').post(orderController.verifyOrder);
router.route('/deleteorder').post(orderController.deleteOrder);
router.route('/myorder').get(orderController.myOrders);
router.route('/getorderdetail').post(orderController.orderDetailById);
router.route('/pendingorder').get(orderController.orderPending);
router.route('/allorder').get(orderController.orderApproved);
router.route('/approveorder').post(orderController.approveOrder);


//////////////////Temple Route///////////////


router.route('/createtemple').post(templeController.addTemple); 
router.route('/gettempledetail').post(templeController.templeDetailById);
router.route('/deletetemple').post(templeController.deleteTemple);
router.route('/updatetemple').post(templeController.updateTemple);
router.route('/getalltemples').get(templeController.getAllTemple);


//////////////////EBook Route///////////////


router.route('/createebook').post(eBookController.createEbook); 
router.route('/getebookdetail').post(eBookController.getEbookById);
router.route('/deleteebook').post(eBookController.deleteEbook);
router.route('/updateebook').post(ebookController.updateEbook);
router.route('/getallebook').get(ebookController.getAllEbook);


//////////////////Customer Route///////////////

router.route('/addcustomer').post(customerController.createCustomer); 
router.route('/getallcustomer').get(customerController.getAllCustomer);
