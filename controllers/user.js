const User = require('../models/user');

const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(400).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(500).send({ message: 'error' });
      }
    });
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'error' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(500).send({ message: 'Smth went wrong' });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(500).send({ message: 'Smth went wrong' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(500).send({ message: 'Smth went wrong' });
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
