const express = require('express')

const ordersRoute = express.Router();
const mongoose = require('mongoose');
const OrderModel = require('../models/order.model')

ordersRoute.get('/',async (req, res, next) =>{
    try{
        const orders =await OrderModel.find({}).select('product quantity _id');
        res.status(200).json({
            count: orders.length,
            orders:orders
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            errorMessage: err.message,
        })
    }
})

ordersRoute.post('/',(req, res, next) =>{
    const order =new OrderModel({
        _id:new mongoose.Types.ObjectId,
        productId: mongoose.Types.ObjectId,
        quantity: req.params.quantity,
        product:req.body.productId,  
    })
    try{
        order.save();
        res.status(201).json({
            message:"order created",
            ordre: order
        })
    }catch(e){
        res.status(500).json({
            error_message: e.message,
            message:"error order creation failed!",
            ordre: order
        })
    }
})

ordersRoute.get('/:orderId',(req, res, next) =>{
    const id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({
            message:"getting a single order",
            id
        })
    }else{
        res.status(200).json({
            message:`you passed ID ${id}`
        })
    }
})

ordersRoute.patch('/:orderId',(req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message:"Updated order!"
    })
})


ordersRoute.delete('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message:"Delete product!"
    })
})

module.exports = ordersRoute;