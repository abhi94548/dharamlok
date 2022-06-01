const biographyModel = require('../models/biographyModel');
const userModel = require('../models/user');
const addPhotoModel = require('../models/addPhotoModel');
const addVideoModel = require('../models/addVideoModel');
const serviceProviderModel = require('../models/serviceProviderModel');
const jwt = require("jsonwebtoken");


module.exports = {
    userDetails : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userDetail = await userModel.find({_id : req.body.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor");
                    res.status(200).json({success : true,userDetails: userDetail})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myDetails : function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userDetail = await userModel.find({_id : user.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor");
                    res.status(200).json({success : true,message: userDetail})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBiography : async function(req, res){
        let userDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    userDetails =  await userModel.findOneAndUpdate({userId : user.id}, {
                        description : req.body.description,
                        profileImageUrl : req.body.profileImageUrl,
                        coverImageUrl : req.body.coverImageUrl,
                        category : req.body.category},{
                        new: true
                    });
                    res.status(200).json({success : true, message: userDetails})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBiographyVendor : async function(req, res){
        let vndrDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    vndrDetails =  await userModel.findOneAndUpdate({userId : user.id}, {
                        name : req.body.name,
                        email : req.body.email,
                        phone : req.body.phone,
                        address : req.body.address,
                        profileImageUrl : req.body.profileImageUrl,
                    },{
                        new: true
                    });
                    res.status(200).json({success : true, message: vndrDetails})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBiographyServiceProvider : async function(req, res){
        let srvPvdrDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    srvPvdrDetails =  await userModel.findOneAndUpdate({userId : user.id}, {
                        name : req.body.name,
                        email : req.body.email,
                        phone : req.body.phone,
                        address : req.body.address,
                        buisnessName: req.body.buisnessName,
                        profileImageUrl: req.body.profileImageUrl,
                        gstNo: req.body.gstNo,
                        bankName: req.body.bankName,
                        IFSC: req.body.ifsc,
                        accountNo: req.body.accountNo,
                    },{ 
                        returnDocument: true,
                        upsert: true
                    });
                    res.status(200).json({success : true, message: srvPvdrDetails})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myBiography : function(req, res){ 
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userDetail = await userModel.findOne({_id : user.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor");
                    const images = await addPhotoModel.find({userId : user.id});
                    const videos = await addVideoModel.find({userId : user.id});
                    res.status(200).json({success : true, biography: userDetail, photos : images.length, videos: videos.length})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    vendorBiography : function(req, res){ 
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let vendorDetails = await userModel.findOne({_id : user.id}).select("name").select("email").select("phone").select("address").select("profileImageUrl");
                    res.status(200).json({success : true, biography:vendorDetails})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myPhotos : function(req, res){ 
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const images = await addPhotoModel.find({userId : user.id}).sort([['_id', -1]]);
                    res.status(200).json({success : true, message: images})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myVideos : function(req, res){ 
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
    },
    addPhoto : function(req, res){ 
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
    },
    addVideo : function(req, res){ 
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
    },
    getPhoto : function(req, res){ 
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
    },
    getVideo : function(req, res){ 
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
    },
    getTypeVendor : async function(req, res){ 
        try{
            const vendor = await userModel.find({typeVendor : req.body.typeVendor}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category")
                    .sort([['_id', -1]]);
                    res.status(200).json({success : true, message: vendor})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getDharamguru : async function(req, res){ 
        try{
            const dharamguru = await userModel.find({typeVendor : 'Dharamguru'}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category")
                    .sort([['_id', -1]]);
                    res.status(200).json({success : true, message: dharamguru})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getallUsers : function(req, res){ 
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const users = await userModel.find({}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor")
                    .sort([['_id', -1]]);
                    res.status(200).json({success : true, message: users})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    searchByVendorName : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var users = await userModel.find({name: { $regex: '.*' + req.body.name + '.*' }, userType : 'vendor'}).sort([['_id', 'desc']]);
                res.status(200).json({success : true, message: users})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}