const userModel = require('../models/user');
const biographyModel = require('../models/biographyModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = {
    signUp : async function(req, res){
        try {
            const {name,phone,email,password,userType,typeVendor,category} = req.body;
           let user = await userModel.findOne({email});
           if (user) return res.status(400).json({ success : false, message: "user already exists"});
           user =  new userModel({name,phone,email,password,userType,typeVendor,category})
           const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {id: user.id};
            jwt.sign(
                    payload,
                    "bootspider", {
                        expiresIn: '10d'
                    },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                    success: true, message : 
                    [{
                        token : token,
                        name  : user.name,
                        email : user.email,
                        phoneNumber : user.phone,
                        userType : user.userType,
                    }]
                    });
                    }
            );
           }
           catch (error) {
               res.status(400).json({success : false,message: error.message})
           }
    },

    login : async function(req, res){
        try {
            const {email,password} = req.body;
           let user = await userModel.findOne({email});
           if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
               if(validPassword){
                            const payload = {
                                   id: user.id
                           };
       
                        jwt.sign(
                               payload,
                               "bootspider", {
                                   expiresIn: '10d'
                               },
                           (err, token) => {
                                   if (err) throw err;
                                   res.status(200).json({
                                           success: true, message :
                                               [{	
                                                  token : token,
                                                 name  : user.name,
                                                  email : user.email,
                                                  phoneNumber : user.phone,
                                                  userType : user.userType,
                                               }]
                                       });
                               }
                       );
               }
               else{
                   return res.status(200).json({
                                       success : false, message: "Invalid email/password"
                               });
               }
                }
            else
                {
                return res.status(400).json({
                   success:false, message:"No user exists"
                    });
                }
           }
           catch (error) {
               res.status(400).json({success : false,message: error.message})
           }
    }
}