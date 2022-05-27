const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addProduct : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let product = new productModel({
                        userId : user.id,
                        title : req.body.title,
                        type : req.body.type,
                        description : req.body.description,
                        price: req.body.price,
                        imageUrl : req.body.imageUrl,
                        pricePerUnit : req.body.pricePerUnit,
                        category: req.body.category,
                    })
                    product.save();
                    res.status(200).json({success : true,message: product})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    productDetail : async function(req, res){
        var product = await productModel.find({_id : req.body.productId}).sort([['createdAt', 'desc']]);
        res.status(200).json({success : true,message: product}) 
    },
    getAllProduct : async function(req, res){
        var product = await productModel.find({}).sort([['createdAt', 'desc']]);
        res.status(200).json({success : true,message: product})
    },
    updateProduct : function(req, res){
        let productUpdate;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    productUpdate =  await productModel.findOneAndUpdate({_id : req.body.productId, userId : user.id}, 
                        {
                            title : req.body.title,
                            type : req.body.type,
                            description : req.body.description,
                            price: req.body.price,
                            imageUrl : req.body.imageUrl,
                            pricePerUnit : req.body.pricePerUnit,
                            category: req.body.category,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: productUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    addCategories : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let category = new categoryModel({
                        userId : user.id,
                        name : req.body.name,
                    })
                    category.save();
                    res.status(200).json({success : true,message: category})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var category = await categoryModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: category})
    },
    deleteCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                categoryModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Category Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    searchByTitle : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = productModel.find({title: { $regex: '.*' + req.body.title + '.*' }});
                res.status(200).json({success : true, message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}