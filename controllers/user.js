const bcrypt = require('bcrypt');
const User = require('../models/user');

const {
  BadRequest,
  InternalServer,
  NotFound,
  OK,
  CREATED,
} = require('../respons/responsStatus');

const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(OK).send({ data: user });
      } else {
        res.status(NotFound).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'error' });
      }
    });
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(InternalServer).send({ message: 'error' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      res.status(CREATED).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'Smth went wrong' });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'Smth went wrong' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'Smth went wrong' });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
};
