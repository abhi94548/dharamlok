const homeModel = require('../models/homeModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addHomePage : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let home = new homeModel({
                        userId : user.id,
                        homeBanner : req.body.homeBanner,
                        dharamGuruBanner : req.body.dharamGuruBanner,
                        kathavachakBanner : req.body.kathavachakBanner,
                        punditBanner : req.body.punditBanner,
                        templeBanner : req.body.templeBanner,
                        thoughts: req.body.thoughts,
                    })
                    home.save();
                    res.status(200).json({success : true,message: home})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getHomePageDetails : async function(req, res) {
        try{
            var home =  await homeModel.find({}).limit(1);
            res.status(200).json({success : true,message: home})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    updateHomePageDetails : async function(req, res) {
        let homePage;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    homePage =  await homeModel.findOneAndUpdate({userId : user.id}, 
                        {
                            homeBanner : req.body.homeBanner,
                            dharamGuruBanner : req.body.dharamGuruBanner,
                            kathavachakBanner : req.body.kathavachakBanner,
                            punditBanner : req.body.punditBanner,
                            templeBanner : req.body.templeBanner,
                            thoughts: req.body.thoughts,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: homePage})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
}