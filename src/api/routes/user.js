const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserModel = require('../models/user.model')

userRouter.post('/signup',async (req, res, next)=>{
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

})

userRouter.delete("/:userId",async (req, res, next)=>{
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
})

module.exports = userRouter;