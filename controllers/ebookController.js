const eBookModel = require('../models/ebookModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createEbook : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let ebook = new eBookModel({
                        userId : user.id,
                        name : req.body.name,
                        description : req.body.description,
                        category : req.body.category,
                        type : req.body.type,
                        PDFuploadUrl : req.body.PDFuploadUrl,
                    })
                    ebook.save();
                    res.status(200).json({success : true,message: ebook})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllEbook : async function(req, res) {
        try{
            const ebook =  await eBookModel.find({and: [{category : req.body.category, type : req.body.type}]}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: ebook})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getEbookById : async function(req, res) {
        try{
            const ebook =  await eBookModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: ebook})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteEbook : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                eBookModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'EBook Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateEbook : function(req, res){
        let ebook;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    ebook =  await eBookModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            name : req.body.name,
                            description : req.body.description,
                            category : req.body.category,
                            type : req.body.type,
                            PDFuploadUrl : req.body.PDFuploadUrl,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: ebook})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    }
}