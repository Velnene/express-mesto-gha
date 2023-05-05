const express = require('express');

const userRouter = express.Router();
const {
  getCurrentUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:userId', getUserId);
userRouter.get('/users', getUsers);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
