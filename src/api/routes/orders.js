const express = require('express')

const ordersRoute = express.Router();


ordersRoute.get('/',(req, res, next) =>{
    res.status(200).json({
        message:"getting ordre"})
})

ordersRoute.post('/',(req, res, next) =>{
    const order ={
       productId: req.params.productId,
       quantity: req.params.quantity
    }
    res.status(200).json({
        message:"order created",
        ordre: order
    })
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