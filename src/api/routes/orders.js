const express = require('express')
const ordersRoute = express.Router();

const checkAuth =require('../../middleware/check-outh');
const { getAllOrders, addOrder, getOrderById, updateOrder, deleteOrder } = require('../controllers/order.controller');

ordersRoute.get('/',checkAuth,getAllOrders)

ordersRoute.post('/',checkAuth,addOrder)

ordersRoute.get('/:orderId',checkAuth,getOrderById)

ordersRoute.patch('/:orderId',checkAuth,updateOrder)


ordersRoute.delete('/:productId',checkAuth,deleteOrder)

module.exports = ordersRoute;