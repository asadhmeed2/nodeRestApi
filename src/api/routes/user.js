const express = require('express');
const userRouter = express.Router();


const { signup, login, deleteUser } = require('../controllers/user.controller');



userRouter.post('/signup',signup)

userRouter.post('/login',login)

userRouter.delete("/:userId",deleteUser)

module.exports = userRouter;