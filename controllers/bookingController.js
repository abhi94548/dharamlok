const bookingModel = require('../models/bookingModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createBooking : async function(req, res){
        try{
            let booking = new bookingModel({
                name : req.body.name,
                email : req.body.email,
                country : req.body.country,
                description: req.body.description,
                duration : req.body.duration,
                date : req.body.date,
                person: req.body.person,
                phone: req.body.phone,
            })
            await booking.save();
            res.status(200).json({success : true,message: booking})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllBooking  : async function(req, res) {
        try{
            const booking =  await bookingModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: dharamshala})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getBookingById : async function(req, res) {
        try{
            const booking =  await bookingModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: booking})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteBooking  : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                bookingModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Booking Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBooking : function(req, res){
        let bookng;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    bookng =  await bookingModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            name : req.body.name,
                            email : req.body.email,
                            country : req.body.country,
                            description: req.body.description,
                            duration : req.body.duration,
                            date : req.body.date,
                            person: req.body.person,
                            phone: req.body.phone,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: bookng})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}