const express = require('express');
const { default: mongoose } = require('mongoose');

const productRoute = express.Router();
const ProductModel = require('../models/product.model')


productRoute.get('/',(req, res, next) =>{
    res.status(200).json({
        message:"getting products"})
})

productRoute.post('/',(req, res, next) =>{
    try{
        const product = new ProductModel({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: parseInt(req.body.price),
        })
        console.log(product);
        product.save();
        res.status(200).json({
            message:"adding a product",
            createdProduct:product
        })
    }catch(e){
        console.error(e.message)
    }
})

productRoute.get('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message:"getting a single product",
            id
        })
    }else{
        res.status(200).json({
            message:`you passed ID ${id}`
        })
    }
})

productRoute.patch('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message:"Updated product!"
    })
})


productRoute.delete('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message:"Delete product!"
    })
})

module.exports = productRoute;