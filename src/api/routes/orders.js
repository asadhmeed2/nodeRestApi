const express = require('express')

const ordersRoute = express.Router();
const mongoose = require('mongoose');
const orderModel = require('../models/order.model');
const OrderModel = require('../models/order.model');
const productModel = require('../models/product.model');
const checkAuth =require('../../middleware/check-outh')

ordersRoute.get('/',checkAuth,async (req, res, next) =>{
    try{
        const orders =await OrderModel.find({}).select('product quantity _id').populate("product","name");
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

ordersRoute.post('/',checkAuth,async(req, res, next) =>{
    const poduct = await productModel.findById(req.body.productId);
    if(!poduct){
        return res.status(500).json({
            message:"Product not found",
            productId: req.body.productId
        })
    }
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

ordersRoute.get('/:orderId',checkAuth,async (req, res, next) =>{
    const id = req.params.orderId;
    try{
        const order = await orderModel.findById(id).populate("product");
        if(!order){
            return res.status(404).json({
                message:"Order not found",
                productId: req.body.productId
            })
        }
        return res.status(200).json(
            {
                message:"order found successfully",
                order: order
            }
        )
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            ordrerId: id
        })
    }

})

ordersRoute.patch('/:orderId',checkAuth,async (req, res, next) =>{
    const id = req.params.productId;
    try{
        const order =await OrderModel.findById(id)
        if(!order){
            return  res.status(404).json({
                message:"order not found",
                orderId: id
            })
        }
        await order.save();
        return  res.status(200).json({
            message:"order updated successfully",
        })
    }catch(err){
        return  res.status(500).json({
            message:err.message,
        })
    }
})


ordersRoute.delete('/:productId',checkAuth,async (req, res, next) =>{
    const id = req.params.productId;
    try {
        const order= await orderModel.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({
                message: "order not found",
                orderId: id
            })    
        }
        res.status(200).json({
            message: "order deleted successfully",
            order:order
        })
    }catch(err){
        return res.status(500).json({
            message: err.message,
        })
    }
})

module.exports = ordersRoute;