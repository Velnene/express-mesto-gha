const express = require('express');

const userRouter = express.Router();
const {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

userRouter.get('/users/:userId', getUserId);
userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
