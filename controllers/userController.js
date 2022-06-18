const biographyModel = require('../models/biographyModel');
const userModel = require('../models/user');
const addPhotoModel = require('../models/addPhotoModel');
const addVideoModel = require('../models/addVideoModel');
const serviceProviderModel = require('../models/serviceProviderModel');
const jwt = require("jsonwebtoken");
var request = require('request');


module.exports = {
    userDetails : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userDetail = await userModel.find({_id : req.body.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
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
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    res.status(200).json({success : true,message: userDetail})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    changeUserStatus : function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userStauts =  await userModel.findOneAndUpdate({_id : req.body.id}, {
                        active : req.body.active
                    },{
                        new: true
                    });
                    res.status(200).json({success : true, message: userStauts})
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
                    userDetails =  await userModel.findOneAndUpdate({_id : user.id}, {
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
                    vndrDetails =  await userModel.findOneAndUpdate({_id : user.id}, {
                        name : req.body.name,
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
    myBiography : async function(req, res){ 
        try{
            let userDetail = await userModel.findOne({_id : req.body.id}).select("name").select("email").select("phone")
            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
            const images = await addPhotoModel.find({userId : user.id});
            const videos = await addVideoModel.find({userId : user.id});
            res.status(200).json({success : true, biography: userDetail, photos : images.length, videos: videos.length})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    vendorBiography : async function(req, res){ 
        try{
            let vendorDetails = await userModel.findOne({_id : req.body.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("address").select("active").lean();
            const images = await addPhotoModel.find({userId : req.body.id});
            const videos = await addVideoModel.find({userId : req.body.id});
            const providerDetails = await serviceProviderModel.find({userId : req.body.id});
            vendorDetails.providerDetail = providerDetails
            res.status(200).json({success : true, biography:vendorDetails, photos : images.length, videos: videos.length})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserPhotos : async function(req, res){ 
        try{
            const images = await addPhotoModel.find({userId : req.body.id}).sort([['_id', -1]]);
            res.status(200).json({success : true, message: images})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserVideos : async function(req, res){ 
        try{
            const videos = await addVideoModel.find({userId : req.body.id}).sort([['_id', -1]]);
            res.status(200).json({success : true, message: videos})
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
    getPhoto : async function(req, res){ 
        try{
            const photoDetails = await addPhotoModel.findOne({_id : req.body.id});
            res.status(200).json({success : true, message: photoDetails})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getVideo : async function(req, res){ 
        try{
            const videoDetails = await addVideoModel.findOne({_id : req.body.id});
            res.status(200).json({success : true, message: videoDetails})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getTypeVendor : async function(req, res){ 
        var vendor;
        try{
             if(req.body.category == ''){
                vendor = await userModel.find({typeVendor : req.body.typeVendor}).select("name").select("email").select("phone")
                .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('active')
                .sort([['_id', -1]]);
             }
             else{
                vendor = await userModel.find({$and : [{typeVendor : req.body.typeVendor},{category : req.body.category}]}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('active')
                    .sort([['_id', -1]]);
                }
            res.status(200).json({success : true, message: vendor})
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
                    const users = await userModel.find({userType : 'user'}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active")
                    .sort([['_id', -1]]);
                    res.status(200).json({success : true, message: users})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    searchByVendorName : async function(req, res){
        try{
            var users = await userModel.find({name: { $regex: '.*' + req.body.name + '.*' }, userType : 'vendor'}).sort([['_id', 'desc']]);
            res.status(200).json({success : true, message: users})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getPanchang : async function(req, res){
        try{
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();  
            var date = day + "/" + month + "/" + year;
            var hours = date_ob.getHours();
            var minutes = date_ob.getMinutes();
            var seconds = date_ob.getSeconds();
            var time = hours + ":" + minutes + ":" + seconds;
            request.get('http://api.panchang.click/v0.4/panchangapi?date='+date+'&time='+time+'&tz=5.5&userid=jinendr&authcode=aa34cab0326e2ef1221ce1f959b5b9ee', function (error, response, body) {
                if(!error){
                    res.status(200).json({success : true, message: body})
                }
                else{
                    res.status(200).json({success : true, message: error})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}