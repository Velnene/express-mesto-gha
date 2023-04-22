const express = require('express')
const userRouter = express.Router();
const {createUser, getUsers, getUserId} = require('../controllers/user')

userRouter.get('/users/:userId', getUserId )

userRouter.get('/users', getUsers )


userRouter.post('/users', createUser )

module.exports = userRouter;