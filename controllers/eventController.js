const eventModel = require('../models/eventModel');
const eventCategoryModel = require('../models/eventCategoryModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addEvent : function(req, res){
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
                        location: req.body.location,
                        category: req.body.category,
                        fromDate: req.body.fromDate,
                        toDate: req.body.toDate,
                        fromTime: req.body.fromTime,
                        toTime: req.body.toTime,
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
    },
    myEvents : function(req, res) {
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
    },
    getEvents : async function(req, res){
        let events;
        try{
            events =  await  eventModel.find({approved : 1}).sort([['createdAt', -1]]);
            res.status(200).json({success : true, message: events})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllEvents : function(req, res){
        let events;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    events =  await  eventModel.find({}).sort([['createdAt', -1]]);
                    res.status(200).json({success : true, message: events})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getEventDetail : async function(req, res) {
        let events;
        try{
            events =  await  eventModel.find({_id : req.body.id});
            res.status(200).json({success : true, message: events})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    eventStatus : function(req, res){
        let event;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    event =  await  eventModel.findOneAndUpdate({_id : req.body.eventId}, {approved : req.body.approve},{
                        new: true
                    });
                res.status(200).json({success : true, message: event})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteEvent : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                eventModel.findByIdAndDelete({_id : req.body.id} , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Event Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateEvent : function(req, res){
        let eventUpdate;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    eventUpdate =  await eventModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            title : req.body.title,
                            description : req.body.description,
                            place : req.body.place,
                            type: req.body.type,
                            location: req.body.location,
                            category: req.body.category,
                            fromDate: req.body.fromDate,
                            toDate: req.body.toDate,
                            fromTime: req.body.fromTime,
                            toTime: req.body.toTime,
                            bannerImageUrl : req.body.bannerImageUrl,
                            relatedImageUrl : req.body.relatedImageUrl,
                            location : req.body.location
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: eventUpdate})
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
                    let eventCat = new eventCategoryModel({
                        userId : user.id,
                        name : req.body.name,
                    })
                    eventCat.save();
                    res.status(200).json({success : true,message: eventCat})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var eventCat = await eventCategoryModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: eventCat})
    },
    deleteCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                eventCategoryModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Category Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}