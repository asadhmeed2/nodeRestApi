const express = require('express')

const productRoute = express.Router();


productRoute.get('/',(req, res, next) =>{
    res.status(200).json({
        message:"getting products"})
})

productRoute.post('/',(req, res, next) =>{
    res.status(200).json({
        message:"adding a product"})
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