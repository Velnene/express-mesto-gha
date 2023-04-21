
const mongoose = require('mongoose');
const User = require('../models/user')

const createUser = (req, res, next) => {
  const { avatar, name, about } = req.body;

  User.create({ avatar, name, about })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser
}