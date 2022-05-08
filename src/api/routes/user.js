const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserModel = require('../models/user.model')

router.post('/signup',(req, res, next)=>{
    try{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
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
            user.save()
        }
    })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }

})