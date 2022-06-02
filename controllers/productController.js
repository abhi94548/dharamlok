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
        var product = await productModel.find({_id : req.body.productId}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: product}) 
    },
    getAllProduct : async function(req, res){
        var product = await productModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: product})
    },
    myProduct : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = await productModel.find({userId : user.id}).sort([['_id', 'desc']]);
                res.status(200).json({success : true,message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteProduct : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                productModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Product Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateProduct : function(req, res){
        let productUpdate;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    productUpdate =  await productModel.findOneAndUpdate({_id : req.body.id}, 
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
    search : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = await productModel.find({$or: [{title: { $regex: '.*' + req.body.query + '.*' }},
                            {category: { $regex: '.*' + req.body.query + '.*' }},
                            {type: { $regex: '.*' + req.body.query + '.*' }}]}).sort([['_id', 'desc']]);
                res.status(200).json({success : true, message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    searchByCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = await productModel.find({category: { $regex: '.*' + req.body.category + '.*' } }).sort([['_id', 'desc']]);
                res.status(200).json({success : true, message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    searchByType : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = await productModel.find({type: { $regex: '.*' + req.body.type + '.*' } }).sort([['_id', 'desc']]);
                res.status(200).json({success : true, message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}