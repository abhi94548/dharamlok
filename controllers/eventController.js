const eventModel = require('../models/eventModel');
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
    }
}