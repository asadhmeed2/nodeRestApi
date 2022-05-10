const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signup = async (req, res, next)=>{
    try{
        const user =await UserModel.find({email:req.body.email}).select('email')
        if(user.length >= 1){
            res.status(409).json({message:"user email is already exist"});
        }
        bcrypt.hash(req.body.password,10,async (err,hash)=>{
            if(err){
                return res.status(500).json({
                    error: err
                })
            } else{
                const user = new UserModel({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                })
                const result =await user.save();
                if(result){
                    res.status(201).json({
                        message: 'User created',
                        userId: user._id
                    })
                }
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.login =async(req,res, next)=>{
    try{
        const user =await UserModel.find({email: req.body.email}).select('email password');
        console.log(user.length);
        if( user.length<1 ){
            return res.status(401).json({
                message:"Auth failed"
            })

        }else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Auth failed"
                    })
                }
                if(result){
                    const token =jwt.sign({
                        email:user[0].email,
                        userId:user[0]._id
                    },process.env.JWT_KEY,
                    {
                        expiresIn:'1h'
                    })
                    return res.status(200).json({
                        message:'Auth successful',
                        token:token
                    })
                }
                res.status(401).json({
                    message:"Auth failed"
                })
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.deleteUser =async (req, res, next)=>{
    try {
        const user= await UserModel.findByIdAndDelete(req.params.userId);
        if(!user){
            return res.status(404).json({
                message: "user not found",
                userId: id
            })    
        }
        res.status(200).json({
            message: "user deleted successfully",
            user:user
        })
    }catch(err){
        return res.status(500).json({
            message: err.message,
        })
    }
}